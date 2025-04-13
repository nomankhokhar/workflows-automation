import dagre from "dagre";

const nodeWidth = 250;
const nodeHeight = 80;

export function flattenWorkflowToFlowElements(workflowJson) {
  const nodes = [];
  const edges = [];
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" }); // Top-to-bottom layout

  let yOffset = 0; // Manual vertical positioning
  let xOffset = 0; // Manual horizontal positioning
  const visited = new Set();

  // Helper function to process an activity recursively
  function processActivity(activity, parentId = null) {
    const { id, name } = activity;

    // Skip if already visited to avoid processing the same activity multiple times
    if (!id || visited.has(id)) return;

    // Mark the activity as visited
    visited.add(id);

    // Create a node for the activity
    nodes.push({
      id,
      data: {
        title: name,
        description: name,
        stats: {
          completed: 14,
        },
        data: activity,
      },
      position: { x: xOffset, y: yOffset },
      type: activity.app,
    });

    dagreGraph.setNode(id, { width: nodeWidth, height: nodeHeight });

    // Create an edge if this activity has a parent
    if (parentId) {
      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        animated: true,
        type: "custom-edge",
      });
      dagreGraph.setEdge(parentId, id);
    }

    // If the activity has nested activities (like yesActivity, noActivity, or LoopEvent activities), process them
    if (activity.input.yesActivity) {
      activity.input.yesActivity.forEach((yesActivity) => {
        processActivity(yesActivity, id); // Create edge from parent (current activity) to yesActivity
      });
    }

    if (activity.input.noActivity) {
      activity.input.noActivity.forEach((noActivity) => {
        processActivity(noActivity, id); // Create edge from parent (current activity) to noActivity
      });
    }

    if (activity.input.activities) {
      activity.input.activities.forEach((subActivity) => {
        processActivity(subActivity, id); // Create edge from parent (current activity) to subActivity
      });
    }
  }

  // Start flattening the workflow activities from the top level
  let prevId = null;
  workflowJson?.activities?.forEach((activity) => {
    processActivity(activity, prevId);
    prevId = activity.id;
  });

  // Apply Dagre layout to calculate positions for nodes
  dagre.layout(dagreGraph);

  // Update node positions based on Dagre layout
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2, // Center the node horizontally
      y: nodeWithPosition.y - nodeHeight / 2, // Center the node vertically
    };
  });

  return { nodes, edges };
}
