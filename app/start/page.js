"use client";
import { StartWorkFlow } from "@/components/Sidebar";
import JsParticles from "@/components/Particles";
import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-700">
      <JsParticles />

      <div className="z-50">
        <StartWorkFlow />
      </div>
    </div>
  );
};

export default Page;
