<script>
  import Message from "./message/Message.svelte";
  import ChatRoom from "./chatRoom/ChatRoom.svelte";
  import socket from "../../socket";
  import { onMount } from "svelte";
  import api from "../../apiCalls";
  import { UserObserver } from "../../stores";
  import { SelectedChatObserver } from "../../stores";
  import { NewMessagesCount } from "../../stores";

  let phoneChatsOpen = false;
  let messageText = "";
  let chatRooms = [];
  let chatMessages = [];
  let chatId = "";
  let newMsgCount = 0;

  let user = {};
  let currMessageCount = 50;

  UserObserver.subscribe(innerUser => {
    user = innerUser;
  });

  NewMessagesCount.subscribe(innerMsgCount => {
    newMsgCount = innerMsgCount;
  });

  SelectedChatObserver.subscribe(innerChat => {
    chatId = innerChat;
  });

  const loadMoreMessages = async function() {
    currMessageCount += 50;
    chatMessages = await api.getMessages(50);
    chatMessages = chatMessages.reverse();
  };

  const msg = function() {
    socket.emit("message", { message: messageText, roomId: chatId });
    if (messageText != "") {
      chatMessages = [
        ...chatMessages,
        { content: messageText, author: user._id }
      ];
    }
    messageText = "";
  };
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("message", async receivable => {
    if (receivable.roomId != chatId) {
      chatRooms = chatRooms.map(chatRoom => {
        if (chatRoom._id === receivable.roomId) {
          NewMessagesCount.set(newMsgCount + 1);
          return {
            ...chatRoom,
            newMessages: true
          };
        } else {
          return chatRoom;
        }
      });
    }
    if (receivable.message != "") {
      chatMessages = [
        ...chatMessages,
        {
          content: receivable.message,
          author: receivable.author
        }
      ];
    }
  });

  const changeRoom = async function(roomId) {
    SelectedChatObserver.set(roomId);
    let messages = await api.getMessages(5);
    messages = messages.reverse();
    chatMessages = [...messages];
    chatRooms = chatRooms.map(chatRoom => {
      if (chatRoom._id === roomId) {
        if (user.responderRooms.indexOf(roomId)) {
          if (chatRoom.newMessages) {
            NewMessagesCount.set(newMsgCount - 1);
          }
          return { ...chatRoom, newMessages: false };
        } else if (user.authorRooms.indexOf(roomId) > -1) {
          if (chatRoom.newMessages) {
            NewMessagesCount.set(newMsgCount - 1);
          }
          return { ...chatRoom, newMessages: false };
        } else {
          return chatRoom;
        }
      } else {
        return chatRoom;
      }
    });
  };

  const leaveRoom = async function() {
    try {
      await api.leaveRoom(chatId);
      window.location.replace('/#/fantasies')
    } catch (err) {
      console.log(err);
    };
  };

  onMount(async () => {
    chatRooms = await api.getRooms();

    chatRooms = chatRooms.map(mappedRoom => {
      if (
        !mappedRoom.seenByAuthor &&
        user.authorRooms.indexOf(mappedRoom._id) != -1
      ) {
        const newRoom = { ...mappedRoom, newMessages: true };
        return newRoom;
      } else if (
        !mappedRoom.seenByResponder &&
        user.responderRooms.indexOf(mappedRoom._id) != -1
      ) {
        const newRoom = { ...mappedRoom, newMessages: true };
        return newRoom;
      } else {
        return mappedRoom;
      }
    });

    chatMessages = await api.getMessages(5);
    chatMessages = chatMessages.reverse();
  });
</script>

