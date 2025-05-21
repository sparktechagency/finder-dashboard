import { useForm } from "react-hook-form";

import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ProfileFormData = {
  name: string;
  email: string;
};

export default function EditProfile() {
  const form = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
  };

  useEffect(() => {
    form.reset({
      name: "jahid", // from your user data
      email: "jahid@example.com",
    });
  }, [form]);

  return (
    <div className="flex justify-center items-center text-[#1A1E25]">
      <div className="w-[1035px] mx-auto">
        <div className="flex items-center justify-between gap-4  mt-12">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                className="w-24 h-24 rounded-full border-2 border-[#8AC2FF]"
                alt="profile"
                src="https://i.ibb.co/xJdQCTG/download.jpg"
              />
            </div>

            <div>
              <h3 className="font-semibold text-2xl">jahid</h3>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-[#F79535] hover:bg-[#F79535] text-black font-medium text-lg px-6 w-full mt-4 h-10"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
