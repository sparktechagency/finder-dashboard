import React, { useState } from "react";
import { ApartmentFormChild } from "./ApartmentFormChild";

export default function ApartmentPage() {
  // const [images, setImages] = useState<{
  //   payment?: string;
  //   quality?: string;
  //   floor?: string;
  // }>({});
  const [imageSections, setImageSections] = useState<(File | null)[]>([]);
  const [qualitySpecs, setQualitySpecs] = useState<{ [key: string]: string }>({
    category: "",
    generalAmenites: "",
    connectivity: "",
    ecoFriendly: "",
    parking: "",
    receational: "",
    accessiblity: "",
    nearbyFacilities: "",
  });

  // const handleFileChange =
  //   (key: keyof typeof images) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (!file) return;
  //     setImages((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
  //   };

  type FileData = {
    url: string;
    type: string;
  };

  const [files, setFiles] = React.useState<Record<string, FileData>>({});

  const handleFileChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setFiles((prev) => ({
        ...prev,
        [key]: {
          url: URL.createObjectURL(file),
          type: file.type,
        },
      }));
    };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0] || null;
    setImageSections((prev) => {
      const newArr = [...prev];
      newArr[index] = file;
      return newArr;
    });
  };

  const addImageSection = () => {
    setImageSections((prev) => [...prev, null]);
  };

  const handleQualityChange = (key: string, value: string) => {
    setQualitySpecs((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleInputAdd = () => {
    const newKey = `feature_${Date.now()}`;
    setQualitySpecs((prev) => ({ ...prev, [newKey]: "" }));
  };

  const handleRemove = (key: string) => {
    setQualitySpecs((prev) => {
      const { [key]: _, ...rest } = prev; // omit the key
      return rest;
    });
  };

  return (
    <ApartmentFormChild
      // images={images}
      imageSections={imageSections}
      qualitySpecs={qualitySpecs}
      handleFileChange={handleFileChange}
      handleImageChange={handleImageChange}
      addImageSection={addImageSection}
      handleQualityChange={handleQualityChange}
      handleInputAdd={handleInputAdd}
      handleRemove={handleRemove}
      files={files}
    />
  );
}
