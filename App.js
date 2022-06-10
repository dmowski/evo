const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const randomSentence = require("random-sentence");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || "62544";
app.get("/api/v1/ping", (req, res) => {
  res.json({ message: "ok" });
});

const listOfGraphs = [];

/*
Отправка диалогового скрипта:

POST api/v1/dialo_graph.update

-------
{
    "id": 1,
    "title": "Заголовок диалогового графа",
    "graph": [
        {
            "node_type": "intent",
            "node_name": "greet",
            "node_content": "hey\nhey there\nhello\nhi\ngood morning",
            "node_links": ["greet"],
            "node_views": 0,
            "position_x": 10,
            "position_y": 10
        },
        {
            "node_type": "skill",
            "node_name": "greet",
            "node_content": "hey\nhey there\nhello\nhi\ngood morning",
            "node_links": [],
            "node_views": 0,
            "position_x": 10,
            "position_y": 10
        }
    ]
}

-------

Параметры:
    id - идентификатор диалогового скрипта (графа). Их может быть несколько. Задаётся системой. Если создан новый скрипт, id=0.
    title - заголовок скрипта
    graph - диалоговый граф (скрипт). Состоит из массива нод.
        node_type - тип ноды: "intent" или "skill". Тип последующей ноды должен отличаться от типа текущей ноды. Т.е. после ноды "intent" обязательно идёт одна или несколько нод типа "skill".
        node_name - имя ноды, произвольное название, но для каждого типа ноды названия должны быть уникальными. Т.е. не может быть в диалоговом скрипте две ноды с типом "intent" и именем "greet". Но могут быть две ноды с именем "greet" и разными типами - "intent" и "skill".
        node_content - реплики пользователя или бота, разделённые переводом каретки.
        node_links - ссылки из данной ноды на другие ноды. (Это те самые стрелочки). Ссылок может быть от 0 до сколько угодно большого количества. Главное условие - типы последующих нод должны быть иными.
        node_views - "Срабатывания" данной ноды при общении бота с пользователем. Пока оставляем как 0.
        position_x
        position_y

*/

const validateGraphNode = (graphNode) => {
  const { node_type, node_name, node_content, node_links, node_views, position_x, position_y } =
    graphNode;

  console.log(graphNode);

  if (typeof node_type !== "string") {
    return "'node_name' should be a string";
  }
  if (typeof node_name !== "string") {
    return "'node_name' should be a string";
  }
  if (typeof node_content !== "string") {
    return "'node_content' should be a string";
  }

  if (!node_links || !Array.isArray(node_links)) {
    return "'node_links' should be an array of scrings";
  }
  if (typeof position_x !== "number") {
    return "'position_x' should be a number";
  }
  if (typeof position_y !== "number") {
    return "'position_y' should be a number";
  }

  if (typeof node_views !== "number") {
    return "'node_views' should be a number";
  }
};

// UPDATE GRAPH
app.post("/api/v1/dialo_graph.update", (req, res) => {
  const { id, title, graph } = req.body;

  if (!id) {
    return res.json({ error: "'id' is missing. Root level" });
  }

  if (typeof id !== "number") {
    return res.json({ error: "'id' should be a number" });
  }

  if (!title) {
    return res.json({ error: "'title' is missing. Root level" });
  }

  if (typeof title !== "string") {
    return res.json({ error: "'title' should be a string" });
  }

  if (!graph) {
    return res.json({ error: "'graph' property is missing. Root level" });
  }

  if (!Array.isArray(graph)) {
    return res.json({ error: "'graph' should be an array. Root level" });
  }
  let indexOfNode = 0;

  for (const graphNode of graph) {
    const validateGraphNodeResult = validateGraphNode(graphNode);
    if (validateGraphNodeResult) {
      return res.json({
        error: "graph node failed. ",
        message: validateGraphNodeResult,
        node: graphNode,
        indexOfNode: indexOfNode,
        body: req.body,
      });
    }
    indexOfNode++;
  }

  console.log("api/v1/dialo_graph.update");
  console.log("Validation passed");

  const graphInList = listOfGraphs.find((graphNode) => {
    return graphNode.id == id;
  });

  if (!graphInList) {
    res.json({ error: "Graph not found" });
    return;
  }

  graphInList.title = title;
  graphInList.graph = graph;

  res.json({ message: "ok" });
});
// Delete GRAPH
app.delete("/api/v1/dialo_graph.delete", (req, res) => {
  const graphId = req.body.id;

  if (!graphId) {
    return res.json({
      message: `Id param misssing. try this: http://localhost:62544/api/v1/dialo_graph.get?graph_id=2`,
      error: true,
    });
  }

  console.log("api/v1/dialo_graph.get");
  console.log(listOfGraphs);
  console.log("graphId", graphId);
  console.log("------------------");
  const indexGraph = listOfGraphs.findIndex((graphNode) => {
    return graphNode.id == graphId;
  });
  if (indexGraph === -1) {
    return res.json({ error: true, message: "Graph not find" });
  }
  listOfGraphs.splice(indexGraph, 1);
  res.json({ message: "ok" });

  // return res.json({
  //   message: "Graph not founded",
  //   error: true,
  // });
});
// Add GRAPH
app.post("/api/v1/dialo_graph.add", (req, res) => {
  const { title, graph, id } = req.body;

  if (!title) {
    return res.json({ error: "'title' is missing. Root level" });
  }

  if (typeof title !== "string") {
    return res.json({ error: "'title' should be a string" });
  }

  if (!graph) {
    return res.json({ error: "'graph' property is missing. Root level" });
  }

  if (!Array.isArray(graph)) {
    return res.json({ error: "'graph' should be an array. Root level" });
  }
  let indexOfNode = 0;

  for (const graphNode of graph) {
    const validateGraphNodeResult = validateGraphNode(graphNode);
    if (validateGraphNodeResult) {
      return res.json({
        error: "graph node failed. ",
        message: validateGraphNodeResult,
        node: graphNode,
        indexOfNode: indexOfNode,
        body: req.body,
      });
    }
    indexOfNode++;
  }

  console.log("api/v1/dialo_graph.add");
  console.log("Validation passed");
  const isAlreadyExist = listOfGraphs.find((graph) => graph.id == id);
  if (isAlreadyExist) {
    return res.json({
      error: "Graph with the same id already exists",
      message: validateGraphNodeResult,
    });
  }

  listOfGraphs.push({
    id,
    title,
    graph,
  });

  res.json({ message: "ok" });
});

