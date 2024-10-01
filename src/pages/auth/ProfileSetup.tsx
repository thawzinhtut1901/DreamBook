import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { countryCodes } from "@/variables";
import { useNavigate } from "react-router-dom";
import { useProfileSetup } from "@/hooks/useAuth";
import { useGetMe } from "@/hooks/useUser";
import { ButtonLoading } from "@/components/ui/loading-button";
import { getToken } from "@/services/authService";
import { ProfileSetupData } from "@/types/types";
import Swal from "sweetalert2";

const ProfileSetup = () => {
  const profileSetup = useProfileSetup();
  const token = getToken() || "";
  const { data } = useGetMe(token);
  const navigate = useNavigate();
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

  const [errors, setErrors] = useState<{ name?: string; localNumber?: string }>(
    {}
  );

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
      } else {
        setCountryCodeNumber("+95");
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

    const validationErrors: { name?: string; localNumber?: string } = {};
    if (!profileData.name) {
      validationErrors.name = "* Fill Your Username";
    } else if (profileData.name.length > 25) {
      validationErrors.name = "Username must be maximum 25 characters !";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      profileSetup.mutate(profileData, {
        onError: (error: any) => {
          if (error.response && error.response.data) {
            setErrors(error.response.data.errors);
          }
        },
      });
    }
  };

  useEffect(() => {
    if (profileSetup.isSuccess) {
      navigate("/auth/select-category");
    }
  }, [profileSetup.isSuccess]);

  useEffect(() => {
    if (profileSetup.isError) {
      Swal.fire({
        title: "Error",
        text: profileSetup.error.message,
        timer: 2000,
      });
    }
  }, [profileSetup.isError]);

  const handleFileChange = (file: File) => {
    setProfileData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  return (
    <div className="flex flex-col items-center w-full pb-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 md:gap-6 w-[300px] md:w-[460px] font-Inter text-sm md:text-md"
      >
        <h1 className="text-2xl font-bold text-white">Create an account</h1>
        <FileUpload onFileChange={handleFileChange} />
        <Label htmlFor="picture" className="text-white font-Inter text-md">
          Upload Photo
        </Label>
        <div className="flex items-center w-full gap-5">
          <select
            className="flex justify-center items-center px-4 rounded-[5px] h-10 md:h-12 text-sm"
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
            type="number"
            id="phone"
            required
            className="h-10 md:h-auto text-[13px] md:placeholder:text-md md:text-md placeholder:text-[13px]"
            placeholder="Phone"
            value={localPhoneNumber}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLocalPhoneNumber(event.target.value);
            }}
          />
          {errors.localNumber && (
            <p className="text-sm text-red-500">{errors.localNumber}</p>
          )}
        </div>
        <Input
          type="text"
          id="name"
          className="h-10 md:h-auto text-[13px] md:placeholder:text-md md:text-md placeholder:text-[13px]"
          placeholder="Full Name"
          value={profileData.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setProfileData((prev) => ({
              ...prev,
              name: event.target.value,
            }));
          }}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        <select
          className="flex justify-center items-center px-4 rounded-[5px] w-full h-10 md:h-12 text-sm"
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
          <option value="Other">Other</option>
          <option value="Rather not say">Rather not to say</option>
        </select>
        <textarea
          name="bio"
          id="bio"
          className="placeholder:opacity-70 p-4 rounded-[5px] w-full placeholder:text-black"
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
            Create an Account
          </Button>
        ) : (
          <ButtonLoading />
        )}
      </form>
    </div>
  );
};

export default ProfileSetup;
