"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { AuthApis } from "@/services/api/auth.api";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Inputs = {
  email: string;
  password: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter the email")
    .matches(emailRegex, { message: "Email is not valid" }),
  password: yup.string().trim().required("Please enter the email or username"),
});

const SignInSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const { toast } = useToast();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        name: "",
        type: "LOGIN",
        redirect: false,
      });
      console.log("res🚀🚀🚀", res);
      if (res?.ok) {
        toast({
          title: "Success!",
          description: "Signin successful ",
        });
        // router.push("/main/home");
       window.location.href = "/";
      } else {
        toast({
          title: "Error!",
          description: "Invalid email or password",
        });
      }
      if (checked === true) {
        localStorage.enc_u = btoa(data.email);
        localStorage.enc_p = btoa(data.password);
      } else {
        localStorage.removeItem("enc_u");
        localStorage.removeItem("enc_p");
      }
    } catch (e: any) {
      toast({
        title: "Error!",
        description: e?.message || "Invalid email or password",
      });
    }
  };

  useEffect(() => {
    if (localStorage.enc_u && localStorage.enc_p) {
      let user: any = atob(localStorage.enc_u);
      let pass: any = atob(localStorage.enc_p);
      setChecked(true);
      setValue("email", user);
      setValue("password", pass);
    }
  }, []);

  return (
    <div className={cn(`w-full px-6 pt-10 pb-12 lg:px-8 md:px-10 `)}>
      <div className={cn(`w-full max-w-96 mx-auto `)}>
        <div
          className={cn(
            `w-full flex items-center justify-center gap-y-3 gap-x-1 flex-wrap`
          )}
        >
          <h2
            className={cn(
              `text-white font-bold text-4xl tracking-tight font-DmSANs`
            )}
          >
            Log in to
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={cn(`w-full mt-8`)}>
          <div className={cn(`w-full mt-4`)}>
            <input
              type="email"
              placeholder="Email or username"
              {...register("email")}
              className={cn(
                `w-full min-h-14 font-DmSANs text-placeHolder/60 rounded-[40px] px-6 bg-primary-inputBackground text-lg placeholder:text-placeHolder/60`
              )}
            />
            {errors.email && <>{errors.email.message}</>}
          </div>
          <div className={cn(`w-full mt-4`)}>
            <div className={cn(`relative`)}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className={cn(
                  `w-full min-h-14 font-DmSANs text-placeHolder/60 rounded-[40px] px-6 pr-10 bg-primary-inputBackground text-lg placeholder:text-placeHolder/60`
                )}
              />
              <i
                className={cn(
                  `absolute top-0 bottom-0 my-auto right-4 h-fit cursor-pointer`
                )}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </i>
            </div>
            {errors.password && <>{errors.password.message}</>}
          </div>
          <div className={cn(`w-full mt-6 transition-all cursor-pointer`)}>
            <Button
              type="submit"
              className=" text-base w-full uppercase font-kareliaWeb font-bold"
            >
              Log in
            </Button>
          </div>
        </form>
        <div className={`w-full mt-3 flex items-center justify-between`}>
          <Link
            href={"/send-forget-password-link"}
            className={`text-white text-xs hover:underline font-DmSANs`}
          >
            Forgot password?
          </Link>
        </div>
        or continue sign in with
        <div
          className={cn(
            `w-full flex items-center gap-3 justify-center flex-row xs:flex-row`
          )}
        ></div>
      </div>
    </div>
  );
};

export default SignInSection;
