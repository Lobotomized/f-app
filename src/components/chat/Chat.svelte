<script>
  import Message from "./message/Message.svelte";
  import ChatRoom from "./chatRoom/ChatRoom.svelte";
  let phoneChatsOpen = false;
</script>

<style>
  .write {
    background: var(--clr-primary-background);
    box-shadow: 0px 0px 20px 7px var(--clr-primary-background);
    max-height: 8rem;
  }

  p {
    padding: var(--spacing-medium);
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
    margin-bottom: calc(var(--spacing-huge) * 3);
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
  @media only screen and (max-width: 600px) {
    .chat{
      padding-left:0;
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
    <div class="messages">
      <Message me={true} />
      <Message />

      <Message me={true} />
      <Message />

    </div>

    <div class="write rowColumn flexJustifyCenter fixed">
      <textarea
        class="textAreaSecondary writingPlace"
        name=""
        id=""
        cols="30"
        rows="5" />

      <button class="buttonSuccess">Изпрати</button>
    </div>
  </div>
  <div class="flexColumn chatsColumnScreen">
    <ChatRoom room={{ name: 'Georgi Atanasov' }} />
    <ChatRoom room={{ name: 'Georgi Atanasov' }} />
    <ChatRoom room={{ name: 'Georgi Atanasov' }} />
    <ChatRoom room={{ name: 'Georgi Atanasov' }} />
    <ChatRoom room={{ name: 'Georgi Atanasov' }} />
    <ChatRoom room={{ name: 'Georgi Atanasov' }} />
    <ChatRoom room={{ name: 'Georgi Atanasov' }} />
    <ChatRoom room={{ name: 'Georgi Atanasov' }} />

  </div>
</div>
