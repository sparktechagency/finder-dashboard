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
  images: Record<string, string>;
  files: {
    [key: string]: {
      url: string;
      type?: string;
    };
  };
  imageSections: string[];
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
    console.log(field, value);
    setSelectValues((prev) => ({ ...prev, [field]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget as HTMLFormElement);
  //   const values = Object.fromEntries(data.entries());

  //   formData.append("paymentPlan", data.get("paymentPlan"));

  //   // const paymentFile = data.get("paymentPlan");
  //   const quality = data.get("quality");

  //   const contactData = {
  //     phone: values.contact,
  //     email: values.email,
  //     location: values.location,
  //   };

  //   const apartmentData = {
  //     apartmentName: values.apartmentName,
  //     commission: values.commissionPercentage,
  //     paymentPlanImage: paymentFile,
  //     price: values.price,
  //     contact: contactData,
  //     qualitySpecificationPDF: quality,
  //     features: qualitySpecs,
  //     latitude: markerPosition?.lat,
  //     longitude: markerPosition?.lng,
  //     propertyType: selectValues.propertyType,
  //     location: selectValues.location,
  //     salesCompany: selectValues.salesCompany,
  //     CompletionDate: selectValues.completionYear,
  //   };

  //   await createApartment(apartmentData);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Append any extra data not in form inputs:
    formData.append("features", JSON.stringify(qualitySpecs));
    formData.append("latitude", String(markerPosition?.lat ?? ""));
    formData.append("longitude", String(markerPosition?.lng ?? ""));
    formData.append("propertyType", selectValues.propertyType);
    formData.append("location", selectValues.location);
    formData.append("salesCompany", selectValues.salesCompany);
    formData.append("CompletionDate", selectValues.completionYear);

    // Send formData directly to your API
    await createApartment(formData);
  };

  return (
    <form className="mx-auto p-4 space-y-6" onSubmit={handleSubmit}>
      {/* Apartment Images */}
      <div>
        <Label className="block mb-2 text-black font-medium ">
          Apartment Images
        </Label>
        <div className="flex items-center space-x-4">
          {(imageSections.length > 0 ? imageSections : [""]).map((src, i) => (
            <div
              key={i}
              className="w-24 h-24 border border-gray-300 rounded-md bg-gray-50 overflow-hidden flex items-center justify-center relative cursor-pointer"
            >
              {src ? (
                <img
                  src={src}
                  alt={`upload-${i}`}
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => handleImageChange(e, i)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                multiple={false}
              />
            </div>
          ))}
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
            id="commissionPercentage"
            label="Commission Percentage"
            placeholder="Enter Commission"
          />

          <ImageUpload
            id="paymentPlan"
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
        className="w-full bg-[#F79535] hover:bg-[#F79535] text-black text-xl"
      >
        Submit
      </Button>
    </form>
  );
}
