import { Link } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { MdOutlineModeEdit } from "react-icons/md";
import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ProfileFormData = {
  name: string;
  email: string;
};

export default function Profile() {
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
          <div className="">
            <Link to="/edit-profile">
              <Button className=" flex items-center justify-center space-x-2 cursor-pointer w-36 text-black bg-[#fdead8] hover:bg-[#fdead8]">
                <MdOutlineModeEdit className="text-xl mr-2" /> Edit Profile
              </Button>
            </Link>
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
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
