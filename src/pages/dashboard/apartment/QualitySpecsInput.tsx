import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineMinus } from "react-icons/hi2";

interface QualitySpecsInputProps {
  specs: string[];
  onChange: (value: string, index: number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export function QualitySpecsInput({
  specs,
  onChange,
  onAdd,
  onRemove,
}: QualitySpecsInputProps) {
  return (
    <div className="my-4">
      <div className="flex items-center justify-between mr-2 mb-1 text-black">
        <Label htmlFor="qualitySpecification" className="mb-2">
          Enter Features
        </Label>
        <button onClick={onAdd} type="button">
          <FaPlus />
        </button>
      </div>
      {specs.map((spec, i) => (
        <div key={i} className="flex-col items-center">
          <button type="button" onClick={() => onRemove(i)}>
            <HiOutlineMinus size={22} />
          </button>
          <Input
            id={`qualitySpecification-${i}`}
            className="mb-1 flex-1"
            value={spec}
            placeholder="Enter quality"
            onChange={(e) => onChange(e.target.value, i)}
          />
        </div>
      ))}
    </div>
  );
}
