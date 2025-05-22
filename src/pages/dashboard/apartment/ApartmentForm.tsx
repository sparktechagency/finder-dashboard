import React, { useState } from "react";
import { ApartmentFormChild } from "./ApartmentFormChild";

export default function ApartmentPage() {
  const [images, setImages] = useState<{
    payment?: string;
    quality?: string;
    floor?: string;
  }>({});
  const [imageSections, setImageSections] = useState<string[]>([]);
  const [qualitySpecs, setQualitySpecs] = useState<string[]>([""]);

  const handleFileChange =
    (key: keyof typeof images) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setImages((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSections((prev) => {
      const newArr = [...prev];
      newArr[index] = url;
      return newArr;
    });
  };

  const addImageSection = () => {
    setImageSections((prev) => (prev.length < 5 ? [...prev, ""] : prev));
  };

  const handleQualityChange = (value: string, index: number) => {
    setQualitySpecs((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleInputAdd = () => {
    setQualitySpecs((prev) => [...prev, ""]);
  };

  const handleRemove = (index: number) => {
    setQualitySpecs((item: string[]) => item.filter((_, i) => i !== index));
    console.log(index);
  };

  return (
    <ApartmentFormChild
      images={images}
      imageSections={imageSections}
      qualitySpecs={qualitySpecs}
      handleFileChange={handleFileChange}
      handleImageChange={handleImageChange}
      addImageSection={addImageSection}
      handleQualityChange={handleQualityChange}
      handleInputAdd={handleInputAdd}
      handleRemove={handleRemove}
    />
  );
}
