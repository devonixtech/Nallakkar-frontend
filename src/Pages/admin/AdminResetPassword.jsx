import ResetPassword from "../ResetPassword";
import { BASE_URL } from "../../../config";
export default function AdminResetPassword() {
  return (
    <ResetPassword
      title="Admin Reset Password"
      apiUrl={`${BASE_URL}admin/reset-password`}
    />
  );
}
