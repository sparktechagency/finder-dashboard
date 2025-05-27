import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { MapPin } from "lucide-react";
import { FaPlus } from "react-icons/fa6";

import { FormField } from "./FormField";
import { ImageUpload } from "./ImageUpload";
import { QualitySpecsInput } from "./QualitySpecsInput";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SelectItems from "./SelectItem";
import { company, completionYear, location } from "./Allname";

interface ApartmentFormProps {
  images: Record<string, string>;
  imageSections: string[];
  qualitySpecs: string[];

  handleFileChange: (
    key: "payment" | "quality" | "floor"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;

  addImageSection: () => void;
  handleQualityChange: (value: string, index: number) => void;
  handleInputAdd: () => void;
  handleRemove: (index: number) => void;
}

export function ApartmentFormChild({
  images,
  imageSections,
  qualitySpecs,
  handleFileChange,
  handleImageChange,
  addImageSection,
  handleQualityChange,
  handleInputAdd,
  handleRemove,
}: ApartmentFormProps) {
  const [right, setRight] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  const handleSelectChange = (value: string) => {
    setSelectValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const values = Object.fromEntries(data.entries());
    console.log(values);
    console.log(selectValue);

    // console.log("Quality Specs:", qualitySpecs);

    // // For single files:
    // const paymentFile = data.get("paymentPlan"); // This will now contain the file object
    // console.log(paymentFile);
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
            id="apartmentName"
            label="Apartment Name"
            placeholder="Enter Apartment Name"
          />
          <FormField
            id="commissionPercentage"
            label="Commission Percentage"
            placeholder="Enter Commission"
          />
          <ImageUpload
            id="paymentPlan"
            image={images.payment || ""}
            onChange={handleFileChange("payment")}
            label="Payment Plan"
          />
          <ImageUpload
            id="quality"
            image={images.quality || ""}
            onChange={handleFileChange("quality")}
            label="Quality Specification"
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
                id="contact"
                label="Contact Number"
                placeholder="Enter Contact Number"
              />
              <FormField
                id="email"
                label="Email"
                placeholder="Enter Your Email"
              />
              <FormField
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
          <FormField id="price" label="Price" placeholder="Enter Price" />

          <QualitySpecsInput
            specs={qualitySpecs}
            onChange={handleQualityChange}
            onAdd={handleInputAdd}
            onRemove={handleRemove}
          />

          {/* map */}
          <div className="my-4">
            <Label htmlFor="location" className="mb-2 text-black">
              Map
            </Label>
            <div className="relative">
              <Input
                id="location"
                type="text"
                placeholder="Pick Location"
                className="pr-10"
              />
              <MapPin
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => window.open("https://www.google.com/maps")}
              />
            </div>
          </div>

          {/* property type */}
          <SelectItems
            options={["Apartment", "Vila", "Townhouse"]}
            title="Property Type"
            placeholder="Select Property Type"
            value={selectValue}
            onSelect={handleSelectChange}
          />
          {/* location */}
          <SelectItems
            options={location}
            title="Location"
            placeholder="Select location"
            value={selectValue}
            onSelect={handleSelectChange}
          />
          {/* sales company */}
          <SelectItems
            options={company}
            title="Sales Company"
            placeholder="Select company"
            value={selectValue}
            onSelect={handleSelectChange}
          />
          {/* sales company */}
          <SelectItems
            options={completionYear}
            title="Completion Year"
            placeholder="Select year"
            value={selectValue}
            onSelect={handleSelectChange}
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
