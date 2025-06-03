import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa6";
import { FormField } from "./FormField";
import { ImageUpload } from "./ImageUpload";
import { QualitySpecsInput } from "./QualitySpecsInput";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SelectItems from "./SelectItem";
import { company, completionYear, location } from "./Allname";
import LocationPicker from "../map/Map";
import { useCreateApartmentMutation } from "@/redux/apiSlice/apartments/apartments";

interface ApartmentFormProps {
  // images: Record<string, string>;
  files: {
    [key: string]: {
      url: string;
      type?: string;
    };
  };
  imageSections: File[];
  qualitySpecs: { [key: string]: string };

  handleFileChange: (
    key: "payment" | "quality" | "floor"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;

  addImageSection: () => void;
  handleQualityChange: (value: string, key: string) => void;
  handleInputAdd: (key: string) => void;
  handleRemove: (key: string) => void;
}

export function ApartmentFormChild({
  // images,
  files,
  imageSections,
  qualitySpecs,
  handleFileChange,
  handleImageChange,
  addImageSection,
  handleQualityChange,
  handleInputAdd,
  handleRemove,
}: ApartmentFormProps) {
  const [createApartment] = useCreateApartmentMutation();
  const [right, setRight] = useState(false);
  const [selectValues, setSelectValues] = useState({
    propertyType: "",
    location: "",
    salesCompany: "",
    completionYear: "",
  });

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleSelectChange = (field: string, value: string) => {
    setSelectValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    const formData = new FormData();

    ["apartmentName", "commission", "price"].forEach((key) => {
      const val = values[key];
      if (val) formData.append(key, val as string);
    });

    // Append payment plan image
    const paymentFile = data.get("paymentPlanImage");
    if (paymentFile && paymentFile instanceof File) {
      formData.append("paymentPlanImage", paymentFile);
    }

    imageSections.forEach((file) => {
      if (file instanceof File) {
        file;
        formData.append("apartmentImage", file);
      }
    });

    // Append quality specification PDF
    const quality = data.get("quality");
    if (quality && quality instanceof File) {
      formData.append("qualitySpecificationPDF", quality);
    }

    // Append nested contact
    const contactData = {
      phone: values.contact,
      email: values.email,
      location: values.location,
    };
    formData.append("contact", JSON.stringify(contactData));

    // Append features
    formData.append("features", JSON.stringify(qualitySpecs));

    // Append coordinates
    if (markerPosition) {
      formData.append("latitude", markerPosition.lat.toString());
      formData.append("longitude", markerPosition.lng.toString());
    }

    // Append select values
    formData.append("propertyType", selectValues.propertyType);
    formData.append("location", selectValues.location);
    formData.append("salesCompany", selectValues.salesCompany);
    formData.append("CompletionDate", selectValues.completionYear);

    try {
      await createApartment(formData);
      form.reset();
      formData;
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form className=" p-4 space-y-6" onSubmit={handleSubmit}>
      {/* Apartment Images */}
      <div>
        <Label className="block mb-2 text-black font-medium ">
          Apartment Images
        </Label>
        <div className="flex items-center space-x-4">
          {(imageSections.length > 0 ? imageSections : [null]).map(
            (file, idx) => (
              <div
                key={idx}
                className="w-24 h-24 border border-gray-300 rounded-md bg-gray-50 overflow-hidden flex items-center justify-center relative cursor-pointer"
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`upload-${idx}`}
                    className="h-full w-full object-cover rounded-md"
                    onLoad={(e) =>
                      URL.revokeObjectURL((e.target as HTMLImageElement).src)
                    } // revoke to avoid memory leaks
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => handleImageChange(e, idx)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  multiple={false}
                />
              </div>
            )
          )}

          <button
            type="button"
            onClick={addImageSection}
            className="flex h-24 w-24 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100"
            aria-label="Add new image upload section"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <FormField
            type="text"
            id="apartmentName"
            label="Apartment Name"
            placeholder="Enter Apartment Name"
          />
          <FormField
            type="number"
            id="commission"
            label="Commission Percentage"
            placeholder="Enter Commission"
          />

          <ImageUpload
            id="paymentPlanImage"
            fileUrl={files.payment?.url || ""}
            fileType={files.payment?.type}
            onChange={handleFileChange("payment")}
            label="Payment Plan"
            accept="image/jpeg,image/png,image/gif"
          />

          <ImageUpload
            id="quality"
            fileUrl={files.quality?.url || ""}
            fileType={files.quality?.type}
            onChange={handleFileChange("quality")}
            label="Quality Specification"
            accept="application/pdf"
          />

          <div className="flex justify-between items-center cursor-pointer text-black">
            <span>Sales Contact Info</span>
            <span onClick={() => setRight((prev) => !prev)}>
              {right ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </span>
          </div>

          {right && (
            <div>
              <FormField
                type="text"
                id="contact"
                label="Contact Number"
                placeholder="Enter Contact Number"
              />
              <FormField
                type="text"
                id="email"
                label="Email"
                placeholder="Enter Your Email"
              />
              <FormField
                type="text"
                id="location"
                label="Location"
                placeholder="Enter Location"
              />
            </div>
          )}
        </div>

        {/* Right Column */}

        {/* price */}
        <div>
          <FormField
            type="number"
            id="price"
            label="Price"
            placeholder="Enter Price"
          />

          <QualitySpecsInput
            specs={qualitySpecs}
            onChange={handleQualityChange}
            onAdd={() => handleInputAdd("")}
            onRemove={handleRemove}
          />

          {/* map */}
          <LocationPicker
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
          />

          {/* property type */}
          <SelectItems
            options={["Apartment", "Vila", "Townhouse"]}
            title="Property Type"
            placeholder="Select Property Type"
            value={selectValues.propertyType}
            onSelect={(value) => handleSelectChange("propertyType", value)}
          />
          {/* location */}
          <SelectItems
            options={location}
            title="Location"
            placeholder="Select location"
            value={selectValues.location}
            onSelect={(value) => handleSelectChange("location", value)}
          />
          {/* sales company */}
          <SelectItems
            options={company}
            title="Sales Company"
            placeholder="Select company"
            value={selectValues.salesCompany}
            onSelect={(value) => handleSelectChange("salesCompany", value)}
          />
          {/* completion year */}
          <SelectItems
            options={completionYear}
            title="Completion Year"
            placeholder="Select year"
            value={selectValues.completionYear}
            onSelect={(value) => handleSelectChange("completionYear", value)}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#F79535] hover:bg-[#F79535] text-black text-xl mb-9"
      >
        Submit
      </Button>
    </form>
  );
}
