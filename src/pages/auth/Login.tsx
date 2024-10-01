import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogIn } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import { ButtonLoading } from "@/components/ui/loading-button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import PasswordVisible from "@/components/PasswordVisible";

const Login = () => {
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
  });

  type LoginSchemaType = z.infer<typeof LoginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  const navigate = useNavigate();
  const LoginAccount = useLogIn();

  useEffect(() => {
    if (LoginAccount.isSuccess) {
      const authToken = LoginAccount.data.access_token;
      delete LoginAccount.data.access_token;
      login(authToken);
      navigate("/");
      window.location.reload();
    }
  }, [LoginAccount.isSuccess]);

  useEffect(() => {
    if (LoginAccount.isError) {
      Swal.fire({
        title: "Wrong Credentials",
        text: "Invalid username or password !",
        confirmButtonText: "Okay",
      });
    }
  }, [LoginAccount.isError]);

  const onSubmit = (data: LoginSchemaType) => {
    LoginAccount.mutate(data);
  };

  const handleValidationErrors = () => {
    if (isSubmitted) {
      if (errors.email && errors.password) {
        return "Invalid Account !";
      }

      if (errors.email) {
        return "* Please enter a valid email address !";
      }
    }
  };

  const validationErrors = handleValidationErrors();

  return (
    <div className="flex flex-col items-center w-full md:gap-10 justify-self-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center md:gap-5 gap-3 md:w-[460px] w-[300px] font-Inter md:text-md text-sm"
      >
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-2xl font-bold text-white">Welcome Again!</h1>
          <h3 className="text-white">Please Login to your account</h3>
        </div>

        {validationErrors && (
          <p className="text-lg font-bold text-red-600">{validationErrors}</p>
        )}

        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="h-10 md:h-auto md:placeholder:text-md md:text-md text-[13px] placeholder:text-[13px]"
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address.",
            },
          })}
        />

        <PasswordVisible register={register} error={errors.password?.message} />

        {!LoginAccount.isPending ? (
          <Button
            variant={"default"}
            size={"full"}
            text={"white"}
            className="h-10 md:h-auto"
          >
            Log in
          </Button>
        ) : (
          <ButtonLoading />
        )}
        <div className="flex items-center gap-3">
          <span className="text-white cursor-default">
            Don't have an account?
          </span>
          <a
            className="font-semibold text-white hover:text-primary"
            href="/auth/signup"
          >
            Create an account
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
