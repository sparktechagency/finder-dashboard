import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="bg-[#F6F6F6] text-[#1A1E25] p-7 rounded-md">
        <CardContent className="w-[550px]">
          <div className="text-center space-y-3 my-7">
            <h1 className="text-3xl font-medium mt-2">Reset Password</h1>
            <p className="text-[#929292]">
              Please enter your email and password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-[#1A1E25] text-xl">Current Password</Label>
              <Input
                type="password"
                placeholder="Enter current password"
                className="h-12 px-6 mt-2 bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
                {...register("currentPassword", { required: true })}
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Please input current password!
                </p>
              )}
            </div>

            <div>
              <Label className="text-[#1A1E25] text-xl">New Password</Label>
              <Input
                type="password"
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
                type="password"
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
