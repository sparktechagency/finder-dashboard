import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "./ImageUpload";
import { useState } from "react";

export default function ApartmentDetails() {
  const [formData, setFormData] = useState({
    apartmentList: "",
    apartmentName: "",
    bedNumber: "",
    apartmentNumber: "",
    price: "",
    floorPlanFile: null,
  });

  const handleChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [images, setImages] = useState<{
    floorPlan?: string;
  }>({});
  const handleFileChange =
    (key: keyof typeof images) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setImages((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const values = Object.fromEntries(data.entries());
    console.log(values);
  };

  return (
    <div className="min-h-screen mt-[100px]">
      <form className="p-4 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <Label htmlFor="apartmentList" className="mb-2 text-black">
              Apartment List
            </Label>
            <Select
              value={formData.apartmentList}
              onValueChange={(val) => handleChange("apartmentList", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="2" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Flat</SelectLabel>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="mt-4">
              <Label htmlFor="apartmentName" className="mb-2 text-black">
                Apartment Name
              </Label>
              <Input
                type="text"
                placeholder="Enter Apartment Name"
                value={formData.apartmentName}
                onChange={(e) => handleChange("apartmentName", e.target.value)}
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="bedNumber" className="mb-2 text-black">
                Number of Bed
              </Label>
              <Input
                type="number"
                placeholder="Enter Bed Number"
                value={formData.bedNumber}
                onChange={(e) => handleChange("bedNumber", e.target.value)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <Label htmlFor="apartmentNumber" className="mb-2 text-black">
              Apartment Number
            </Label>
            <Select
              value={formData.apartmentNumber}
              onValueChange={(val) => handleChange("apartmentNumber", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="2" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Bedrooms</SelectLabel>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="mt-4">
              <Label htmlFor="price" className="mb-2 text-black">
                Price
              </Label>
              <Input
                type="number"
                placeholder="Enter Price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>

            <ImageUpload
              id="floorPlan"
              image={images.floorPlan || ""}
              onChange={handleFileChange("floorPlan")}
              label="Floor Plan"
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
    </div>
  );
}
