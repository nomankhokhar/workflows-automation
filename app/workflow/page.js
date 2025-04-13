"use client";

import { DataContext } from "@/components/useContext/contextApi";
import Workflow from "@/components/Workflow";
import { useContext } from "react";

const StartWorkflow = () => {
  const { data } = useContext(DataContext);

  return (
    <div className="h-screen w-screen">
      <Workflow workflowData={data} />
    </div>
  );
};

export default StartWorkflow;
