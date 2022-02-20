<script>
  import apiCalls from "../../apiCalls";

  let content = "";
  let loading = false;
  let error = null;
  
  const write = async function() {
    loading = true;
    try {
      await apiCalls.write(content);
      loading = false;
      window.location.replace("/#/fantasies");
    } catch (err) {
      error = err;
      loading = false;
    }
  };
</script>

<style>
  h1 {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: var(--clr-success);
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: var(--spacing-huge);
    margin-right: var(--spacing-huge);
    padding-bottom:10vh;
  }

  .container > * {
    margin-top: var(--spacing-medium);
    margin-bottom: var(--spacing-medium);
  }

  .neon-button-success {
    font-size: 2rem;
  }

  textarea {
    max-width: 80vw;
    min-width:50vw;
    min-height:50vh;
  }
</style>

<div class="container">
  <h1>Сподели фантазия (максимум 800 символа)</h1>
  <textarea
    bind:value={content}
    class="textAreaSuccess"
    rows="10"
    cols="55"
    maxlength="800" />
  {#if loading}
    <img style="width:50px" src="/loading.svg" alt="" />
  {/if}

  {#if error}
    <span>{error.message}</span>
  {/if}
  <span on:click={write} class="neon-button-success">Сподели</span>
</div>
