import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import {
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} from "@/redux/subscriptions/subscriptions";

interface PackageModalProps {
  isOpen: boolean;
  refetch?: () => void;
  onClose: () => void;
  edit?: {
    _id?: string;
    price?: number;
    description?: string[];
    paymentType?: string;
    duration?: string | number;
  };
}

export default function DublicateSubscribeEditModal({
  isOpen,
  onClose,
  edit,
  refetch,
}: PackageModalProps) {
  const [createSubscription] = useCreateSubscriptionMutation();
  const [updateSubscription] = useUpdateSubscriptionMutation();

  const [formState, setFormState] = useState({
    packageName: "",
    price: undefined as number | undefined,
    description: [""],
    offers: [""],
    isOfferModalOpen: false,
    newOffer: "",
    duration: "" as string | number,
    paymentType: "",
  });

  useEffect(() => {
    if (edit?._id) {
      setFormState((prev) => ({
        ...prev,
        price: edit.price,
        description: Array.isArray(edit.description)
          ? edit.description
          : edit.description
          ? [edit.description]
          : [""],
        paymentType: edit.paymentType || "",
        duration: edit.duration || "",
      }));
    }
  }, [edit]);

  console.log(edit);

  const removeOffer = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
  };

  const handleAddOffer = () => {
    const trimmedOffer = formState.newOffer.trim();
    if (trimmedOffer) {
      setFormState((prev) => ({
        ...prev,
        offers: [...prev.offers, trimmedOffer],
        description: [...prev.description, trimmedOffer],
        newOffer: "",
        isOfferModalOpen: false,
      }));
    }
  };

  const onSubmit = async () => {
    const { packageName, price, offers, duration, paymentType } = formState;

    const data = {
      title: packageName,
      description: offers,
      price: price,
      duration,
      paymentType,
    };

    console.log(data);
    try {
      if (edit?._id) {
        updateSubscription({ _id: edit._id, data: data });
      } else {
        await createSubscription(data).unwrap();
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      if (refetch) {
        refetch();
      }
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg rounded-lg bg-[#fefefe] text-[#1A1E25] p-6">
          <DialogTitle className="text-2xl -mt-2">
            {edit ? "Edit Subscription" : "Add Subscription"}
          </DialogTitle>

          {(edit || isOpen) && (
            <div className="mb-4">
              <Label htmlFor="packageName">Package Name</Label>
              <Select
                value={formState.packageName}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, packageName: value }))
                }
              >
                <SelectTrigger id="packageName" className="w-full mt-1">
                  <SelectValue
                    placeholder="Select Package Name"
                    defaultValue={formState.packageName}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Premium Plan">Premium Plan</SelectItem>
                  <SelectItem value="Standard Plan">Standard Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {[
            {
              id: "price",
              label: "Price",
              type: "number",
              value: formState.price,
            },
            {
              id: "duration",
              label: "Duration",
              type: "text",
              value: formState.duration,
            },
            {
              id: "paymentType",
              label: "Payment Type",
              type: "text",
              value: formState.paymentType,
            },
          ].map(({ id, label, type, value }) => (
            <div className="mb-4" key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                type={type}
                placeholder={`Enter ${label.toLowerCase()}`}
                value={value ?? ""}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    [id]:
                      type === "number"
                        ? Number(e.target.value)
                        : e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
          ))}

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2 px-1">
              <h2 className="font-medium">Package Offers</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setFormState((prev) => ({ ...prev, isOfferModalOpen: true }))
                }
              >
                <FiPlusCircle className="w-6 h-6 text-orange-500" />
              </Button>
            </div>
            <div className="border border-gray-700 rounded-lg p-4 space-y-2">
              {formState.description.map((des, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <IoMdCheckmarkCircle className="text-[#34383A] w-5 h-5" />
                    <span>{des}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOffer(i)}
                  >
                    <FiMinusCircle className="text-gray-500 w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="w-full py-3 text-black mt-6"
            onClick={onSubmit}
            style={{ backgroundColor: "#F79535", borderColor: "#188754" }}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={formState.isOfferModalOpen}
        onOpenChange={(open) =>
          setFormState((prev) => ({ ...prev, isOfferModalOpen: open }))
        }
      >
        <DialogContent className="sm:max-w-md rounded-lg bg-[#fefefe] text-[#1A1E25] p-6">
          <DialogTitle>Add New Offer</DialogTitle>
          <Input
            placeholder="Enter offer name"
            value={formState.newOffer}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, newOffer: e.target.value }))
            }
            className="mt-4"
          />
          <div className="mt-6 flex justify-end gap-2">
            <Button
              className="w-[48%]"
              variant="outline"
              onClick={() =>
                setFormState((prev) => ({ ...prev, isOfferModalOpen: false }))
              }
            >
              Cancel
            </Button>
            <Button
              className="w-[48%] bg-[#F79535] hover:bg-[#F79535]"
              onClick={handleAddOffer}
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
