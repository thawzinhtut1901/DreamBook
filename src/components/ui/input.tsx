import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  button?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, button, type = "text", ...props }, ref) => {
    return (
      <div className={cn("w-full h-12 relative flex items-center", className)}>
        {icon && (
          <span className="absolute flex items-center right-4">{icon}</span>
        )}
        {button}
        <input
          type={type}
          className={cn(
            "p-4 pr-4 rounded-[5px] w-full h-12 font-semibold text-sm font-Inter bg-white placeholder:opacity-70 placeholder:text-black border border-border",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
