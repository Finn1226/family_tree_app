import { useMemo } from "react";
import dagre from "@dagrejs/dagre";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import type { Person, ParentChild } from "../types/family";

type FamilyGraphProps = {
  people: Person[];
  relationships: ParentChild[];
};

const NODE_WIDTH = 180;
const NODE_HEIGHT = 70;

function createGraph(
  people: Person[],
  relationships: ParentChild[],
): {
  nodes: Node[];
  edges: Edge[];
} {
  const graph = new dagre.graphlib.Graph();

  graph.setDefaultEdgeLabel(() => ({}));

  // TB = top to bottom
  graph.setGraph({
    rankdir: "TB",
    nodesep: 50,
    ranksep: 100,
  });

  /*
   * Step 1:
   * Create one React Flow node for each person.
   */
  const nodes: Node[] = people.map((person) => ({
    id: String(person.id),

    data: {
      label: person.chinese_name
        ? `${person.full_name} (${person.chinese_name})`
        : person.full_name,
    },

    position: {
      x: 0,
      y: 0,
    },

    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  }));

  /*
   * Step 2:
   * Create one edge for each parent-child relationship.
   */
  const edges: Edge[] = relationships.map((relationship) => ({
    id: String(relationship.id),

    source: String(relationship.parent_id),
    target: String(relationship.child_id),

    type: "smoothstep",
  }));

  /*
   * Step 3:
   * Give Dagre all nodes and their dimensions.
   */
  nodes.forEach((node) => {
    graph.setNode(node.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  /*
   * Step 4:
   * Give Dagre all parent -> child edges.
   */
  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  /*
   * Step 5:
   * Dagre calculates the layout.
   */
  dagre.layout(graph);

  /*
   * Step 6:
   * Copy Dagre's calculated positions
   * back into the React Flow nodes.
   */
  nodes.forEach((node) => {
    const position = graph.node(node.id);

    node.position = {
      x: position.x - NODE_WIDTH / 2,
      y: position.y - NODE_HEIGHT / 2,
    };
  });

  return {
    nodes,
    edges,
  };
}

export default function FamilyGraph({
  people,
  relationships,
}: FamilyGraphProps) {
  const { nodes, edges } = useMemo(
    () => createGraph(people, relationships),
    [people, relationships],
  );

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
      }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
