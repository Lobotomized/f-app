<script>
  export let me;
  export let message;
  export let otherGuy
</script>

<style>
  span {
    margin-top: var(--spacing-medium);
  }
  .message {
    max-width: calc(var(--spacing-huge) * 8);
    margin-right: auto;
    line-height: 1.5rem;

    margin: 20px 0px;
  }

  .messageYou {
    max-width: calc(var(--spacing-huge) * 8);
    margin-left: auto;
    line-height: 1.5rem;
  }

  img {
    max-width: 100%;
    border-radius: var(--spacing-small);
  }

  .colorPrimary.muted,
  .colorSecondary.muted {
    opacity: 0.6;
  }
  .nowText{
    font-size: 0.7rem;
  }
  @media only screen and (max-width: 600px) {
    .message, .messageYou{
      padding:var(--spacing-small);
    }
  }
</style>

<div>
  {#if me}
    {#if message.photoUrl}
      <div class="message">
        <img src={message.photoUrl} alt="" />
      </div>
    {:else}
      <p class="message flexColumn flexJustifySpaceBetween">
        {message.content}
        <span class="flexRow flexJustifySpaceBetween">
          {#if message.postedOn}
            <span class="colorSecondary muted nowText">
              {new Date(Date.parse(message.postedOn)).toLocaleTimeString('en-US')}
            </span>
          {:else}
            <span class="colorSecondary muted nowText">Сега</span>
          {/if}
          <span class="flexAlignSelfEnd colorSuccess nowText">От мен</span>
        </span>

      </p>
    {/if}
  {:else if message.photoUrl}
    <div class="messageYou">
      <img src={message.photoUrl} alt="" />
    </div>
  {:else}
    <p class="messageYou colorSecondary flexColumn flexJustifySpaceBetween">
      {message.content}
      <span class="flexRow flexJustifySpaceBetween">
        {#if message.postedOn}
          <span class="colorPrimary muted nowText">
            {new Date(Date.parse(message.postedOn)).toLocaleTimeString('en-US')}
          </span>
        {:else}
          <span class="colorPrimary muted nowText">Сега</span>
        {/if}
        <span class="flexAlignSelfEnd colorSuccess nowText">От {otherGuy.username}</span>
      </span>
    </p>
  {/if}
</div>
