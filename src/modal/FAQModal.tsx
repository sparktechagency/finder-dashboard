import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FAQModal() {
  return (
    <div>
      <Input placeholder="Enter Question" />
      <Textarea placeholder="Enter Answer" />
    </div>
  );
}
