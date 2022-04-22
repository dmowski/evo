const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/v1/ping", (req, res) => {
  res.json({ message: "ok" });
});

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
            "node_views": 0
        },
        {
            "node_type": "skill",
            "node_name": "greet",
            "node_content": "hey\nhey there\nhello\nhi\ngood morning",
            "node_links": [],
            "node_views": 0
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

*/

const validateGraphNode = (graphNode) => {
  const { node_type, node_name, node_content, node_links, node_views } =
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
  if (typeof node_views !== "number") {
    return "'node_views' should be a number";
  }
};

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
        "graphId param misssing. try this: http://localhost:62544/api/v1/dialo_graph.get?graph_id=2",
      error: true,
    });
  }

  console.log("api/v1/dialo_graph.get");
  console.log("graphId", graphId);
  console.log("------------------");

  res.json({
    id: 1,
    title: "Заголовок диалогового графа",
    graph: [
      {
        node_type: "intent",
        node_name: "greet",
        node_content: "hey\nhey there\nhello\nhi\ngood morning",
        node_links: ["greet"],
        node_views: 0,
      },
      {
        node_type: "skill",
        node_name: "greet",
        node_content: "hey\nhey there\nhello\nhi\ngood morning",
        node_links: [],
        node_views: 0,
      },
    ],
  });
});
/*




Список имеющихся на сервере графов
GET api/v1/dialo_graph.list
Ответ:

*/
app.get("/api/v1/dialo_graph.list", function (req, res) {
  res.json({
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
  });
});

app.use(express.static(path.join(__dirname, "static")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "static", "components.html"));
});

const PORT = "62544";
async function start() {
  app.listen(PORT, () => {
    console.log(`
-------------------------------
Server on: ${PORT}
http://localhost:${PORT}/
http://localhost:${PORT}/auth.html
figma:
https://www.figma.com/file/e6CPWViwJTFCZxUp18VT1u/AI-constructor?node-id=255%3A270
-------------------------------
`);
  });
}
start();
