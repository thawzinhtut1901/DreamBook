import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePasswordChange } from "@/hooks/usePasswordChange";
import { PasswordChangeData } from "@/types/types";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const passwordChange = usePasswordChange();
  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [oldPasswordError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordData.newPassword !== confirmPassword) {
      setPasswordMismatchError(true);
      return;
    } else {
      passwordChange.mutate(passwordData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatchError(false);
  };

  useEffect(() => {
    if (passwordChange.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Password Updated",
        showConfirmButton: false,
        timer: 1500,
      });
      setPasswordData({ oldPassword: "", newPassword: "" });
      setConfirmPassword("");
    }
  }, [passwordChange.isSuccess]);

  useEffect(() => {
    if (passwordChange.isError) {
      Swal.fire({
        icon: "error",
        title: passwordChange.error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setPasswordData({ oldPassword: "", newPassword: "" });
      setConfirmPassword("");
    }
  }, [passwordChange.isError]);

  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col gap-3 p-6 w-full md:w-[544px]">
        <h1 className="font-bold text-center text-md md:text-2xl dark:text-white">
          Change Your Password
        </h1>
        <p className="font-normal text-[12px] text-center text-slate-500 md:text-sm">
          The new password you set must be different to the previous one
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 md:gap-8"
        >
          <div className="relative">
            <Input
              required
              value={passwordData.oldPassword}
              onChange={handleInputChange}
              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter Old Password"
              className={
                oldPasswordError
                  ? "border-red-500"
                  : "h-10 md:h-auto md:placeholder:text-md md:text-md text-[13px] placeholder:text-[13px] dark:bg-dark-bg dark:border-dark-border dark:placeholder:text-white dark:text-white"
              }
            />
            <div
              className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? (
                <FaEye className="dark:text-white" />
              ) : (
                <FaEyeSlash className="dark:text-white" />
              )}
            </div>
            {oldPasswordError && (
              <p className="mt-1 text-xs text-red-500">
                Old password is incorrect
              </p>
            )}
          </div>

          <div className="relative">
            <Input
              required
              onChange={handleInputChange}
              className="dark:bg-dark-bg dark:border-dark-border dark:placeholder:text-white dark:text-white h-10 md:h-auto text-[13px] md:placeholder:text-md md:text-md placeholder:text-[13px]"
              value={passwordData.newPassword}
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New Password"
            />
            <div
              className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <FaEye className="dark:text-white" />
              ) : (
                <FaEyeSlash className="dark:text-white" />
              )}
            </div>
          </div>

          <div className="relative">
            <Input
              required
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={
                passwordMismatchError
                  ? "border-red-500"
                  : "dark:bg-dark-bg dark:border-dark-border dark:placeholder:text-white dark:text-white h-10 md:h-auto md:placeholder:text-md md:text-md text-[13px] placeholder:text-[13px]"
              }
            />
            <div
              className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEye className="dark:text-white" />
              ) : (
                <FaEyeSlash className="dark:text-white" />
              )}
            </div>
            {passwordMismatchError && (
              <p className="mt-1 text-xs text-red-500">
                Passwords do not match
              </p>
            )}
          </div>

          <Button type="submit" className="rounded-[8px] w-full h-[45px]">
            Change Password
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
