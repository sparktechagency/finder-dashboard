import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateApartmentDetailsMutation } from "@/redux/apiSlice/apartments/apartments";
import toast from "react-hot-toast";

export default function ApartmentDetails() {
  const [createApartmentDetails] = useCreateApartmentDetailsMutation();
  const [formData, setFormData] = useState({
    apartmentId: "",
    floorPlan: "",
    badSize: "",
    price: "",
  });

  formData;

  const handleChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { price, badSize } = formData;

    const priceNum = Number(price);
    const badSizeNum = Number(badSize);

    if (!formData.apartmentId) return toast.error("Apartment ID is required");
    if (isNaN(priceNum)) return toast.error("Price must be a number");
    if (isNaN(badSizeNum)) return toast.error("Bad size must be a number");

    const formDataToSend = new FormData();

    formDataToSend.append("apartmentId", formData.apartmentId);
    formDataToSend.append("floorPlan", formData.floorPlan || "");
    formDataToSend.append("price", price.toString());
    formDataToSend.append("badSize", badSize.toString());
    if (image) {
      formDataToSend.append("floorPlanImage", image);
    }

    try {
      await createApartmentDetails(formDataToSend);
      toast.success("Create Successfully");
      setFormData({ apartmentId: "", floorPlan: "", badSize: "", price: "" });
    } catch {
      toast.error("Post failed");
    }
  };

  return (
    <div className="min-h-screen mt-[100px]">
      <form className="p-4 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <Label htmlFor="floorPlan" className="mb-2 text-black">
              Floor Plan
            </Label>
            <Select
              value={formData.floorPlan}
              onValueChange={(val) => handleChange("floorPlan", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Enter floor plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {["A12", "A2", "A5"].map((num) => (
                    <SelectItem key={num} value={num}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="mt-4">
              <Label htmlFor="badSize" className="mb-2 text-black">
                Number of Bed
              </Label>
              <Input
                type="number"
                placeholder="Enter Bed Number"
                value={formData.badSize}
                onChange={(e) => handleChange("badSize", e.target.value)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-2">
              <Label htmlFor="id" className="text-black mb-2">
                Apartment Id
              </Label>
              <Input
                type="text"
                placeholder="Enter id"
                value={formData.apartmentId}
                onChange={(e) => handleChange("apartmentId", e.target.value)}
              />
            </div>
            <div className="">
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

            <Label htmlFor="floorPlanFile" className="mt-2 text-black">
              Floor Image
            </Label>
            <input
              id="file"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div
              className="flex justify-center items-center border border-gray-300 mt-3 rounded cursor-pointer"
              onClick={() => document.getElementById("file")?.click()}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-12 h-12 py-1"
                  onLoad={(e) =>
                    URL.revokeObjectURL((e.target as HTMLImageElement).src)
                  } // clean up
                />
              ) : (
                <span className="text-4xl py-2">+</span>
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#F79535] hover:bg-[#F79535] text-black text-xl cursor-pointer"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
