import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useGetMe } from "@/hooks/useUser";
import { getToken } from "@/services/authService";
import Avatar from "@/assets/avatar.jpg"; // Ensure this is the correct path

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const token = getToken() || "";
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data } = useGetMe(token);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  const profileImage = imagePreview
    ? imagePreview
    : data?.profilePicture
    ? data.profilePicture
    : Avatar;

  return (
    <div className="flex flex-col items-center max-w-sm gap-3">
      <div className="relative">
        <Input
          id="picture"
          type="file"
          className="absolute top-0 left-0 w-full h-full text-white rounded-full opacity-0 cursor-pointer hover:opacity-20"
          onChange={handleFileChange}
        />
        <div
          className="flex justify-center items-center border-[2px] bg-gray-200 border-blue-500 rounded-full w-[100px] h-[100px]"
          style={{
            backgroundImage: `url(${profileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};
