import BaseURL from "@/services/ApiEndPoint";
import { getToken } from "@/services/authService";
import {
  fetchBookData,
  otherProfileData,
  profileFetchData,
} from "@/types/types";

const userToken = getToken();

export const fetchMyProfile = async (token: string) => {
  if (userToken) {
    const response: Response = await fetch(`${BaseURL}/user/me`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    return result as profileFetchData;
  } else {
    return null;
  }
};

export const fetchOtherProfile = async (userId: string) => {
  const response: Response = await fetch(`${BaseURL}/user/${userId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "GET",
    redirect: "follow",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result as otherProfileData;
};

export const getUserBook = async (userId: string, pageParam: number) => {
  const token = getToken();
  const response: Response = await fetch(
    `${BaseURL}/books/public?user_id=${userId}&page=${pageParam}&limit=12`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result as fetchBookData;
};
