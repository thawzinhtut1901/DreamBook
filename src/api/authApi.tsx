import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";
import { ProfileSetupData } from "@/types/types";

export const SignUpAPi = async ({
  data,
}: {
  data: {
    email: string;
    password: string;
  };
}) => {
  const response: Response = await fetch(`${BaseURL}/auth/signup`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};

export const LoginAPi = async ({
  data,
}: {
  data: {
    email: string;
    password: string;
  };
}) => {
  const response: Response = await fetch(`${BaseURL}/auth/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};

export const profileSetupApi = async ({ data }: { data: ProfileSetupData }) => {
  const token = getToken();
  const formData = new FormData();

  formData.append("name", data.name);
  if (data.profilePicture) {
    formData.append("profilePicture", data.profilePicture);
  }
  if (data.phoneNumber) {
    formData.append("phoneNumber", data.phoneNumber);
  }

  if (data.bio) {
    formData.append("bio", data.bio);
  }
  formData.append("gender", data.gender);

  const response: Response = await fetch(`${BaseURL}/user`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "PATCH",
    redirect: "follow",
    body: formData,
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};
