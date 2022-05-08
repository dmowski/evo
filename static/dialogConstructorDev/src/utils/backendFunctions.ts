import { BackendError, BackendGraph, BackendShortGraph } from "../types/backend";

const baseUrl = location.host.startsWith("localhost:34567")
  ? "http://localhost:62544/"
  : location.origin + "/";

const getList = async (): Promise<BackendShortGraph[] | BackendError> => {
  try {
    const req = await fetch(baseUrl + "api/v1/dialo_graph.list");
    const listOfNodes = await req.json();
    return listOfNodes?.graph_list || [];
  } catch (e) {
    console.log("error on getList backend function", e);

    return {
      error: "Проблема при получении списка диалогов",
      additionalInformation: JSON.stringify(e),
    };
  }
};

const getOne = async (id: number): Promise<BackendGraph | BackendError> => {
  try {
    const req = await fetch(baseUrl + "api/v1/dialo_graph.get?graph_id=" + id);
    const graphData = await req.json();
    if (graphData.error) {
      return {
        error: `Проблема при получении информации об диалоге #${id}`,
        additionalInformation: graphData.message,
      };
    }

    return graphData;
  } catch (e) {
    console.log("error on getOne backend function", e);

    return {
      error: `Проблема при получении информации об диалоге #${id}`,
      additionalInformation: JSON.stringify(e),
    };
  }
};

const create = async (graphData: BackendGraph): Promise<void | BackendError> => {
  try {
    const response = await fetch(baseUrl + "api/v1/dialo_graph.add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphData),
    });
    const result = await response.json();
    console.log("create graph result", result);

    if (result.error) {
      console.log("error on create backend function");
      console.log(result.error, result.message);

      return {
        error: `Проблема при сохранении диалога`,
        additionalInformation: result.error + result.message,
      };
    }
  } catch (e) {
    console.log("error on create backend function", e);

    return {
      error: `Проблема при сохранении диалога`,
      additionalInformation: JSON.stringify(e),
    };
  }
};

const update = async (graphData: BackendGraph): Promise<void | BackendError> => {
  try {
    const response = await fetch(baseUrl + "api/v1/dialo_graph.update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphData),
    });
    const result = await response.json();
    console.log("update graph result", result);

    if (result.error) {
      console.log("error on update backend function");
      console.log(result.error, result.message);

      return {
        error: `Проблема при обновлении диалога`,
        additionalInformation: result.error + result.message,
      };
    }
  } catch (e) {
    console.log("error on create backend function", e);

    return {
      error: `Проблема при обновлении диалога`,
      additionalInformation: JSON.stringify(e),
    };
  }
};

export default {
  update,
  create,
  getOne,
  getList,
};
