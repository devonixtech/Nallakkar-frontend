import ResetPassword from "../ResetPassword";
import { BASE_URL } from "../../../config";
export default function InvestorResetPassword() {
  return (
    <ResetPassword
      title="Investor Reset Password"
      apiUrl={`${BASE_URL}investor/reset-password`}
    />
  );
}
