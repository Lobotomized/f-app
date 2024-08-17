<script>
  import api from "../../apiCalls";
  let email = "";
  let password = "";
  let broken = false;
  let loading = false;
  function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue) && !broken;
  }

  async function login() {
    try {
      loading = true;
      await api.login({
        email: email,
        password: password
      });
      loading = false;
      window.location.replace("/?#/");
    } catch (err) {
      loading = false;
      broken = true;
    }
  }
</script>

<style>
  .neon-button,
  .neon-button-success {
    font-size: 2em;
    text-align: center;
    margin-top: var(--spacing-huge);
  }

  .flexColumn > * {
    margin-bottom: var(--spacing-medium);
  }
  .flexColumn {
    padding: var(--spacing-large);
  }
  .loadingImage {
    max-width: 50px;
  }
</style>

<div class="flexColumn flexAlignCenter">
  <label
    for="inputPrimary"
    class={validateEmail(email) && !broken ? 'colorSuccess' : 'colorPrimary'}>
    Email
  </label>
  <input
    type="text"
    bind:value={email}
    on:input={() => {
      broken = false;
    }}
    class={validateEmail(email) && !broken ? 'inputSuccess' : 'inputPrimary'} />

  <label
    for="inputPrimary"
    class={password.length > 4 && !broken ? 'colorSuccess' : 'colorPrimary'}>
    Парола
  </label>
  <input
    type="password"
    on:input={() => {
      broken = false;
    }}
    bind:value={password}
    class={password.length > 4 && !broken ? 'inputSuccess' : 'inputPrimary'} />

  {#if broken}
    <span>Тук има някаква грешка...</span>
  {/if}

  <div />
  {#if loading}
    <img style="width:50px" src="/loading.svg" alt="" />
  {/if}
  <button
    on:click={login}
    class={password.length > 4 && validateEmail(email) && !broken ? 'neon-button-success' : 'neon-button'}>
    Заповядай
  </button>
</div>
