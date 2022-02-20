<script>
  import Message from "./message/Message.svelte";
  import ChatRoom from "./chatRoom/ChatRoom.svelte";
  import socket from "../../socket";
  import { onDestroy, onMount } from "svelte";
  import api from "../../apiCalls";
  import { UserObserver } from "../../stores";
  import { SelectedChatObserver } from "../../stores";
  import { NewMessagesCount } from "../../stores";

  let photoMenuOpen = false;
  let messageText = "";
  let chatRooms = [];
  let chatMessages = [];
  let chatId = "";
  let newMsgCount = 0;

  let user = {};
  let currMessageCount = 5;
  let photos = [];
  let currentRoom = {};
  let otherGuy = {};

  const unsubscribeUser = UserObserver.subscribe(innerUser => {
    user = innerUser;
  });

  const unsubscribeMessages = NewMessagesCount.subscribe(innerMsgCount => {
    newMsgCount = innerMsgCount;
  });

  SelectedChatObserver.subscribe(innerChat => {
    chatId = innerChat;
  });

  onDestroy(() => {
    unsubscribeMessages();
    unsubscribeUser();
  });

  const shareProfile = async function() {
    const innerRoom = await api.setProfileShareToTrue(chatId);
    console.log('vliza tuka ', innerRoom)
    currentRoom.profileShareByAuthor = innerRoom.room.profileShareByAuthor;
    currentRoom.profileShareByResponder = innerRoom.room.profileShareByResponder;
  };

  const selectPhoto = async function(photo) {
    socket.emit("message", {
      message: "photo",
      roomId: chatId,
      photo: photo._id,
      photoUrl: photo.imageUrl
    });
    chatMessages = [
      ...chatMessages,
      {
        content: "photo",
        author: user._id,
        photo: photo._id,
        photoUrl: photo.imageUrl
      }
    ];
    photoMenuOpen = false;
  };

  const loadMoreMessages = async function() {
    currMessageCount += 50;
    chatMessages = await api.getMessages(currMessageCount);
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
    setTimeout(() => {
      window.scrollTo({ top: 999999999999999999999999, behavior: "smooth" });
    }, 1);
  };

  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("message", async receivable => {
    if (receivable.roomId != chatId) {
      // NewMessagesCount.set(0);

      const existingRoom = chatRooms.find(roo => {
        return roo._id === receivable.roomId;
      });

      if (!existingRoom) {
        chatRooms = await api.getRooms();
      }
      chatRooms = chatRooms.map(chatRoom => {
        if (chatRoom._id === receivable.roomId) {
          if (!chatRoom.newMessages) {
            NewMessagesCount.set(newMsgCount + 1);
          }
          return {
            ...chatRoom,
            newMessages: true
          };
        } else {
          return chatRoom;
        }
      });
    } else if (window.location.hash != "#/chats") {
      // NewMessagesCount.set(0);
      chatRooms = chatRooms.map(chatRoom => {
        if (chatRoom._id === receivable.roomId) {
          if (!chatRoom.newMessages) {
            NewMessagesCount.set(newMsgCount + 1);
          }
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
          author: receivable.author,
          photo: receivable.photo,
          photoUrl: receivable.imageUrl
        }
      ];
    }
  });

  const changeRoom = async function(roomId) {
    await api.getMe();
    try {
      otherGuy = await api.getRoomSecretInfo(roomId);
    } catch (err) {}
    currentRoom = chatRooms.find(roo => {
      return roo._id === roomId;
    });
    SelectedChatObserver.set(roomId);
    let messages = await api.getMessages(5);
    currMessageCount = 5;
    messages = messages.reverse();
    chatMessages = [...messages];
    chatRooms = chatRooms.map(chatRoom => {
      if (chatRoom._id === roomId) {
        if (user.responderRooms.indexOf(roomId) > -1) {
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

    setTimeout(() => {
      window.scrollTo({ top: 999999999999999999999999, behavior: "smooth" });
    }, 1);
  };

  const leaveRoom = async function() {
    try {
      await api.leaveRoom(chatId);
      window.location.replace("/#/fantasies");
    } catch (err) {
      console.log(err);
    }
  };

  const keydown = async function(e) {
    if (e.code === "Enter") {
      msg();
    }
  };

  const openPhotoSearch = async function() {
    const getThePhotos = await api.getUserPhotos(0);
    photos = [...getThePhotos.photos];
    photoMenuOpen = true;
  };

  onMount(async () => {
    await api.getMe();

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
    if (chatId != "") {
      chatMessages = await api.getMessages(0);
      chatMessages = chatMessages.reverse();
    }
  });

  onDestroy(() => {
    SelectedChatObserver.set("");
  });
</script>

<style>
  .write {
    background: var(--clr-primary-background);
    box-shadow: 0px 0px 20px 7px var(--clr-primary-background);
    max-height: 15vh;
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
    min-width: 30vw;
  }

  .writingPlace:focus {
    box-shadow: inset 0 0 0.5em 0 var(--clr-secondary),
      0 0 0.5em 0 var(--clr-secondary);
    position: relative;
  }
  .messages {
    margin-bottom: calc(var(--spacing-huge) * 5);
  }
  .fixed {
    position: fixed;
    bottom: 15vh;
    left: calc(50%);
    transform: translateX(-50%);
    z-index: 1;
  }
  textarea {
    margin-right: var(--spacing-huge);
    min-height: 100px;
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
  .buttonSuccess {
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
  }

  .photoSearch {
    height: 60%;
    width: 60%;
    left: 20%;
    top: 20%;
    background: #0c030399;
    z-index: 999999999;
    position: fixed;
    overflow: scroll;
  }

  .photoInList {
    max-height: 80%;
    margin: var(--spacing-medium);
    max-width: 20%;
    cursor: pointer;
  }
  .noPhotos {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .buttonRow {
    justify-content: space-around !important;
  }

  .fantasiesLink {
    color: var(--clr-primary);
  }

  h3 {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .buttonSecondary {
    font-size: 0.8rem;
  }
  @media only screen and (max-width: 600px) {
    .photoSearch {
      height: 100vh;
      width: 100vw;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .buttonSuccess {
      font-size: 0.6rem;
      padding: var(--spacing-small) !important;
    }
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
    /* .rowColumn {
      flex-direction: column;
      align-content: center;
    } */
    textarea {
      margin-right: var(--spacing-huge);
      margin-right: 0px;
      margin-bottom: var(--spacing-small);
      padding: var(--spacing-small) !important;
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

    .write {
      margin-bottom: 100px;
    }

    /* .chatsColumnScreen {
      display: none;
    } */
  }
</style>

<div
  class="chat flexRow flexJustifySpaceBetween"
  on:click={() => {
    if (photoMenuOpen) {
      photoMenuOpen = false;
    }
  }}>

  {#if chatId != ''}
    <div class="flexColumn firstColumn">
      <h1 class="chatWithText">
        Чат с
        {#if otherGuy.username}
          <span class="colorSecondary">{otherGuy.username}</span>
        {:else}
          <span class="colorSecondary">Анонимен</span>
        {/if}
      </h1>

      {#if photoMenuOpen}
        <div class="photoSearch">
          {#if photos.length}
            {#each photos as photo}
              <img
                src={photo.imageUrl}
                on:click={() => {
                  selectPhoto(photo);
                }}
                class="photoInList"
                alt="" />
            {/each}
          {:else}
            <h1 class="noPhotos">
              Нямате качени снимки. Качете от профила си.
            </h1>
          {/if}

        </div>
      {/if}
      <div class="messages">

        <div class="flexRow">

          <button on:click={leaveRoom} class="buttonPrimary leaveRoom">
            Излез от стая
          </button>

          <button on:click={loadMoreMessages} class="buttonSecondary loadMore">
            Зареди още
          </button>

        </div>
        {#each chatMessages as message}
          {#if message.author === user._id}
            <Message {otherGuy} {message} me={true} />
          {:else}
            <Message {otherGuy} {message} me={false} />
          {/if}
        {/each}

      </div>

      <div class="write rowColumn flexJustifyCenter fixed">
        <textarea
          on:keydown={keydown}
          bind:value={messageText}
          class="textAreaSecondary writingPlace"
          name=""
          id="" />
        <div class="flexRow buttonRow">
          {#if currentRoom.profileShareByResponder && currentRoom.profileShareByAuthor}
            <button on:click={openPhotoSearch} class="buttonSuccess">
              Сподели снимка
            </button>
          {:else if (!currentRoom.profileShareByAuthor && !currentRoom.profileShareByResponder) || (!currentRoom.profileShareByResponder && user.responderRooms.indexOf(chatId) > -1) || (!currentRoom.profileShareByAuthor && user.authorRooms.indexOf(chatId) > -1)}
            <button on:click={shareProfile} class="buttonSuccess">
              Сподели профил
            </button>
          {:else}
            <button class="buttonSecondary">Събеседникът не е разрешил</button>
          {/if}

          <button on:click={msg} class="buttonSuccess">Изпрати</button>
        </div>

      </div>
    </div>
  {/if}
  {#if chatRooms.length === 0}
    <h3>
      Нямате активни чатове. Започнете такъв от
      <a class="fantasiesLink" href="#/fantasies">Анонимни фантазии</a>
    </h3>
  {/if}
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
