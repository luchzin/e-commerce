"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignoutBtn() {
  return (
    <Button
      onClick={() => signOut()}
      className="  bg-white text-black border border-gray-200  hover:bg-gray-300 px-4 py-2 rounded"
    >
      Signout
    </Button>
  );
}
