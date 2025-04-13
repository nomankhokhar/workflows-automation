"use client";
// components/CustomEdge.js
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
} from "reactflow";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) => {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  // Delete edge function
  const handleDeleteEdge = () => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      {/* Edge label and delete button */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            left: labelX,
            top: labelY,
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
        >
          {/* <div className="shadow-md">
              <button
                onClick={handleDeleteEdge}
                className="bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer"
              >
                X
              </button>
            </div> */}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
