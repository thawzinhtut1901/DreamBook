import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { countryCodes } from "@/variables";
import { useProfileSetup } from "@/hooks/useAuth";
import { ProfileSetupData } from "@/types/types";
import { useGetMe } from "@/hooks/useUser";
import { ButtonLoading } from "@/components/ui/loading-button";
import { getToken } from "@/services/authService";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";

const Info = () => {
  const profileSetup = useProfileSetup();
  const token = getToken() || "";
  const { data } = useGetMe(token);
  const [localPhoneNumber, setLocalPhoneNumber] = useState("");
  const [countryCodeNumber, setCountryCodeNumber] = useState("+95");
  const [profileData, setProfileData] = useState<ProfileSetupData>({
    name: "",
    profilePicture: undefined,
    phoneNumber: "",
    bio: "",
    gender: "male",
    localNumber: "",
    countryCode: "",
  });

  useEffect(() => {
    if (localPhoneNumber || countryCodeNumber) {
      setProfileData((prev) => ({
        ...prev,
        phoneNumber: countryCodeNumber + localPhoneNumber,
      }));
    }
  }, [localPhoneNumber, countryCodeNumber]);

  useEffect(() => {
    if (data) {
      if (data.localNumber) {
        setLocalPhoneNumber(data.localNumber);
      }
      if (data.countryCode) {
        setCountryCodeNumber(data.countryCode);
      }
      setProfileData((prev) => ({
        ...prev,
        name: data.name || "",
        bio: data.bio || "",
        gender: data.gender || "",
        phoneNumber: countryCodeNumber + localPhoneNumber,
      }));
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    profileSetup.mutate(profileData);
  };

  useEffect(() => {
    if (profileSetup.isError) {
      Swal.fire({
        icon: "error",
        title: profileSetup.error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (profileSetup.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    }
  }, [profileSetup.isSuccess, profileSetup.isError]);

  const handleFileChange = (file: File) => {
    setProfileData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center p-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 p-4 md:p-0 w-full md:w-[460px] font-Inter"
        >
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Create an account
          </h1>
          <FileUpload onFileChange={handleFileChange} />
          <Label
            htmlFor="picture"
            className="text-black font-Inter dark:text-white"
          >
            Upload Photo
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Full Name"
            className="dark:border-dark-border dark:bg-dark-bg h-10 md:h-auto text-[13px] md:placeholder:text-md md:text-md dark:text-white dark:placeholder:text-white placeholder:text-[13px]"
            value={profileData.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setProfileData((prev) => ({
                ...prev,
                name: event.target.value,
              }));
            }}
          />

          <div className="dark:border-dark-border bg-white dark:bg-dark-bg p-4 border border-border rounded-[5px] w-full h-12 font-Inter font-semibold text-secondary-foreground text-sm dark:placeholder:text-white text-opacity-50">
            {data?.email}
          </div>
          <div className="flex items-center w-full gap-5">
            <select
              className="flex justify-center items-center dark:border-dark-border dark:bg-dark-bg px-4 border border-border rounded-[5px] h-10 md:h-12 text-sm dark:text-white dark:placeholder:text-white"
              value={countryCodeNumber}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setCountryCodeNumber(event.target.value);
              }}
            >
              {countryCodes.map((code, index) => (
                <option key={index} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <Input
              type="tel"
              id="phone"
              placeholder="Phone"
              value={localPhoneNumber}
              className="dark:border-dark-border dark:bg-dark-bg h-10 md:h-auto text-[13px] md:placeholder:text-md md:text-md dark:text-white dark:placeholder:text-white placeholder:text-[13px]"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLocalPhoneNumber(event.target.value);
              }}
            />
          </div>

          <select
            className="flex justify-center items-center dark:border-dark-border dark:bg-dark-bg px-4 border border-border rounded-[5px] w-full h-10 md:h-12 text-sm dark:text-white dark:placeholder:text-white"
            value={profileData.gender}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setProfileData((prev) => ({
                ...prev,
                gender: event.target.value,
              }));
            }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Rather not say">Rather not to say</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="bio"
            id="bio"
            className="dark:border-dark-border dark:bg-dark-bg placeholder:opacity-70 p-4 border border-border rounded-[5px] w-full dark:text-white dark:placeholder:text-white placeholder:text-black"
            placeholder="Bio"
            value={profileData.bio}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setProfileData((prev) => ({
                ...prev,
                bio: event.target.value,
              }));
            }}
          ></textarea>

          {!profileSetup.isPending ? (
            <Button variant={"default"} size={"full"} text={"white"}>
              Update Profile
            </Button>
          ) : (
            <ButtonLoading />
          )}
        </form>
      </div>
    </div>
  );
};

export default Info;
