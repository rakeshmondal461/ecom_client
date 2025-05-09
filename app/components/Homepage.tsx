"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

const Homepage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Clear any stored credentials
      localStorage.removeItem("enc_u");
      localStorage.removeItem("enc_p");

      // Sign out from NextAuth
      await signOut({ 
        redirect: false,
        callbackUrl: "/signin"
      });

      // Show success message
      toast({
        title: "Success!",
        description: "You have been signed out successfully",
      });

      // Redirect to sign in page
      router.push("/signin");
    } catch (error: unknown) {
      console.error("Sign out error:", error);
      toast({
        title: "Error!",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      Homepage
      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  );
};

export default Homepage;
