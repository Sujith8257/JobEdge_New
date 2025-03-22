import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export const Customized_Learning_paths = (): JSX.Element => {
  return (
    <main className="bg-[#f9fafbf2] flex justify-center w-full min-h-screen">
      <div className="bg-[#f9fafbf2] w-full max-w-[1440px] h-[1024px] relative">
        {/* Header with shadow */}
        <header className="absolute w-full h-[126px] top-0 left-0 bg-white shadow-[0px_10px_25px_#00000040] flex items-center">
          <div className="ml-[34px]">
            <Button
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
          {/* Left card with dashed border */}
          <Card className="w-[804px] h-[809px] border border-solid border-black rounded-[10px] shadow-[0px_4px_50px_#00000040] relative">
            <CardContent className="p-6">
              <div className="w-full h-[699px] border-[5px] border-dashed border-[#9b9494] bg-white" />
            </CardContent>

            <div className="absolute bottom-[23px] left-1/2 transform -translate-x-1/2">
              <Button className="w-24 h-[42px] bg-neutral-900 rounded-[9.6px] text-white font-bold text-[13.3px]">
                Submit
              </Button>
            </div>
          </Card>

          {/* Right card/panel */}
          <Card className="w-[506px] h-[809px] rounded-[10px]">
            <CardContent className="p-0">
              {/* Content for right panel goes here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};
