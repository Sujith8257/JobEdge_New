import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

import { Card, CardContent } from "../../components/ui/card";

export const Analysis = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const feedback = location.state?.feedback || "No feedback available";

  return (
    <main className="bg-[#f9fafbf2] flex justify-center w-full min-h-screen">
      <div className="bg-[#f9fafbf2] w-full max-w-[1440px] h-[1024px] relative">
        {/* Header with shadow */}
        <header className="absolute w-full h-[126px] top-0 left-0 bg-white shadow-[0px_10px_25px_#00000040] flex items-center">
          <div className="ml-[34px]">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              className="h-14 w-48 rounded-2xl border-2 border-[#767676] relative p-0 overflow-hidden"
            >
              <div className="absolute left-1 top-1.5 w-[47px] h-12 bg-green-400 rounded-xl flex items-center justify-center">
                <ArrowLeftIcon className="h-[25px] w-[25px]" />
              </div>
              <span className="ml-14 font-semibold text-xl">Go Back</span>
            </Button>
          </div>
        </header>

        {/* Main content area */}
        <div className="pt-[166px] px-[41px] flex gap-[42px]">
          {/* Left card with feedback */}
          <Card className="w-[804px] h-[809px] border border-solid border-black rounded-[10px] shadow-[0px_4px_50px_#00000040] relative">
            <CardContent className="p-6">
              <div className="w-full h-[699px] border-[5px] border-dashed border-[#9b9494] bg-white p-4 overflow-auto whitespace-pre-wrap">
                {feedback}
              </div>
            </CardContent>
          </Card>

          {/* Right card/panel */}
          <Card className="w-[506px] h-[809px] rounded-[10px]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">AI Analysis Results</h2>
              <p className="text-gray-600">
                Review the AI-generated feedback about your resume on the left panel.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};