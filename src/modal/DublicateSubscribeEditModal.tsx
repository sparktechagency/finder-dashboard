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
import { useCreateSubscriptionMutation } from "@/redux/subscriptions/subscriptions";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  edit?: {
    _id?: string;
    price?: number;
    // duration: number | string;
    description?: string;
  };
}

export default function DublicateSubscribeEditModal({
  isOpen,
  onClose,
  edit,
}: PackageModalProps) {
  const [createSubscription] = useCreateSubscriptionMutation();
  const [formState, setFormState] = useState({
    packageName: "",
    price: undefined as number | undefined,
    description: "",
    offers: ["120 day permission to use"],
    isOfferModalOpen: false,
    newOffer: "",
    duration: "" as string | number,
    paymentType: "",
  });

  useEffect(() => {
    if (edit?._id) {
      setFormState((prev) => ({
        ...prev,
        price: edit?.price,
        description: edit?.description || "",
        // optionally duration here if in edit
      }));
    }
  }, [edit]);

  const removeOffer = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      offers: prev.offers.filter((_, i) => i !== index),
    }));
  };

  const handleAddOffer = () => {
    if (formState.newOffer.trim()) {
      setFormState((prev) => ({
        ...prev,
        offers: [...prev.offers, prev.newOffer.trim()],
        newOffer: "",
        isOfferModalOpen: false,
      }));
    }
  };

  const onSubmit = async () => {
    const { packageName, price, offers, duration, paymentType } = formState;
    console.log({ packageName, price, offers, duration, paymentType });

    const subscriptionData = {
      title: packageName || "Default Package",
      description: offers,
      price: price || 0,
      duration,
      paymentType,
    };

    await createSubscription(subscriptionData);
    onClose();
  };

  // In JSX, access values like formState.packageName etc.
  // And update with setFormState(prev => ({ ...prev, packageName: newVal })) on inputs

  return (
    <>
      <div className="">
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent className="sm:max-w-lg rounded-lg bg-[#fefefe] text-[#1A1E25] p-6">
            <DialogTitle className="text-2xl -mt-2">
              {edit ? "Edit Subscription" : "Add Subscription"}
            </DialogTitle>

            {!edit && (
              <div className="mb-4">
                <Label htmlFor="packageName">Package Name</Label>
                <Select
                  value={formState.packageName}
                  onValueChange={() =>
                    setFormState((prev) => ({
                      ...prev,
                      packageName: "Premium Plan",
                    }))
                  }
                >
                  <SelectTrigger id="packageName" className="w-full mt-1">
                    <SelectValue placeholder="Select Package Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Premium Plan">Premium Plan</SelectItem>
                    <SelectItem value="Standard Plan">Standard Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="mb-4">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formState?.price !== undefined ? formState?.price : ""}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                className="mt-1 "
              />
            </div>
            {/* duration */}
            <div className="mb-4">
              <Label htmlFor="price">Duration</Label>
              <Input
                id="duration"
                type="text"
                placeholder="Enter Duration"
                value={formState.duration}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    duration: e.target.value,
                  }))
                }
                className="mt-1 "
              />
            </div>
            {/* paymentType */}
            <div className="mb-4">
              <Label htmlFor="paymentType">Payment Type</Label>
              <Input
                id="paymentType"
                type="text"
                placeholder="Enter paymentType"
                value={formState.paymentType}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    paymentType: e.target.value,
                  }))
                }
                className="mt-1 "
              />
            </div>

            {/* Package Offers Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2 px-1">
                <h2 className="font-medium">Package Offers</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      isOfferModalOpen: true,
                    }))
                  }
                >
                  <FiPlusCircle className="w-6 h-6 text-orange-500" />
                </Button>
              </div>
              <div className="border border-gray-700 rounded-lg p-4 space-y-2">
                {formState.offers.map((offer, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <IoMdCheckmarkCircle className="text-[#34383A] w-5 h-5" />
                      <span>{offer}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOffer(index)}
                    >
                      <FiMinusCircle className="text-gray-500 w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full py-3 text-black"
                onClick={onSubmit}
                style={{ backgroundColor: "#F79535", borderColor: "#188754" }}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Modal for adding new offer */}
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