<style>
  .write {
    background: var(--clr-primary-background);
    box-shadow: 0px 0px 20px 7px var(--clr-primary-background);
    max-height: 8rem;
  }

  .chatWithText {
    position: sticky;
    top: var(--spacing-medium);
    background: var(--clr-primary-background);
    box-shadow: 0px 0px 20px 7px var(--clr-primary-background);
    z-index: -1;
    font-size: 2rem;
  }
  .writingPlace {
    min-width: 50vw;
  }

  .writingPlace:focus {
    box-shadow: inset 0 0 0.5em 0 var(--clr-secondary),
      0 0 0.5em 0 var(--clr-secondary);
    position: relative;
  }
  .messages {
    margin-bottom: calc(var(--spacing-huge) * 5);
    z-index: -2;
  }
  .fixed {
    position: fixed;
    bottom: 13vh;
    left: calc(50%);
    transform: translateX(-50%);
    z-index: 1;
  }
  textarea {
    margin-right: var(--spacing-huge);
  }

  .firstColumn {
    /* max-width:calc(100% - var(--spacing-huge)*5); */
    /* max-width:100%; */
    flex-grow: 2;
    margin-right: calc(var(--spacing-huge) * 5);
  }

  .loadMore {
    flex-grow: 5;
  }
  .chatsColumnScreen {
    position: fixed;
    width: calc(var(--spacing-huge) * 5);
    right: 0;
    top: 0;
    height: calc(100vh - 5rem);
    overflow: scroll;
    overflow-x: hidden;
    z-index: 0;
    padding: var(--spacing-small);
  }

  .chatsColumnScreen::-webkit-scrollbar-thumb {
    background-color: var(--clr-white);
    outline: none;
  }

  .rowColumn {
    flex-direction: row;
    display: flex;
  }

  .chat {
    padding-left: calc(var(--spacing-huge) * 2);
  }

  .leaveRoom {
    margin-right: var(--spacing-small);
    width: fit-content;
  }
  @media only screen and (max-width: 600px) {
    .chat {
      padding-left: 0;
      padding: var(--spacing-huge);
    }
    .chatsColumnScreen {
      left: 0;
      top: 0;
      max-width: fit-content;
    }
    .chatsColumnScreen::-webkit-scrollbar-thumb {
      background-color: var(--clr-primary-background);
      outline: none;
    }
    .fixed {
      left: calc(50% + 2rem);
    }
    .firstColumn {
      margin-right: 0;
    }
    .rowColumn {
      flex-direction: column;
      align-content: center;
    }
    textarea {
      margin-right: 0px;
      margin-bottom: var(--spacing-small);
    }
    .messages {
      margin-bottom: calc(var(--spacing-huge) * 4);
      line-height: 1.5rem;
      margin-left: 2rem;
      background: var(--clr-primary-background);
    }
    .chatWithText {
      text-align: center;
    }

    /* .chatsColumnScreen {
      display: none;
    } */
  }
</style>

<div class="chat flexRow flexJustifySpaceBetween">
  <div class="flexColumn firstColumn">
    <h1 class="chatWithText">
      Чат със
      <span class="colorSecondary">Анонимен</span>
    </h1>

    <div class="flexRow">

      <button on:click={leaveRoom} class="buttonPrimary leaveRoom">
        Излез от стая
      </button>

      <button on:click={loadMoreMessages} class="buttonSecondary loadMore">
        Зареди още
      </button>

    </div>

    <div class="messages">

      {#each chatMessages as message}
        {#if message.author === user._id}
          <Message {message} me={true} />
        {:else}
          <Message {message} me={false} />
        {/if}
      {/each}

    </div>

    <div class="write rowColumn flexJustifyCenter fixed">
      <textarea
        bind:value={messageText}
        class="textAreaSecondary writingPlace"
        name=""
        id=""
        cols="30"
        rows="5" />

      <button on:click={msg} class="buttonSuccess">Изпрати</button>
    </div>
  </div>
  <div class="flexColumn chatsColumnScreen">
    {#each chatRooms as room}
      <div
        on:click={() => {
          changeRoom(room._id);
        }}>
        <ChatRoom {room} />

      </div>
    {/each}

  </div>
</div>
