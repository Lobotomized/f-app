<script>
import { onDestroy } from "svelte";

  export let room;
  let selectedChatId = "";
  let user = {};
  import { SelectedChatObserver, UserObserver } from "../../../stores";

  let whoAmI = '';

  const unsubscribeUser = UserObserver.subscribe(innerUser => {
    user = innerUser;
    if(user.responderRooms.indexOf(room._id) != -1){
      whoAmI = "responder";
    }
    else{
      whoAmI = "author";
    }
  })

  const unsubscribeSelectedChat = SelectedChatObserver.subscribe(innerChat => {
    selectedChatId = innerChat;
  });

  onDestroy(() => {
    unsubscribeUser();
    unsubscribeSelectedChat()
  })
</script>

<style>
  .main {
    margin-bottom: var(--spacing-medium);
    cursor: pointer;
    padding: var(--spacing-medium);
    max-height: 8rem;
    align-items: center;
  }
  h5 {
    padding: var(--spacing-tiny);
    margin: 0;
  }

  .avatar {
    max-height: 2rem;
    max-width: 2rem;
    border-radius: var(--spacing-huge);
  }

  .borderSuccess {
    color: var(--clr-success);
  }

  .selected {
    border-color: var(--clr-secondary);
  }
  .innerFlexRow {
    width: 90px;
    justify-content: space-between;
  }
  @media only screen and (max-width: 600px) {
    .avatar {
      margin-right: 500px;
    }
    h5 {
      display: none;
    }
    .main {
      position: relative;
      max-width: 50px;
      border: none;
      max-height: 4rem;
      padding: 9px;
    }
    .borderSuccess:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: 0 0 2em 0.5em var(--clr-success);
      opacity: 0;
      background-color: var(--clr-success);
      z-index: -1;
      transition: opacity 100ms linear;
    }
    .borderSuccess:before {
      pointer-events: none;
      content: "";
      position: absolute;
      background: var(--clr-success);
      top: 50%;
      left: 6px;
      width: 70%;
      height: 100%;

      transform: perspective(1em) rotateX(40deg) scale(0.7, 0.25);
      filter: blur(12px);
      opacity: 0.7;
    }
    .selected:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: 0 0 2em 0.5em var(--clr-secondary);
      opacity: 0;
      background-color: var(--clr-secondary);
      z-index: -1;
      transition: opacity 100ms linear;
    }
    .selected:before {
      pointer-events: none;
      content: "";
      position: absolute;
      background: var(--clr-secondary);
      top: 50%;
      left: 6px;
      width: 70%;
      height: 100%;

      transform: perspective(1em) rotateX(40deg) scale(0.7, 0.25);
      filter: blur(12px);
      opacity: 0.7;
    }
  }
</style>

<div
  class="flexRow main flexJustifySpaceBetween {room.newMessages && selectedChatId !== room._id ? 'borderSuccess' : 'borderPrimary'}
  {selectedChatId === room._id ? 'selected' : ''}">
  <!-- {#if user._id === }
  {/if} -->
  <div class="flexRow innerFlexRow">
    {#if room.author && room.author.avatar && room.author.avatar.imageUrl && room.profileShareByAuthor && whoAmI === 'responder'}
      <img src={room.author.avatar.imageUrl} class="avatar" alt="" />
    {:else if whoAmI ==='responder'}
      <svg
        height="20px"
        width="20px"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        style="enable-background:new 0 0 100 100;"
        xml:space="preserve">
        <path
          d="M97.9,7.87c-0.05-0.77-0.55-1.45-1.27-1.73c-0.72-0.28-1.54-0.13-2.11,0.4c-5.94,5.55-10.79,8.24-14.83,8.24
          c-3.12,0-5.71-1.51-8.69-3.26c-3.47-2.03-7.4-4.33-12.77-4.33c-2.7,0-5.5,0.57-8.53,1.74c-3.02-1.17-5.82-1.74-8.53-1.74
          c-5.38,0-9.31,2.3-12.77,4.33c-2.99,1.75-5.57,3.26-8.69,3.26c-4.09,0-8.8-2.62-14.83-8.24C4.3,6.01,3.49,5.86,2.76,6.14
          C2.04,6.42,1.54,7.09,1.49,7.87C1.42,8.9-0.18,33.31,12.22,46.62c5.13,5.51,11.91,8.31,20.14,8.31c7.61,0,13.51-1.74,17.33-3.34
          c3.82,1.6,9.72,3.34,17.33,3.34c8.23,0,15.01-2.79,20.14-8.31c1.03-1.1,1.93-2.31,2.78-3.55v52.3h8.05V12.69
          C98.03,9.94,97.92,8.13,97.9,7.87z
          M41.57,33.12c-0.74,4.14-6.71,6.54-13.34,5.35c-6.63-1.18-11.4-5.5-10.66-9.64
          c0.74-4.15,6.71-6.54,13.34-5.36C37.53,24.66,42.31,28.97,41.57,33.12z
          M71.16,38.48c-6.63,1.18-12.6-1.21-13.34-5.35
          c-0.74-4.15,4.03-8.46,10.66-9.65c6.63-1.18,12.6,1.21,13.34,5.36C82.55,32.97,77.78,37.29,71.16,38.48z" />
      </svg>
    {/if}

    {#if room.responder && room.responder.avatar && room.responder.avatar.imageUrl && room.profileShareByResponder && whoAmI === 'author'}
      <img src={room.responder.avatar.imageUrl} class="avatar" alt="" />
    {:else if whoAmI ==='author'}
      <div class="avatar">
        <svg
          height="20px"
          width="20px"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          style="enable-background:new 0 0 100 100;"
          xml:space="preserve">
          <path
            d="M97.9,7.87c-0.05-0.77-0.55-1.45-1.27-1.73c-0.72-0.28-1.54-0.13-2.11,0.4c-5.94,5.55-10.79,8.24-14.83,8.24
            c-3.12,0-5.71-1.51-8.69-3.26c-3.47-2.03-7.4-4.33-12.77-4.33c-2.7,0-5.5,0.57-8.53,1.74c-3.02-1.17-5.82-1.74-8.53-1.74
            c-5.38,0-9.31,2.3-12.77,4.33c-2.99,1.75-5.57,3.26-8.69,3.26c-4.09,0-8.8-2.62-14.83-8.24C4.3,6.01,3.49,5.86,2.76,6.14
            C2.04,6.42,1.54,7.09,1.49,7.87C1.42,8.9-0.18,33.31,12.22,46.62c5.13,5.51,11.91,8.31,20.14,8.31c7.61,0,13.51-1.74,17.33-3.34
            c3.82,1.6,9.72,3.34,17.33,3.34c8.23,0,15.01-2.79,20.14-8.31c1.03-1.1,1.93-2.31,2.78-3.55v52.3h8.05V12.69
            C98.03,9.94,97.92,8.13,97.9,7.87z
            M41.57,33.12c-0.74,4.14-6.71,6.54-13.34,5.35c-6.63-1.18-11.4-5.5-10.66-9.64
            c0.74-4.15,6.71-6.54,13.34-5.36C37.53,24.66,42.31,28.97,41.57,33.12z
            M71.16,38.48c-6.63,1.18-12.6-1.21-13.34-5.35
            c-0.74-4.15,4.03-8.46,10.66-9.65c6.63-1.18,12.6,1.21,13.34,5.36C82.55,32.97,77.78,37.29,71.16,38.48z" />
        </svg>
      </div>
    {/if}
  </div>

  <h5>{room.name}</h5>

  <!-- {JSON.stringify(room)} -->
</div>
