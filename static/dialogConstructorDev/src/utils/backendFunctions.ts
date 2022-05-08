import { BackendGraph, BackendShortGraph } from "../types/backend";

const baseUrl = location.host.startsWith("localhost:34567")
  ? "http://localhost:62544/"
  : location.origin + "/";

const getList = async (): Promise<BackendShortGraph[]> => {
  const req = await fetch(baseUrl + "api/v1/dialo_graph.list");
  const listOfNodes = await req.json();
  return listOfNodes?.graph_list || [];
};

const getOne = async (id: string): Promise<BackendGraph> => {
  const req = await fetch(baseUrl + "api/v1/dialo_graph.get?graph_id=" + id);
  const graphData = await req.json();
  return graphData;
};

const create = async (graphData: BackendGraph): Promise<BackendGraph> => {
  const response = await fetch(baseUrl + "api/v1/dialo_graph.add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphData),
  });
  const result = await response.json();
  console.log("Saving result", result);

  if (result.error) {
    return result.error + result.message;
  }
};

const update = async (graphData: BackendGraph): Promise<BackendGraph> => {
  const response = await fetch(baseUrl + "api/v1/dialo_graph.update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphData),
  });
  const result = await response.json();
  console.log("Saving result", result);

  if (result.error) {
    return result.error + result.message;
  }
};

export default {
  update,
  create,
  getOne,
  getList,
};
