<script>
  export let room;
  let selectedChatId = "";
  import { SelectedChatObserver } from "../../../stores";

  SelectedChatObserver.subscribe(innerChat => {
    selectedChatId = innerChat;
  });
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
    color: var(--clr-success) !important;
  }

  .selected {
    border-color: var(--clr-secondary);
  }
  @media only screen and (max-width: 600px) {
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
    .borderSuccess {
      background: var(--clr-success);
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

        transform: perspective(1em) rotateX(40deg) scale(.7, 0.25);
      filter: blur(12px);
        opacity: 0.7;
    }
  }
</style>

<div
  class="flexRow main flexJustifySpaceBetween {room.newMessages && selectedChatId !== room._id ? 'borderSuccess' : 'borderPrimary'}
  {selectedChatId === room._id ? 'selected' : ''}">
  <img src="https://via.placeholder.com/300" class="avatar" alt="" />
  <h5>{room.name}</h5>

  <!-- {JSON.stringify(room)} -->
</div>
