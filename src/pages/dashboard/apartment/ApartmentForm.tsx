import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ap from "../../../../public/ap.png";

export default function ApartmentForm() {
  const [image, setImage] = useState(ap);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage("");
    }
  };

  return (
    <div>
      <form className="mx-auto p-4 space-y-6 ">
        {/* Apartment Image */}
        <div>
          <Label
            htmlFor="file-upload"
            className="block mb-2 font-medium text-gray-700"
          >
            Apartment Image
          </Label>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 border border-gray-300 rounded-md bg-gray-50 overflow-hidden flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Apartment"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            <label
              htmlFor="file-upload"
              className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100"
              aria-label="Upload apartment image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            {/*Enter Flat Number */}
            <div className="my-4">
              <Label className="mb-2" htmlFor="apartmentName">
                Enter Flat Number
              </Label>
              <Input id="apartmentName" placeholder="Enter Apartment Name" />
            </div>

            {/* Commission Percentage */}
            <div className="my-4">
              <Label className="mb-2" htmlFor="commissionPercentage">
                Number of Bedrooms
              </Label>
              <Input id="commissionPercentage" placeholder="Enter Commission" />
            </div>

            {/* Payment Plan */}
            <div className="my-4">
              <Label className="mb-2" htmlFor="paymentPlan">
                Floor Plan
              </Label>
              <Input id="paymentPlan" placeholder="Enter Payment Plan" />
            </div>

            {/* Price */}
            <div className="my-4">
              <Label className="mb-2" htmlFor="price">
                Price
              </Label>
              <Input id="price" placeholder="Enter Price" />
            </div>

            {/* Quality Specification */}
            <div className="my-4">
              <Label className="mb-2" htmlFor="qualitySpecification">
                Quality Specification
              </Label>
              <Input id="qualitySpecification" placeholder="Enter quality" />
              {/* <Textarea
          id="qualitySpecification"
          placeholder="Enter Quality Specification"
          rows={3}
        /> */}
            </div>
          </div>

          <div>
            {/* Apartment Name */}
            <div className="my-4">
              <Label className="mb-2" htmlFor="apartmentName">
                Apartment Name
              </Label>
              <Input id="apartmentName" placeholder="Enter Apartment Name" />
            </div>

            {/* Commission Percentage */}
            <div className="my-4">
              <Label className="mb-2" htmlFor="commissionPercentage">
                Commission Percentage
              </Label>
              <Input id="commissionPercentage" placeholder="Enter Commission" />
            </div>

            {/* Payment Plan */}
            <div className="my-4">
              <Label className="mb-2" htmlFor="paymentPlan">
                Payment Plan
              </Label>
              <Input id="paymentPlan" placeholder="Enter Payment Plan" />
            </div>

            {/* Price */}
            <div className="my-4">
              <Label className="mb-2" htmlFor="price">
                Price
              </Label>
              <Input id="price" placeholder="Enter Price" />
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-[#F79535] hover:bg-[#F79535] text-black text-xl"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
