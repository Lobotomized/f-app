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
      max-width: 50px;
      border: none;
      max-height: 4rem;
      padding: 9px;
    }
    .borderSuccess {
      background: var(--clr-success);
    }
    .selected {
      background: var(--clr-secondary);
    }
  }
</style>

<div
  class="flexRow main flexJustifySpaceBetween {room.newMessages ? 'borderSuccess' : 'borderPrimary'}
  {selectedChatId === room._id ? 'selected' : ''}">
  <img src="https://via.placeholder.com/300" class="avatar" alt="" />
  <h5>{room.name}</h5>

  <!-- {JSON.stringify(room)} -->
</div>
