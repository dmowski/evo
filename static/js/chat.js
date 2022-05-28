(() => {
  const chatUrl = "/api/v1/chat.message";

  /*
  return object: {
      message_id: 1,
      text: "Or nu ole."
  }
  */
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
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("chat-message");
    const textNode = document.createElement("p");
    textNode.classList.add("chat-bubble");
    textNode.classList.toggle("chat-bubble--left", isLeft);
    textNode.classList.toggle("chat-bubble--right", !isLeft);
    textNode.innerText = message;

    messageContainer.appendChild(textNode);
    return messageContainer;
  };

  const chatComponent = async (container) => {
    const chatNode = container.querySelector(".messenger__chat");
    const inputNode = container.querySelector(".messenger__input");
    const submitNode = container.querySelector(".messenger__submit");

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

    submitNode.addEventListener("click", async () => {
      sendMessage(inputNode.value);
      inputNode.value = "";
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    const listOfMessengers = document.body.querySelectorAll(".messenger");
    [...listOfMessengers].forEach((messengersContainer) => {
      chatComponent(messengersContainer);
    });
  });
})();
