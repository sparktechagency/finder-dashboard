import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { MapPin } from "lucide-react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function ApartmentForm() {
  const [imageSections, setImageSections] = useState<string[]>([]);
  const [qualitySpecs, setQualitySpecs] = useState<string[]>([""]);
  const [paymentImage, setPaymentImage] = useState<string>("");
  const [qualityImage, setQualityImage] = useState<string>("");
  const [floorImage, setFloorImage] = useState<string>("");
  console.log(paymentImage);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImageSections((prev) => {
      const newImages = [...prev];
      newImages[index] = imageUrl;
      return newImages;
    });
  };

  const addImageSection = () => {
    setImageSections((prev) => [...prev, ""]);
  };

  // handleInputAdd;

  const handleInputAdd = () => {
    setQualitySpecs((prev) => [...prev, ""]);
  };

  const handleQualityChange = (value: string, index: number) => {
    setQualitySpecs((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

  const handlePaymentImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPaymentImage(URL.createObjectURL(file));
    }
  };

  const handleQualityImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setQualityImage(URL.createObjectURL(file));
    }
  };
  const handleFloorImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFloorImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <form className="mx-auto p-4 space-y-6 ">
        {/* Apartment Image */}
        <div>
          <Label className="block mb-2 text-black font-medium text-gray-700">
            Apartment Images
          </Label>

          <div className="flex items-center space-x-4">
            {imageSections.length > 0 ? (
              imageSections.map((src, i) => (
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

                  {/* Invisible file input on top of card */}
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={(e) => handleImageChange(e, i)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    multiple={false}
                  />
                </div>
              ))
            ) : (
              <div className="w-24 h-24 border border-gray-300 rounded-md bg-gray-50 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Add new upload section button */}
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

        {/* Your existing form fields */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left column */}
          <div>
            {/* Enter Flat Number */}
            <div className="my-4">
              <Label className="mb-2 text-black" htmlFor="apartmentName">
                Apartment Name
              </Label>
              <Input id="apartmentName" placeholder="Enter Apartment Name" />
            </div>

            <div className="my-4">
              <Label className="mb-2 text-black" htmlFor="commissionPercentage">
                Commission Percentage
              </Label>
              <Input id="commissionPercentage" placeholder="Enter Commission" />
            </div>

            {/* payment plan */}
            <div className="my-4">
              <Label htmlFor="paymentPlan" className="mb-2 text-black">
                Payment Plan
              </Label>
              <label
                htmlFor="paymentPlan"
                className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
              >
                {paymentImage ? (
                  <img
                    src={paymentImage}
                    alt="payment"
                    className="max-h-full object-contain"
                  />
                ) : (
                  <span className="text-3xl">+</span>
                )}
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handlePaymentImage}
                id="paymentPlan"
                className="hidden"
              />
            </div>

            {/* Quality Specification*/}
            <div className="my-4">
              <Label htmlFor="quality" className="mb-2 text-black">
                Quality Specification
              </Label>
              <label
                htmlFor="quality"
                className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
              >
                {qualityImage ? (
                  <img
                    src={qualityImage}
                    alt="payment"
                    className="max-h-full object-contain"
                  />
                ) : (
                  <span className="text-3xl">+</span>
                )}
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleQualityImage}
                id="quality"
                className="hidden"
              />
            </div>
            {/* enter section */}
            <div className="my-4">
              <div className="flex items-center justify-between mr-2 mb-1 text-black">
                <Label className="mb-2 " htmlFor="qualitySpecification">
                  Enter Features
                </Label>
                <button onClick={handleInputAdd} type="button">
                  <FaPlus />
                </button>
              </div>
              {qualitySpecs.map((spec, index) => (
                <Input
                  className="mb-1"
                  key={index}
                  value={spec}
                  onChange={(e) => handleQualityChange(e.target.value, index)}
                  id={`qualitySpecification -${index}`}
                  placeholder="Enter quality"
                />
              ))}
            </div>

            {/* map section */}
            <div className="my-4">
              <Label className="mb-2 text-black" htmlFor="qualitySpecification">
                Map
              </Label>
              <div className="relative">
                <Input
                  id="location"
                  type="text"
                  placeholder="Pick Location"
                  className="pr-10"
                />
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            <div className="my-4">
              <Label className="mb-2 text-black" htmlFor="apartmentNameRight">
                Enter Flat Number
              </Label>
              <Input id="apartmentNameRight" placeholder="Enter Flat Number" />
            </div>

            {/* number of bred room */}
            <div className="my-4">
              <Label className="mb-2 text-black" htmlFor="apartmentNameRight">
                Number of Bedrooms
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Floor plan*/}
            <div className="my-4">
              <Label htmlFor="floorPlan" className="mb-2 text-black">
                Floor Plan
              </Label>
              <label
                htmlFor="floorPlan"
                className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
              >
                {floorImage ? (
                  <img
                    src={floorImage}
                    alt="payment"
                    className="max-h-full object-contain"
                  />
                ) : (
                  <span className="text-3xl">+</span>
                )}
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFloorImage}
                id="floorPlan"
                className="hidden"
              />
            </div>

            <div className="my-4">
              <Label className="mb-2 text-black" htmlFor="priceRight">
                Price
              </Label>
              <Input id="priceRight" placeholder="Enter Price" />
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
