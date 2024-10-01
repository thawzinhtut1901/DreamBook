import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ui/loading-button";

import { useSignUp } from "@/hooks/useAuth";
import { login } from "@/services/authService";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const createAccount = useSignUp();
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (createAccount.isSuccess) {
      const authToken = createAccount.data.access_token;
      delete createAccount.data.access_token;
      login(authToken);
      navigate("/auth/profile-setup");
      window.location.reload();
    }
  }, [createAccount.isSuccess]);

  useEffect(() => {
    if (createAccount.isError) {
      Swal.fire({
        title: "Error",
        text: createAccount.error.message,
        timer: 2000,
      });
    }
  }, [createAccount.isError]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const validationErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!accountData.email) {
      validationErrors.email = "* Email is required !";
    } else if (!/\S+@\S+\.\S+/.test(accountData.email)) {
      validationErrors.email = "Invalid Email !";
    }

    if (!accountData.password) {
      validationErrors.password = "* Password is required !";
    } else if (accountData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters !";
    }

    if (confirmPassword !== accountData.password) {
      validationErrors.confirmPassword = "Password does not match !";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        email: accountData.email,
        password: accountData.password,
      };
      createAccount.mutate(payload);
    }
  };

  return (
    <div className="flex flex-col items-center self-center gap-10 md:w-6/12">
      <form className="flex flex-col items-center md:gap-5 gap-3 md:w-[460px] w-[300px] font-Inter md:text-md text-sm">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-2xl font-bold text-white">Create an Account</h1>
          <h3 className="text-white">Get started to share books & reading</h3>
        </div>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="h-10 md:h-auto md:placeholder:text-md md:text-md text-[13px] placeholder:text-[13px]"
          value={accountData.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAccountData((prev) => ({ ...prev, email: event.target.value }));
          }}
        />
        {errors.email && (
          <span className="text-sm font-bold text-red-500">{errors.email}</span>
        )}
        <Input
          type="password"
          className="h-10 md:h-auto md:placeholder:text-md md:text-md text-[13px] placeholder:text-[13px]"
          id="password"
          placeholder="Password"
          value={accountData.password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAccountData((prev) => ({
              ...prev,
              password: event.target.value,
            }));
          }}
        />
        {errors.password && (
          <span className="text-sm font-bold text-red-500">
            {errors.password}
          </span>
        )}
        <Input
          type="password"
          className="h-10 md:h-auto md:placeholder:text-md md:text-md text-[13px] placeholder:text-[13px]"
          id="ConfirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(event.target.value);
          }}
        />
        {errors.confirmPassword && (
          <span className="text-sm font-bold text-red-500">
            {errors.confirmPassword}
          </span>
        )}

        {!createAccount.isPending ? (
          <Button
            className="h-10 md:h-auto"
            variant={"default"}
            size={"full"}
            text={"white"}
            type="submit"
            onClick={handleSubmit}
          >
            Create an Account
          </Button>
        ) : (
          <ButtonLoading />
        )}

        <div className="flex items-center gap-3">
          <span className="text-white cursor-default">
            Already have an account?
          </span>
          <a
            className="font-semibold text-white hover:text-primary"
            href="/auth/login"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
