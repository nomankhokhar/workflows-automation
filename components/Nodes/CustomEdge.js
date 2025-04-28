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
  label,
}) => {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

 
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
          <div className="shadow-md">
              {label == "yesActivity" && <button
                className="bg-red-600 text-black text-xs w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer"
              >
                {label == "yesActivity" && "Yes" }
              </button>}
              {label == "noActivity" && <button
                className="bg-red-600 text-black text-xs w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer"
              >
                {label == "noActivity" && "No" }
              </button>}
            </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
