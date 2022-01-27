<script>
  import { onMount } from "svelte";
  import { SelectedChatObserver } from "../../stores";

  import api from "../../apiCalls";

  let fantasies = [];
  let skip = 0;

  onMount(async () => {
    try {
      fantasies = await api.getFantasies(skip);
    } catch (err) {}
  });

  const startChat = async function(fantasy) {
    await api.createRoomFromPostId(fantasy._id);
    const chatRoom = await api.getRoomByPostAndUser(fantasy._id);
    SelectedChatObserver.set(chatRoom._id);
    window.location.replace("/#/chats");
  };

  const loadMore = async function() {
    let newFantasies = await api.getFantasies(skip);
    skip += 5;
    fantasies = [...fantasies, ...newFantasies];
  };
</script>

<style>
  .flexColumn {
    padding: 0 var(--spacing-huge);
  }
  .flexColumn > * {
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  button {
    margin-top: var(--spacing-huge);
  }
  .neon-button {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 7rem;
  }
  p {
    text-align: center;
    width: 50%;
  }
  .chatWithText {
    top: var(--spacing-medium);
    background: var(--clr-primary-background);
    box-shadow: 0px 0px 20px 7px var(--clr-primary-background);
    font-size: 2rem;
  }

  @media only screen and (max-width: 600px) {
    .flexColumn > * {
      margin-left: 0;
      margin-right: 0;
      max-width: 100%;
    }

    .singleFantasy {
      width: 100%;
    }
  }
</style>

<div class="flexColumn">
  <h1 class="chatWithText">
    Анонимни
    <span class="colorSecondary">фантазии</span>
  </h1>
  {#each fantasies as fantasy}
    <p class="singleFantasy">
      {fantasy.content}
      <br />
      <button
        on:click={() => {
          startChat(fantasy);
        }}
        class="buttonSecondary">
        Започни чат
      </button>
    </p>
  {/each}
  {#if fantasies.length > 0 && fantasies.length % 5 === 0}
    <span on:click={loadMore} class="neon-button">Зареди още</span>
  {:else if fantasies.length === 0}
    <h3 style="text-align:left;">Започнал сте разговор за всяка анонимна фантазия. Изчакайте или споделете своя.</h3>
  {/if}
</div>
