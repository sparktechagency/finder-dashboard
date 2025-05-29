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
import { useGetProfileQuery } from "@/redux/apiSlice/profile/profile";
import Loading from "@/components/layout/shared/Loading";
import { imageUrl } from "@/redux/api/baseApi";

type ProfileFormData = {
  name: string;
  email: string;
};

export default function Profile() {
  const { data, isLoading } = useGetProfileQuery(undefined);

  const form = useForm<ProfileFormData>({});

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.role,
        email: data.data.email,
      });
    }
  }, [form, data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center text-[#1A1E25]">
      <div className="w-[1035px] mx-auto">
        <div className="flex items-center justify-between gap-4  mt-12">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                className="w-24 h-24 rounded-full border-2 border-[#8AC2FF]"
                alt="profile"
                src={
                  data.data.profile.startsWith("http")
                    ? data.data.profile
                    : `${imageUrl}${data.data.profile}`
                }
              />
            </div>

            <div>
              <h3 className="font-semibold text-2xl">{data?.data?.role}</h3>
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

        <div className="mt-9">
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Email"
                        {...field}
                        readOnly
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
