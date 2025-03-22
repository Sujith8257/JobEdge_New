import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { CloudIcon, UploadIcon, SearchIcon, BookOpenIcon, UserIcon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const FileUploader = ({ onFileUpload }: { onFileUpload: (file: File) => void }) => {
  const [file, setFile] = useState<File | null>(null);

  // Handle dropped files
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
      onFileUpload(event.dataTransfer.files[0]);
    }
  };

  // Allow dragging over the drop zone
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      onFileUpload(event.target.files[0]);
    }
  };

  return (
    <div
      className="max-w-md mx-auto mb-8 p-8 border-2 border-dashed border-gray-300 rounded-lg"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <CloudIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <p className="mb-2">Drag and Drop</p>
      <p className="text-gray-500 mb-4">or</p>

      
      <div className="mt-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="border border-gray-300 p-2 rounded-lg"
        />
      </div>

      {file && (
        <p className="mt-4 text-sm text-gray-600">Selected file: {file.name}</p>
      )}
    </div>
  );
};

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleSignOut = () => {
    navigate("/");
  };

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a resume.");
      return;
    }

    console.log("Starting file upload process...");
    console.log("File details:", {
      name: file.name,
      size: file.size,
      type: file.type
    });

    const formData = new FormData();
    formData.append("resume", file);

    try {
      console.log("Sending request to server...");
      const response = await fetch("http://localhost:5500/analyze", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'same-origin'
      });

      console.log("Server response received:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Response not OK:", errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data received:", data);
      
      if (!data.feedback) {
        console.error("No feedback in response data");
        throw new Error("No feedback received from server");
      }

      console.log("Navigating to analysis page...");
      navigate("/analysis", { state: { feedback: data.feedback } });
      
    } catch (error: unknown) {
      console.error("Error details:", {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze resume';
      alert(`Error analyzing resume: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <header className="flex justify-between items-center px-6 py-2">
        <div className="flex items-center">
          <img
            className="w-[95px] h-[95px] object-cover"
            alt="Job Edge Logo"
            src="/job.png"
          />
          <h1 className="ml-4 font-['Roboto',Helvetica] font-bold text-black text-[40px]">
            Job_Edge
          </h1>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={handleSignOut}>
          <UploadIcon className="w-5 h-5"/>
          Sign Out
        </Button>
      </header>

      <main className="max-w-6xl mx-auto mt-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Find Your Dream Job with AI-Powered Matching</h2>
          <p className="text-xl text-gray-600 mb-12">
            Upload your resume, get instant AI feedback, and receive personalized job matches and learning recommendations.
          </p>

          <FileUploader onFileUpload={handleFileUpload} />

          <Button className="px-8 py-2" onClick={handleSubmit}>Submit</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        <Link to="/Analysis">
            <Card className="p-6 cursor-pointer">
              <img src="/resume.png" alt="Resume Analysis" className="w-15 h-15 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Resume Analysis</h3>
              <p className="text-gray-600">
                Get instant personalized feedback and suggestions on your resume with our AI-powered analysis system.
              </p>
            </Card>
          </Link>

          <Link to="/desktop">
            <Card className="p-6 cursor-pointer">
              <img src="/search.png" alt="Resume Analysis" className="w-15 h-15 mb-4" />
              <h3 className="text-xl font-bold mb-2">Intelligent Job Matching</h3>
              <p className="text-gray-600">
                Personalized job recommendations based on profile and resume data.
              </p>
            </Card>
          </Link>

          <Link to="/customized-learning-paths">
            <Card className="p-6 cursor-pointer">
              <img src="/path.png" alt="Resume Analysis" className="w-15 h-15 mb-4" />
              <h3 className="text-xl font-bold mb-2">Customized Learning Paths</h3>
              <p className="text-gray-600">
                AI-suggested courses and resources to bridge skill gaps.
              </p>
            </Card>
          </Link>

          <Card className="p-6">
            <img src="/profile.png" alt="Resume Analysis" className="w-15 h-15 mb-4" />
            <h3 className="text-xl font-bold mb-2">Detailed Resume Creation</h3>
            <p className="text-gray-600">
              Create your resume with skills, experience, and preferences.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};