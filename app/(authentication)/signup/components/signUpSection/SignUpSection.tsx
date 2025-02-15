"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";


import { SubmitHandler, useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { AuthApis } from "@/services/api/auth.api";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

type Inputs = {
  email: string;
  password: string;
  name: string;
  phoneNumber:string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{11,}$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter the email")
    .matches(emailRegex, { message: "Email is not valid" }),
  password: yup
    .string()
    .trim()
    .required("Please enter the password"),
  name: yup.string().trim().required("Please enter the name"),
  phoneNumber: yup
    .string()
    .trim()
    .required("Please enter the phoneNumber"),

});

const SignUpSection = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [skip, setSkip] = useState<string>("");
  const [isRadioChecked, setIsRadioChecked] = useState(false);
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();
  const returnParams = useSearchParams();
  const mailId = returnParams.get("mail_id");
  const returnUrl = returnParams.get("returnUrl");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const userPassword = useWatch({ control, name: "password" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber:data.phoneNumber,
        type: "SIGN_UP",
        redirect: false,
      });
      //console.log("SIGNUP RESULTS", res);
      if (!res?.ok) {
        if (res?.error?.toString().includes("Username")) {
          //console.log("SIGNUP RESULTS Username Error");
          toast({
            title: "Error!",
            description: "Username is already taken!",
          });
        } else {
          toast({
            title: "Error!",
            description: "Signup not successful !",
          });
        }
        return;
      }

      toast({
        title: "Success",
        description: "Success! Verify your email to complete signup!",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong!",
      });
    }
  };
/*
  const checkEmailExists = async (email: string) => {
    try {
      const response = await AuthApis.checkEmail(email);
      if (response.statusCode === 400) {
        setNextPage(false);
        setSkip("");
        toast.error(response.message || "", {
          position: "bottom-right",
          autoClose: 6000,
        });
        return;
      }
      if (response.statusCode === 404) {
        setNextPage(true);
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  */

  /*
  useEffect(() => {
    if (
      getValues("email") !== undefined &&
      getValues("password")?.match(passwordRegex) &&
      skip === "NEXT_PAGE"
    ) {
      checkEmailExists(getValues("email"));
    } else {
      setNextPage(false);
      setSkip("");
    }
  }, [skip]);

  */

  useEffect(() => {
    if (mailId) setValue("email", String(mailId));
  }, [mailId]);

  return (
      <div className={cn(`w-full px-6 pt-10 pb-12 lg:px-8 md:px-10 `)}>
        <div className={cn(`w-full max-w-96 mx-auto `)}>
          <div
            className={cn(
              `w-full flex items-center justify-center gap-y-3 gap-x-1 flex-wrap text-center max-w-[20rem] mx-auto`
            )}
          >
            <h2
              className={cn(
                `text-white font-bold text-4xl capitalize font-DmSANs tracking-tighter`
              )}
            >
              Let&apos;s Sign up to Listen . Create . Mix
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={cn(`w-full mt-8`)}>
            <div className={cn(`w-full mt-4`)}>
              <Controller
                control={control}
                name={"email"}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <input
                      type="email"
                      placeholder="Email address"
                      {...field}
                      onChange={onChange}
                      value={value}
                      className={cn(
                        `w-full min-h-14 text-placeHolder/60 rounded-[40px] px-6 bg-primary-inputBackground text-lg placeholder:text-placeHolder/60`
                      )}
                    />
                  );
                }}
              />
              {errors.email && (
                <>{errors.email.message}</>
              )}
            </div>
            <div className={cn(`w-full mt-4`)}>
              <div className={cn(`relative`)}>
                <Controller
                  control={control}
                  name={"password"}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        onChange={onChange}
                        value={value}
                        className={cn(
                          `w-full min-h-14 font-DmSANs text-placeHolder/60 rounded-[40px] px-6 pr-10 bg-primary-inputBackground text-lg placeholder:text-placeHolder/60`
                        )}
                      />
                    );
                  }}
                />
                <i
                  className={cn(
                    `absolute top-0 bottom-0 my-auto right-4 h-fit cursor-pointer`
                  )}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  
                </i>
              </div>
              {errors.password && (
                <>{errors.password.message}</>
              )}
            </div>

              <div className={cn(`w-full mt-4`)}>
                <Controller
                  control={control}
                  name={"name"}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <input
                        type="text"
                        placeholder="Name"
                        {...field}
                        onChange={onChange}
                        value={value}
                        className={cn(
                          `w-full min-h-14 text-placeHolder/60 rounded-[40px] px-6 bg-primary-inputBackground text-lg placeholder:text-placeHolder/60`
                        )}
                      />
                    );
                  }}
                />
                {errors?.name && (
                  <>{errors.name?.message}</>
                )}
              </div>

              <div className={cn(`w-full mt-4`)}>
                <Controller
                  control={control}
                  name={"phoneNumber"}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <input
                        type="text"
                        placeholder="Phone Number"
                        {...field}
                        onChange={onChange}
                        value={value}
                        className={cn(
                          `w-full min-h-14 text-placeHolder/60 rounded-[40px] px-6 bg-primary-inputBackground text-lg placeholder:text-placeHolder/60`
                        )}
                      />
                    );
                  }}
                />
                {errors?.phoneNumber && (
                  <>{errors.phoneNumber?.message}</>
                )}
              </div>

              <div className={cn(`w-full mt-6 transition-all cursor-pointer`)}>
                <Button
                  className=" text-base w-full uppercase font-kareliaWeb font-bold"
                  type="submit"
                >
                  Sign up
                </Button>
              </div>
          </form>

        </div>
      </div>
  );
};

export default SignUpSection;
