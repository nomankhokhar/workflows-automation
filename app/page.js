"use client";
import JsParticles from "@/components/Particles";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  return (
    <>
      <div className="relative h-screen bg-gradient-to-br from-green-400 to-blue-800 flex flex-col justify-center items-center text-white">
        <JsParticles />
        <div className="text-center max-w-3xl p-6">
          <h1 className="text-6xl font-bold leading-tight mb-4">
            Workflows by Noman Ali
          </h1>
          <p className="text-lg mb-8">We are almost there</p>
          <p className="text-base mb-8">
            Start your workflow with us and be the first to know when we launch.
          </p>
          <div className="flex justify-center w-full">
            <input
              type="email"
              placeholder="Email *"
              className="p-3 w-80 rounded-l-lg text-gray-800 border"
            />
            <button className="bg-white text-gray-800 px-6 py-3 rounded-r-lg hover:bg-gray-200">
              Sign Up
            </button>
          </div>
        </div>
        <div className="absolute top-5 right-5">
          <Button
            onClick={() => router.push("/start")}
            className="px-6 py-3 rounded-lg text-white cursor-pointer z-50 hover:shadow-xl"
          >
            Start Workflow
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
