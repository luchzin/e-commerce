import { verifyResetToken } from "@/action/verifyResetToken";
import ResetPasswordForm from "../../../components/auth/reset-password";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-600">Invalid request. No token provided.</p>
      </div>
    );
  }

  const tokenRecord = await verifyResetToken(token);

  if (!tokenRecord) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-600">Reset link expired or invalid.</p>
      </div>
    );
  }

  return <ResetPasswordForm  token={token}/>;
}
