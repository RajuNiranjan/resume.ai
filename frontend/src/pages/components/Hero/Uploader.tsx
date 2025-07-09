import { analyzePdf } from "@/apis/upload";
import { inter } from "@/fonts";
import React, { useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export const Uploader = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGetScore = async () => {
    try {
      if (selectedFile) {
        const result = await analyzePdf({
          selectedFile,
          jobDescription,
        });

        console.log("Resume Score:", result);
      }
    } catch (error) {
      console.error("Error getting resume score:", error);
    }
  };

  return (
    <div className="min-h-[34rem] xl:p-[1.75rem]">
      <h1
        className={` ${inter.className}  font-[var(--font-inter)] text-center text-[var(--text-primary)] text-xs  xl:text-3xl `}
      >
        <TypeAnimation
          sequence={[
            "Great Careers Start with Great Resumes",
            5000,
            "Your Next Opportunity Starts Here",
            5000,
            "You're One Upload Away from Something Big",
            5000,
            "Smart Resume Review for Smart Job Seekers",
            5000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </h1>
      <div className="min-h-[32rem] grid grid-cols-1  xl:grid-cols-2 xl:p-[2rem] gap-[2rem]">
        {/* Right Upload Section */}
        <div className="flex justify-center items-center w-full h-full">
          <div
            onClick={!selectedFile ? triggerFileInput : undefined}
            className="relative cursor-pointer w-full h-full border border-dashed rounded-[1.25rem] border-[var(--text-primary)] flex flex-col items-center justify-center text-center gap-4 bg-white hover:bg-gray-50 transition px-6 py-8"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Remove button */}
            {selectedFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="absolute top-3 right-4 text-red-500 text-sm underline hover:text-red-700"
              >
                Remove
              </button>
            )}

            {/* File status */}
            {selectedFile ? (
              <>
                <p className="text-gray-700 text-lg font-medium">
                  📄 {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500">(PDF uploaded)</p>
              </>
            ) : (
              <>
                <small className="text-[var(--text-primary)] text-base">
                  Click or drop a PDF file here to upload
                </small>
              </>
            )}
          </div>
        </div>

        {/* Left Text Area & Button  */}
        <div className="w-full h-full flex flex-col gap-4">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste Job Description text here or write something..."
            className="border border-dashed border-[var(--text-primary)] rounded-[1.25rem] w-full h-full resize-none p-4 text-sm text-[var(--text-primary)] focus:outline-none "
          />

          <button
            onClick={handleGetScore}
            className="w-full h-[3.5rem] bg-[var(--text-secondary)] text-[var(--color-primary)] font-semibold rounded-[0.5rem] hover:opacity-90 transition cursor-pointer"
          >
            Get Score
          </button>
        </div>
      </div>
    </div>
  );
};
