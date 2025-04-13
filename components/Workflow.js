"use client";

import React, { useCallback, useEffect } from "react";
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
  );
}
