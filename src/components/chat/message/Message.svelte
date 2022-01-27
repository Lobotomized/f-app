<script>
  export let me;
  export let message;
</script>

<style>
  span {
    margin-top: var(--spacing-medium);
  }
  .message {
    max-width: calc(var(--spacing-huge) * 8);
    margin-right: auto;
    line-height: 1.5rem;
  }

  .messageYou {
    max-width: calc(var(--spacing-huge) * 8);
    margin-left: auto;
    line-height: 1.5rem;
  }

  img{
    max-width:100%;
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
            <span class="colorSecondary">
              {new Date(Date.parse(message.postedOn)).toLocaleTimeString('en-US')}
            </span>
          {:else}
            <span class="colorSecondary">Сега</span>
          {/if}
          <span class="flexAlignSelfEnd colorSuccess">Author : Anonymous</span>
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
          <span class="colorPrimary">
            {new Date(Date.parse(message.postedOn)).toLocaleTimeString('en-US')}
          </span>
        {:else}
          <span class="colorPrimary">Сега</span>
        {/if}
        <span class="flexAlignSelfEnd colorSuccess">Author : Anonymous</span>
      </span>
    </p>
  {/if}
</div>
