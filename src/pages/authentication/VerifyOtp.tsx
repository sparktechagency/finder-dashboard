import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // or useRouter from next/navigation
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormData = {
  otp: string;
};

export default function VerifyOtp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("OTP Entered:", data);
    navigate("/new-password");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center pl-8 bg-[#F6F6F6] rounded-md px-2">
        <div className="w-[500px]">
          <div className="space-y-3 text-center my-10 text-[#1A1E25]">
            <h1 className="text-3xl font-medium mt-2">Verify OTP</h1>
            <p>
              Please check your email. We have sent a code to contact @gmail.com
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="my-5 space-y-6">
            <div className="flex justify-center">
              <Input
                {...register("otp", {
                  required: "Please input OTP code here!",
                  minLength: { value: 6, message: "OTP must be 6 digits" },
                  maxLength: { value: 6, message: "OTP must be 6 digits" },
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be a 6-digit number",
                  },
                })}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-[300px] text-center tracking-widest text-xl bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
              />
            </div>
            {errors.otp && (
              <p className="text-red-500 text-center">{errors.otp.message}</p>
            )}

            <Button
              type="submit"
              className="bg-[#F79535] px-6 w-full mt-4 h-10 cursor-pointer hover:bg-[#F79535]"
            >
              Verify
            </Button>

            <div className="text-lg flex items-center justify-between gap-2 mb-8 text-[#1A1E25] px-4">
              <p>Didn't receive the code?</p>
              <p
                className="text-[#79CAA1] font-semibold underline cursor-pointer"
                // onClick={handleResendCode} // Add your resend logic here
              >
                Resend
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
