import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useLoginMutation } from "@/redux/apiSlice/auth/auth";
import { useEffect } from "react";
import toast from "react-hot-toast";

type FormData = { email: string; password: string };

export default function Login() {
  const [login, { data, isLoading, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "login-toast" });
    } else {
      toast.dismiss("login-toast");

      if (isSuccess && data?.data?.accessToken) {
        toast.success("Login Successful", { id: "login-toast" });
        localStorage.setItem("accessToken", data.data.accessToken);
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.", { id: "login-toast" });
      }
    }
  }, [data, isLoading, isSuccess, navigate]);

  const onSubmit = async (form: FormData) => {
    try {
      await login(form);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="bg-[#F6F6F6] text-[#1A1E25] p-7 rounded-md">
        <CardContent className="w-[550px]">
          <div className="text-center space-y-3 my-7">
            <h1 className="text-3xl font-medium mt-2">Login</h1>
            <p className="text-[#929292]">
              Please enter your email and password to continue
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-[#1A1E25] text-xl">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 px-6 mt-2 bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
                {...register("email", { required: "Please enter your email!" })}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label className="text-[#1A1E25] text-xl">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="h-12 px-6 mt-2 bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
                {...register("password", {
                  required: "Please input your password!",
                })}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox />
              </div>
              <Link to="/forget-password" className="text-md text-[#1A1E25]">
                Forget password
              </Link>
            </div>

            <Button
              type="submit"
              className="bg-[#F79535] px-6 w-full mt-4 h-10 cursor-pointer hover:bg-[#F79535]"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
