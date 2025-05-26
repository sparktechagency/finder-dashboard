import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "@/redux/apiSlice/auth/auth";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ResetPasswordForm() {
  const [resetPassword, { data, isSuccess, isError }] =
    useResetPasswordMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    newPassword: string;
    confirmPassword: string;
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      toast.success("Password updated successfully");
      navigate("/login");
      window.location.reload();
    } else if (isError) {
      toast.error("Password update failed");
    }
  }, [isSuccess, isError, data, navigate]);

  const onSubmit = async (formData: FormData) => {
    console.log("Submitted:", formData);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    await resetPassword(data).unwrap();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="bg-[#F6F6F6] text-[#1A1E25] p-7 rounded-md">
        <CardContent className="w-[550px]">
          <div className="text-center space-y-3 my-7">
            <h1 className="text-3xl font-medium mt-2">Set New Password</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-[#1A1E25] text-xl">New Password</Label>
              <Input
                type="newPassword"
                placeholder="Enter new password"
                className="h-12 px-6 mt-2 bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
                {...register("newPassword", { required: true })}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Please input new password!
                </p>
              )}
            </div>

            <div>
              <Label className="text-[#1A1E25] text-xl">Confirm Password</Label>
              <Input
                type="confirmPassword"
                placeholder="Enter confirm password"
                className="h-12 px-6 mt-2 bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Please input confirm password!
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-[#F79535] px-6 w-full mt-4 h-10 cursor-pointer hover:bg-[#F79535]"
            >
              Confirm
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
