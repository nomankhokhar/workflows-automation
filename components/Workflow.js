"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./Nodes/CustomNode";
import { flattenWorkflowToFlowElements } from "../utils/flowUtils";
import CustomEdge from "@/components/Nodes/CustomEdge";
import StartNode from "./Nodes/StartNode";
import YesActivity from "./Nodes/YesActivity";
import NoActivity from "./Nodes/NoActivity";
import { Button } from "./ui/button";
import { DataContext } from "./useContext/contextApi";

const edgeTypes = {
  "custom-edge": CustomEdge,
};

const nodeTypes = {
  Cluster: CustomNode,
  CoreEvents: CustomNode,
  Email: CustomNode,
  Slack: CustomNode,
  start: StartNode,
  yesActivity: YesActivity,
  noActivity: NoActivity,
};

export default function Workflow({ workflowData }) {
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();

  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const handleButtonClick = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  useEffect(() => {
    if (workflowData && Object.keys(workflowData).length > 0) {
      const { nodes: newNodes, edges: newEdges } =
        flattenWorkflowToFlowElements(workflowData);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [setEdges, setNodes, workflowData]);

  return (
    <>
      <div className="relative">
        {/* Button positioned top-right */}
        <Button
          className="absolute top-6 right-6 flex items-center justify-center px-4 py-2 border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer z-50"
          onClick={handleButtonClick}
        >
          Show JSON
        </Button>

        {/* Overlay */}
        {isOverlayVisible && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black p-6 rounded-md w-full h-full relative text-white">
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 flex items-center justify-center px-4 py-2 border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer z-50"
                onClick={handleCloseOverlay}
              >
                Close
              </button>
              {/* JSON Content with Scroll */}
              <pre className="p-3 w-full h-full overflow-y-auto">
                {JSON.stringify(workflowData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
}
