import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";
import { PasswordChangeData } from "@/types/types";

export const changePasswordApi = async ({
  data,
}: {
  data: PasswordChangeData;
}) => {
  const token = getToken();
  const formData = new FormData();

  formData.append("oldPassword", data.oldPassword);
  formData.append("password", data.newPassword);

  const response = await fetch(`${BaseURL}/user`, {
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
