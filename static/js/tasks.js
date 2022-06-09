export const tasks = () => {
  const chatContainer = document.querySelectorAll(".task-container .chatbox");
  [...chatContainer].forEach((chat) => {
    chat.scrollTop = chat.scrollHeight;
  });
};
