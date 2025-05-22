import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  id: string;
  image: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export function ImageUpload({ id, image, onChange, label }: ImageUploadProps) {
  return (
    <div className="my-4">
      <Label htmlFor={id} className="mb-2 text-black">
        {label}
      </Label>
      <label
        htmlFor={id}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
      >
        {image ? (
          <img src={image} alt={label} className="max-h-full object-contain" />
        ) : (
          <span className="text-3xl">+</span>
        )}
      </label>
      <input
        type="file"
        name={id}
        accept="image/jpeg,image/png,image/gif"
        onChange={onChange}
        id={id}
        className="hidden"
      />
    </div>
  );
}
