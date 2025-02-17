"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Homepage = () => {
  const { data: session, status } = useSession();
  console.log("session data@@>>", session);
  return (
    <div>
      Homepage
      <Button onClick={() => signOut({ redirect: false })}>Logout</Button>
    </div>
  );
};

export default Homepage;
