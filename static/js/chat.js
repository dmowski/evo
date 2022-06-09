import { emojiList } from "./emojiList.js";
import { replaceSelectedText } from "./inputTools.js";

export const chat = () => {
  const chatUrl = "/api/v1/chat.message";

  const chatRequest = async (message) => {
    const requestData = {
      message,
    };
    const response = await fetch(chatUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    const responseData = await response.json();
    return responseData.response;
  };

  const generateMessageNode = (message, isLeft) => {
    const chatItem = document.createElement("div");

    chatItem.classList.add("chat-item");

    const nameContainer = document.createElement("div");
    nameContainer.classList.add("name");
    const name = document.createElement("span");
    name.innerText = "Система";
    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-caret-up");

    nameContainer.appendChild(name);
    nameContainer.appendChild(icon);

    const messagesContainer = document.createElement("div");
    messagesContainer.classList.add("messages");

    name.innerText = isLeft ? "Bot" : "User";
    if (!isLeft) {
      chatItem.classList.add("chat-item__owner");
    }
    const messageNode = document.createElement("p");
    messageNode.classList.add("message");
    messageNode.innerText = message;
    messagesContainer.appendChild(messageNode);

    chatItem.appendChild(nameContainer);
    chatItem.appendChild(messagesContainer);

    return chatItem;
  };

  const generateEmojiList = () => {
    const container = document.createElement("div");
    debugger;
    emojiList.forEach((emoji) => {
      const textNode = document.createElement("p");
      textNode.classList.add("emoji-value");
      textNode.innerHTML = emoji;
      container.appendChild(textNode);
    });

    return container;
  };

  const chatComponent = async (container) => {
    const chatNode = container.querySelector(".messenger__chat");
    const inputNode = container.querySelector(".messenger__input");
    const submitNode = container.querySelector(".messenger__submit");
    const emojiContainer = container.querySelector(".emoji-control");

    const emoji = container.querySelector(".emoji-control__list");
    const emojiToggler = container.querySelector(".emoji-toggler");

    emojiToggler.addEventListener("click", () => {
      emoji.classList.toggle("hidden");
    });

    const emojiListNode = container.querySelector(".messenger__emoji-list");
    const emojiListComponents = generateEmojiList();
    emojiListNode.appendChild(emojiListComponents);
    let isClearChat = false;
    const message = container.querySelector(".chat-bubble");
    if (message === null) {
      isClearChat = true;
    }

    /*{
          text: 'chat message',
          isLeft: true,
        }*/
    const state = [];

    const render = () => {
      chatNode.innerHTML = "";
      state.forEach((chatObject) => {
        const messageNode = generateMessageNode(chatObject.text, chatObject.isLeft);
        chatNode.appendChild(messageNode);
      });
      chatNode.scrollTop = chatNode.scrollHeight;
    };

    const pushChatState = (messageObject) => {
      state.push(messageObject);
      render();
    };

    const sendMessage = async (message) => {
      pushChatState({
        text: message,
        isLeft: false,
      });
      const requestResult = await chatRequest(message);
      pushChatState({
        text: requestResult.text,
        isLeft: true,
      });
    };
    const send = async () => {
      const message = inputNode.value.trim();
      if (message === "") {
        return;
      }
      sendMessage(message);
      inputNode.value = "";
      inputNode.focus();
    };
    submitNode.addEventListener("click", send);
    inputNode.onkeyup = (e) => {
      if (!e.shiftKey && e.keyCode === 13) {
        send();
        e.preventDefault();
      }
    };

    emojiListNode.addEventListener("mousedown", async (event) => {
      const emojiNode = event.target.closest(".emoji-value");
      if (!emojiNode) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const emojiValue = emojiNode.innerHTML;
      replaceSelectedText(inputNode, emojiValue);
    });
    if (isClearChat) {
      const chatItem = document.createElement("div");
      chatItem.classList.add("chat-item");

      const nameContainer = document.createElement("div");
      nameContainer.classList.add("name");
      const name = document.createElement("span");
      name.innerText = "Система";
      const icon = document.createElement("i");
      icon.classList.add("fa-solid");
      icon.classList.add("fa-caret-up");

      nameContainer.appendChild(name);
      nameContainer.appendChild(icon);

      const messagesContainer = document.createElement("div");
      messagesContainer.classList.add("messages");

      const message = document.createElement("p");
      message.classList.add("message");
      message.innerText = "Отправьте сообщение чтобы начать диалог";

      messagesContainer.appendChild(message);

      chatItem.appendChild(nameContainer);
      chatItem.appendChild(messagesContainer);

      chatNode.appendChild(chatItem);
    }
  };

  const listOfMessengers = document.body.querySelectorAll(".messenger");
  [...listOfMessengers].forEach((messengersContainer) => {
    chatComponent(messengersContainer);
  });
};