/*
Запрос диалогового скрипта для просмотра / редактирования

GET api/v1/dialo_graph.get
{"graph_id": 1}
*/
app.get("/api/v1/dialo_graph.get", (req, res) => {
  const graphId = req.query.graph_id;
  if (!graphId) {
    return res.json({
      message:
        "graph_id param misssing. try this: http://localhost:62544/api/v1/dialo_graph.get?graph_id=2",
      error: true,
    });
  }

  console.log("api/v1/dialo_graph.get");
  console.log(listOfGraphs);
  console.log("graphId", graphId);
  console.log("------------------");
  const graph = listOfGraphs.find((graphNode) => {
    return graphNode.id == graphId;
  });

  if (graph) {
    res.json(graph);
    return;
  }
  return res.json({
    message: "Graph not founded",
    error: true,
  });

  /*res.json({
    id: 1,
    title: "Заголовок диалогового графа",
    graph: [
      {
        node_type: "intent",
        node_name: "greet",
        node_content: "hey\nhey there\nhello\nhi\ngood morning",
        node_links: ["greet"],
        node_views: 0,
        position_x: 100,
        position_y: 100
      },
      {
        node_type: "skill",
        node_name: "greet",
        node_content: "hey\nhey there\nhello\nhi\ngood morning",
        node_links: [],
        node_views: 0,
        position_x: 300,
        position_y: 300
      },
    ],
  });*/
});

/*
Список имеющихся на сервере графов
GET api/v1/dialo_graph.list
Ответ:
*/
app.get("/api/v1/dialo_graph.list", function (req, res) {
  const list = listOfGraphs.map((graph) => {
    return {
      id: graph.id,
      title: graph.title,
    };
  });

  res.json({
    graph_list: list,
  });

  /*res.json({
    graph_list: [
      {
        id: 1,
        title: "Диалоговый скрипт 1",
      },
      {
        id: 2,
        title: "Диалоговый скрипт 2",
      },
    ],
  });*/
});

/*
Данные для чарта
POST /api/v1/chart.get
{
  "start": 1652227681587,
  "end": 1654819640158,
  "chart_name": "bot_1"
}

Ответ:
[
  {
    "position": "2022-5-10",
    "name": "indicator_1",
    "value": 0.109085
  }
]

*/

app.post("/api/v1/chart.get", function (req, res) {
  const { start, end, chart_name } = req.body;
  if (!start) {
    return res.json({ error: "'start' param is required" });
  }

  if (!end) {
    return res.json({ error: "'end' param is required" });
  }

  if (!chart_name) {
    return res.json({ error: "'chart_name' param is required" });
  }

  const indicators = [
    "quality_indicator",
    "indicator_speed",
    "indicator_SUPER",
    "indicator_level",
    "indicator_A",
    "indicator_B",
  ];
  const result = [];
  let currentTime = start;

  while (currentTime <= end) {
    indicators.forEach((indicator) => {
      var currentDate = new Date(currentTime);
      const humanDate =
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1) +
        "-" +
        currentDate.getDate();

      const resultObject = {
        position: humanDate,
        value: Math.random() * 1000,
        name: indicator,
      };
      result.push(resultObject);
    });
    currentTime += 1000 * 60 * 60 * 24;
  }
  res.json(result);
});

const listOfChats = [];
// Отправка сообщения чат-боту
app.post("/api/v1/chat.message", (req, res) => {
  setTimeout(() => {
    const { message } = req.body;

    if (!message) {
      return res.json({ text: "'message' is missing. Root level", message_id: -1 });
    }

    if (typeof message !== "string") {
      return res.json({ text: "'title' should be a string", message_id: -1 });
    }

    let id = 0;
    listOfChats.forEach((messageObj) => {
      if (messageObj.message_id > id) {
        id = messageObj.message_id;
      }
    });
    id++;
    const text = randomSentence({ min: 4, max: 33 });
    const messageObject = {
      text: text,
      message_id: id,
    };

    listOfChats.push(messageObject);

    res.json({
      response: messageObject,
    });
  }, 200);
});

app.use(express.static(path.join(__dirname, "static")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "static", "auth.html"));
});

async function start() {
  app.listen(PORT, () => {
    console.log(`
-------------------------------
Server on: ${PORT}
http://localhost:${PORT}/
http://localhost:${PORT}/auth.html
http://localhost:${PORT}/dashboard.html
figma:
https://www.figma.com/file/e6CPWViwJTFCZxUp18VT1u/AI-constructor?node-id=255%3A270
-------------------------------
`);
  });
}
start();
