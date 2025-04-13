"use client";
// components/CustomNode.js
import React from "react";
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
const CustomNode = ({ id, data }) => {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const { setNodes, setEdges } = useReactFlow();

  const handleDeleteNode = (nodeId) => {
    // Delete node from nodes state
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));

    // Delete edges connected to the node (both incoming and outgoing)
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const handleAddChildNode = (parentId) => {
    const workflowData = sessionStorage.getItem("workflow");
    const WorkFlowParseData = JSON.parse(workflowData);

    setShowNodeForm(true);

    // insertAfter(
    //   parentId,
    //   {
    //     id: `${generateUniqueId()}`,
    //     name: "Newly Added Activity",
    //     app: "CoreEvents",
    //     event: "TemporarySaveEvent",
    //     input: {
    //       source: "{{activity.A2.item}}",
    //     },
    //   },
    //   WorkFlowParseData?.activities
    // );

    // Get the position of the parent node to place the child node below it
    // const parentNode = getNodes().find((node) => node.id === parentId);
    // const parentPosition = parentNode ? parentNode.position : { x: 0, y: 0 };
    // // Create a new child node
    // const newChildNode = {
    //   id: `child-${Math.random()}`, // Generate a unique ID
    //   type: parentNode.type, // Use the same type as the parent node (can be customized)
    //   data: {
    //     title: `${parentNode.data.title} Child`,
    //     description: `This is a child node of ${parentNode.data.title}`,
    //     stats: { completed: 0 },
    //   },
    //   position: { x: parentPosition.x, y: parentPosition.y + 150 }, // Place it below the parent node
    // };
    // // Add the new node to the nodes state
    // setNodes((nds) => [...nds, newChildNode]);
    // // Add an edge connecting the parent to the new child node
    // const newEdge = {
    //   id: `e-${parentId}-${newChildNode.id}`,
    //   source: parentId,
    //   target: newChildNode.id,
    //   animated: true,
    //   type: "custom-edge",
    // };
    // // Add the edge to the edges state
    // setEdges((eds) => [...eds, newEdge]);
  };

  const ShowNodeData = () => {
    console.log("Node ID:", id);
    console.log("Node Data:", data);
  };
  return (
    <div
      className="relative p-2 bg-white rounded-lg shadow-md"
      onClick={ShowNodeData}
    >
      {/* Delete button positioned absolutely at the top-right */}
      {/* <button
        onClick={() => handleDeleteNode(id)}
        className="absolute top-2 right-2 p-1 bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer"
      >
        X
      </button> */}

      <div className="text-lg text-black">{id + " " + data.title}</div>
      <p className="text-sm text-gray-500">{data.description}</p>
      <div>
        <span className="text-xs font-medium text-gray-700">Completed:</span>
        <span className="text-xs text-gray-500"> {data.stats.completed}</span>
      </div>

      {/* Add child node button */}
      <Sheet>
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
