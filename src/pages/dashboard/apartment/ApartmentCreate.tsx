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

const inputFields = [
  { name: "badSize", label: "Number of Bedroom", type: "number" },
  { name: "price", label: "Price", type: "number" },
];

const selectOptions = {
  floorPlan: ["A12", "A2", "A5"],
  togglePlan: ["Yes", "No"],
};

export default function ApartmentCreate() {
  const [createApartmentFloor] = useCreateApartmentFloorMutation();

  const [formData, setFormData] = useState({
    apartmentId: "",
    floorPlan: "",
    badSize: "",
    price: "",
    togglePlan: "",
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") setPdfFile(file);
    else {
      toast.error("Only PDF files are allowed");
      setPdfFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { apartmentId, price, badSize, togglePlan, floorPlan } = formData;
    if (!apartmentId) return toast.error("Apartment ID is required");
    if (isNaN(Number(price))) return toast.error("Price must be a number");
    if (isNaN(Number(badSize))) return toast.error("Bed size must be a number");

    const formDataToSend = new FormData();
    formDataToSend.append("apartmentId", apartmentId);
    formDataToSend.append("floorPlan", floorPlan);
    formDataToSend.append("price", price);
    formDataToSend.append("badSize", badSize);
    formDataToSend.append("seeView", togglePlan === "Yes" ? "true" : "false");
    if (pdfFile) formDataToSend.append("floorPlanPDF", pdfFile);

    try {
      const res = await createApartmentFloor(formDataToSend).unwrap();
      if (res?.success) {
        toast.success(res.message || "Created Successfully");
        setFormData({
          apartmentId: "",
          floorPlan: "",
          badSize: "",
          price: "",
          togglePlan: "",
        });
        setPdfFile(null);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create apartment details");
    }
  };

  return (
    <div className="min-h-screen mt-[100px]">
      <form className="p-4 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label className="mb-2 text-black">Floor Plan</Label>
              <Select
                value={formData.floorPlan}
                onValueChange={(val) => handleChange("floorPlan", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Enter floor plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectOptions.floorPlan.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 text-black">Sea View</Label>
              <Select
                value={formData.togglePlan}
                onValueChange={(val) => handleChange("togglePlan", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Enter sea view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectOptions.togglePlan.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="floorPlanFile" className="text-black">
                Floor Plan (PDF)
              </Label>
              <input
                type="file"
                accept="application/pdf"
                id="pdf-upload"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                className="flex justify-center items-center border border-gray-300 mt-2 rounded cursor-pointer"
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

          {/* Right Column */}
          <div className="space-y-4">
            {inputFields.map(({ name, label, type }) => (
              <div key={name}>
                <Label htmlFor={name} className="mb-2 text-black">
                  {label}
                </Label>
                <Input
                  id={name}
                  type={type}
                  placeholder={`Enter ${label}`}
                  value={formData[name as keyof typeof formData]}
                  onChange={(e) => handleChange(name, e.target.value)}
                />
              </div>
            ))}
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
