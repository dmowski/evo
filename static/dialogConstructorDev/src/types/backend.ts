export interface BackendGraphNode {
  node_type: string;
  node_name: string;
  node_content: string;
  node_links: string[];
  node_views: number;
  position_x: number;
  position_y: number;
}
export interface BackendGraph {
  id: number;
  title: string;
  graph: BackendGraphNode[];
}

export interface BackendShortGraph {
  id: number;
  title: string;
}

export interface BackendError {
  error: string;
  additionalInformation: string;
}
