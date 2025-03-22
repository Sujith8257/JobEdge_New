import React, { useState } from "react";
import { ArrowLeftIcon, UploadIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";

export const Desktop = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState<string>(""); // State for job role
  const [jobLinks, setJobLinks] = useState<{ [key: string]: string }>({}); // State for job links

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      console.log("Selected file:", event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
      console.log("Dropped file:", event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    if (!file || !jobRole) {
      alert("Please upload a resume and enter a job role.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_role", jobRole);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch job links");
      }

      const data = await response.json();
      setJobLinks(data.job_links);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching job links.");
    }
  };

  const FileUploader = () => {
    return (
      <div 
        className="w-full h-[699px] bg-white border-[5px] border-dashed border-[#9b9494] flex items-center justify-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            document.getElementById('file-upload')?.click();
          }
        }}
        aria-label="Drop zone for file upload"
      >
        <Card className="w-[252px] h-[216px] bg-[#dddddd] rounded-[40px] border-2 border-dashed border-neutral-600 shadow-[0px_0px_200px_-50px_#000000b7]">
          <CardContent className="flex flex-col items-center justify-center h-full p-0">
            <div className="flex flex-col items-center gap-5">
              <div className="h-[50px] w-[62px]">
                <UploadIcon className="h-full w-full" />
              </div>
              <p className="font-normal text-black text-base">
                Drag and Drop
              </p>
              <p className="font-normal text-black text-base">or</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button className="bg-neutral-600 text-white rounded-[10px] h-[29px] w-[108px]">
                  Browse file
                </Button>
              </label>
              {file && (
                <p className="mt-4 text-sm text-gray-600">Selected file: {file.name}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="bg-[#f9fafbf2] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#f9fafbf2] w-full max-w-[1440px] relative">
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-2">
          <Link to="/Dashboard">
            <button className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group" type="button">
              <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                  <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
                  <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
                </svg>
              </div>
              <p className="translate-x-2">Go Back</p>
            </button>
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex gap-10 px-10 pt-[20px]">
          {/* Left Section - File Upload Area */}
          <Card className="w-[804px] h-[809px] rounded-[10px] border border-solid border-black shadow-[0px_4px_50px_#00000040]">
            <CardContent className="p-6">
              <FileUploader />
            </CardContent>
          </Card>

          {/* Right Section - Form */}
          <Card className="w-[506px] h-[809px] rounded-[10px]">
            <CardContent className="p-0">
              <div className="p-11">
                <h2 className="font-bold text-3xl text-[#05060f] mb-8">
                  Desired Job Role
                </h2>
                <Input 
                  className="h-[51px] bg-[#05060f0a] rounded-lg mb-8" 
                  value={jobRole} 
                  onChange={(e) => setJobRole(e.target.value)} // Update job role state
                />
                <div className="flex justify-center">
                  <Button 
                    className="w-24 h-[42px] bg-neutral-900 rounded-[9.6px] text-white font-bold text-[13.3px]"
                    onClick={handleSubmit} // Call handleSubmit on button click
                  >
                    Submit
                  </Button>
                </div>
              </div>

              <div className="mx-11 mt-4">
                <Card className="w-full h-[497px] border-[2.5px] border-solid border-black shadow-[0px_4px_4px_#00000040]">
                  <CardContent className="flex justify-center pt-7">
                    <h3 className="font-bold text-3xl text-black">Job Links</h3>
                  </CardContent>
                  <CardContent>
                    {Object.entries(jobLinks).map(([site, url]) => (
                      <p key={site}>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          {site}
                        </a>
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};