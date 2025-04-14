"use client";
// components/CustomNode.js
import React, { useContext } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import NodeForm from "../Forms/NodeForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "../ui/button";
import { deleteActivity } from "@/utils/deletion";
import { DataContext } from "../useContext/contextApi";

const CustomNode = ({ id, data: nodeData }) => {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const { data, setData } = useContext(DataContext);

  const handleDeleteNode = (nodeId) => {
    const newActivities = deleteActivity(nodeId, data.activities);
    setData((prevData) => ({
      ...prevData,
      activities: newActivities,
    }));
  };

  return (
    <div className="relative p-2 bg-white rounded-lg shadow-md">
      {/* Delete button positioned absolutely at the top-right */}
      <Button
        onClick={() => handleDeleteNode(id)}
        className="absolute top-2 right-2 p-1 bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer"
      >
        X
      </Button>

      <div className="text-lg text-black">{id + " " + nodeData.title}</div>
      <p className="text-sm text-gray-500">{nodeData.description}</p>
      <div>
        <span className="text-xs font-medium text-gray-700">Completed:</span>
        <span className="text-xs text-gray-500">
          {" "}
          {nodeData.stats.completed}
        </span>
      </div>

      {/* Add child node button */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger>
          <Button className="absolute bottom-2 left-2 p-1 bg-green-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center hover:bg-green-700 cursor-pointer">
            +
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div className="overflow-y-scroll h-screen">
                <NodeForm
                  id={id}
                  appendChild={true}
                  setIsSheetOpen={setIsSheetOpen}
                />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
