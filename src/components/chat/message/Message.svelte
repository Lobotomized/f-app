<script>
  export let me;
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
</style>

<div>
  {#if me}
    <p class="message flexColumn flexJustifySpaceBetween">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio minus
      delectus sit voluptatibus necessitatibus voluptatem accusamus, nesciunt
      ipsum suscipit dolore fugiat odit quo cumque doloremque a libero labore
      commodi modi.
      <span class="flexRow flexJustifySpaceBetween">
        <span class="colorSecondary">Date: 00:00</span>
        <span class="flexAlignSelfEnd colorSuccess">Author : bla bla</span>
      </span>

    </p>
  {:else}
    <p class="messageYou colorSecondary flexColumn flexJustifySpaceBetween">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio minus
      delectus sit voluptatibus necessitatibus voluptatem accusamus, nesciunt
      ipsum suscipit dolore fugiat odit quo cumque doloremque a libero labore
      commodi modi.
      <span class="flexRow flexJustifySpaceBetween">
        <span class="colorPrimary">Date: 00:00</span>
        <span class="flexAlignSelfEnd colorSuccess">Author : bla bla</span>
      </span>

    </p>
  {/if}
</div>
