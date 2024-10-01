import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onFileChange: (file: File) => void;
  coverImage?: string | null;
}

export const BookCoverChange: React.FC<FileUploadProps> = ({
  onFileChange,
  coverImage,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 max-w-sm">
      <div className="relative">
        <Input
          id="picture"
          type="file"
          className="top-0 left-0 absolute opacity-0 hover:opacity-20 w-full h-full text-white cursor-pointer"
          onChange={handleFileChange}
        />

{/* className="md:mx-[52.5px] md:my-[30px] p-3 w-[100px] md:w-[127px] h-[150px] md:h-[191px]" */}
        {coverImage ? (
          <div
            className="flex justify-center items-center mx-[20px] md:mx-[52.5px] my-[13px] md:my-[30px] w-[100px] md:w-[127px] h-[150px] md:h-[191px]"
            style={{
              backgroundImage: imagePreview
                ? `url(${imagePreview})`
                : coverImage && coverImage
                ? `url(${coverImage})`
                : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ) : (
          <div className="flex justify-center items-center mx-[52.5px] my-[30px] w-[127px] h-[191px]"></div>
        )}
      </div>
    </div>
  );
};

export const BookCoverPreview: React.FC<FileUploadProps> = ({
  coverImage,
}) => {
  const [imagePreview] = useState<string | null>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     setImagePreview(URL.createObjectURL(file));
  //     onFileChange(file);
  //   }
  // };

  return (
    <div className="flex flex-col items-center gap-3 max-w-sm">
      <div className="relative">
        {/* <Input
          id="picture"
          type="file"
          className="top-0 left-0 absolute opacity-0 hover:opacity-20 w-full h-full text-white cursor-pointer"
          onChange={handleFileChange}
        /> */}
        {coverImage ? (
          <div
            className="w-[86px] h-[129px]"
            style={{
              backgroundImage: imagePreview
                ? `url(${imagePreview})`
                : coverImage && coverImage
                ? `url(${coverImage})`
                : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ) : (
          <div className="w-[86px] h-[129px]"></div>
        )}
      </div>
    </div>
  );
};
