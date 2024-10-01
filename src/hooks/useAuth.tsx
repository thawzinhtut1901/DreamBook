import { LoginAPi, profileSetupApi, SignUpAPi } from "@/api/authApi";
import { AuthData, ProfileSetupData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () =>
  useMutation({
    mutationFn: (data: AuthData) => SignUpAPi({ data }),
  });

export const useLogIn = () =>
  useMutation({
    mutationFn: (data: AuthData) => LoginAPi({ data }),
  });

export const useProfileSetup = () =>
  useMutation({
    mutationFn: (data: ProfileSetupData) => profileSetupApi({ data }),
  });
