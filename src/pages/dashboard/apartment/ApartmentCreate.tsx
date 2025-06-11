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
import toast from "react-hot-toast";
import { useCreateApartmentFloorMutation } from "@/redux/apiSlice/apartments/apartments";

export default function ApartmentCreate() {
  const [createApartmentFloor] = useCreateApartmentFloorMutation();

  const [formData, setFormData] = useState({
    apartmentId: "",
    floorPlan: "",
    badSize: "",
    price: "",
    togglePlan: "",
  });

  console.log({ formData });

  const handleChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  console.log(pdfFile);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Only PDF files are allowed.");
      setPdfFile(null);
    }
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
    formDataToSend.append("seeView", formData.togglePlan.toString());
    if (pdfFile) {
      formDataToSend.append("floorPlanPDF", pdfFile);
    }

    try {
      await createApartmentFloor(formDataToSend);
      toast.success("Create Successfully");
      // setFormData({
      //   apartmentId: "",
      //   floorPlan: "",
      //   badSize: "",
      //   price: "",
      //   togglePlan: "",
      // });
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
            </div>
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

            {/* yes no */}
            <div className="mt-2">
              <Label htmlFor="togglePlan" className="mb-2 text-black">
                Toggle Plan
              </Label>
              <Select
                value={formData.togglePlan}
                onValueChange={(val) => handleChange("togglePlan", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Enter Toggle plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["true", "false"].map((num) => (
                      <SelectItem key={num} value={num}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
              type="file"
              accept="application/pdf"
              id="pdf-upload"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              className="flex justify-center items-center border border-gray-300 mt-3 rounded cursor-pointer"
              onClick={() => document.getElementById("pdf-upload")?.click()}
            >
              {pdfFile ? (
                <div className="flex items-center gap-2 text-red-600 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>{pdfFile.name}</span>
                </div>
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
