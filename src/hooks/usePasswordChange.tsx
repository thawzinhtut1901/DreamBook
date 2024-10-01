import { changePasswordApi } from "@/api/changePasswordApi";
import { PasswordChangeData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const usePasswordChange = () =>
    useMutation({
      mutationFn: (data: PasswordChangeData) => changePasswordApi({ data }),
    });
  