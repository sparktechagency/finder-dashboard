import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

export default function AddPhaseModal() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const phase = data.get("phase");
    const date = data.get("date");
    if (phase && date) {
      console.log("Phase:", phase);
      console.log("Date:", date);
      form.reset();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="border border-gray-300 px-4 py-2 rounded-2xl cursor-pointer">
          Add phase
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Phase</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="phase">Phase</Label>
              <Input id="phase" name="phase" placeholder="Enter phase" />
            </div>
            <div className="grid gap-3">
              <DatePicker />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#1D7889] text-white mt-6 hover:bg-[#1D7889] cursor-pointer"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
