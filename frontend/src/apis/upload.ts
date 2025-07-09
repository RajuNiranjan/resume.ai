import { axiosInstance } from "@/utils/axiosInstance";

interface AnalyzePdfProps {
  selectedFile: File;
  jobDescription: string;
}

export const analyzePdf = async ({ selectedFile, jobDescription }: AnalyzePdfProps) => {
  try {
    const formData = new FormData();
    formData.append("resume", selectedFile); 
    formData.append("jd", jobDescription); 

    const response = await axiosInstance.post("/resume/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to analyze resume:", error);
    throw error;
  }
};
