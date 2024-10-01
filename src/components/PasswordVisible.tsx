import * as React from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { UseFormRegister } from "react-hook-form";

interface PasswordVisibleProps {
  register: UseFormRegister<any>;
  error?: string;
}

const PasswordVisible: React.FC<PasswordVisibleProps> = ({
  register,
  error,
}) => {
  const [visible, setVisible] = React.useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="relative w-full h-12">
      <input
        type={visible ? "text" : "password"}
        className="p-4 pr-12 rounded-[5px] w-full lg:h-12 font-semibold text-sm font-Inter bg-white placeholder:opacity-70 placeholder:text-black  h-10 lg:placeholder:text-md lg:text-md text-[13px] placeholder:text-[13px] border border-border"
        {...register("password")}
        placeholder="Password"
      />
      <button
        type="button"
        className="absolute transform -translate-y-1/2 right-4 top-1/2"
        onClick={toggleVisibility}
      >
        {visible ? <IoMdEye /> : <IoMdEyeOff />}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default PasswordVisible;
