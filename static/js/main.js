import { sidebar } from "./sidebar.js";
import { chat } from "./chat.js";
import { charts } from "./charts.js";
import { tasks } from "./tasks.js";

document.addEventListener("DOMContentLoaded", () => {
  sidebar();
  chat();
  charts();
  tasks();
});
