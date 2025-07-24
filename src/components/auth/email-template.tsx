import * as React from "react";
import { Button } from "../ui/button";

interface EmailTemplateProps {
  firstName: string;
  resetLink: string;
}
export function EmailTemplate({ resetLink }: EmailTemplateProps) {
  return (
    <div>
      <h1 className="text-transparent bg-gradient-to-b from-red-600 to-red-300 text-2xl">
        Welcome, Tshop
      </h1>
      <p>You can reset password by click below button</p>
      <Button>
        <a href={resetLink}>reset your password</a>
      </Button>
      <p>or you can click link below</p>
      <a href={resetLink}>{resetLink}</a>
      <p>Please ignore this email if you are not trying to reset password</p>
    </div>
  );
}
