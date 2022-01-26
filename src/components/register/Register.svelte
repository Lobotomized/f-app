<script>
  import api from "../../apiCalls";

  import Switch from "../general/Switch.svelte";
  let acceptTerms = false;
  let email = "";
  let psevdonim = "";
  let password = "";
  let passwordSecond = "";
  let error = null;
  let loading = false;

  function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }

  function cleanError() {
    if (error) {
      error = null;
    }
  }

  const register = function() {
    if (
      password.length > 4 &&
      acceptTerms &&
      password === passwordSecond &&
      psevdonim.length > 4 &&
      validateEmail(email)
    ) {
      loading = true;
      api
        .register({ email: email, username: psevdonim, password: password })
        .then(res => {
          loading = false;
          window.location.replace("/#/login");
        })
        .catch(err => {
          loading = false;
          error = err;
          console.dir(err, "  err");
        });
    }
  };
</script>

<style>
  /* Small screens */
  @media only screen and (max-width: 600px) {
    .containElement {
      padding-bottom: calc(var(--spacing-huge) * 2) !important;
    }
  }
  .neon-button,
  .neon-button-success {
    font-size: 2em;
    text-align: center;
  }

  .guarantee {
    text-align: center;
    margin-bottom: var(--spacing-huge) !important;
  }
  .flexColumn > * {
    margin-bottom: var(--spacing-medium);
  }
  .flexColumn {
    padding: var(--spacing-large);
  }
</style>

<div class="containElement flexColumn flexAlignCenter">
  <label
    for="inputPrimary"
    class={validateEmail(email) && !error ? 'colorSuccess' : 'colorPrimary'}>
    Email
  </label>
  <input
    type="text"
    bind:value={email}
    on:input={cleanError}
    class={validateEmail(email) && !error ? 'inputSuccess' : 'inputPrimary'} />

  <label
    for="inputPrimary"
    class={psevdonim.length > 4 && !error ? 'colorSuccess' : 'colorPrimary'}>
    Псевдоним
  </label>
  <input
    type="text"
    on:input={cleanError}
    bind:value={psevdonim}
    class={psevdonim.length > 4 && !error ? 'inputSuccess' : 'inputPrimary'} />

  <label
    for="inputPrimary"
    class={password.length > 4 && password === passwordSecond && !error ? 'colorSuccess' : 'colorPrimary'}>
    Парола
  </label>
  <input
    type="password"
    on:input={cleanError}
    bind:value={password}
    class={password.length > 4 && password === passwordSecond && !error ? 'inputSuccess' : 'inputPrimary'} />

  <label
    for="inputPrimary"
    class={passwordSecond.length > 4 && password === passwordSecond && !error ? 'colorSuccess' : 'colorPrimary'}>
    Повтори паролата
  </label>
  <input
    type="password"
    on:input={cleanError}
    bind:value={passwordSecond}
    class={password.length > 4 && password === passwordSecond && !error ? 'inputSuccess' : 'inputPrimary'} />
  <p class={acceptTerms ? 'colorSuccess guarantee' : 'colorPrimary guarantee'}>
    <span class="switch">
      <Switch bind:checked={acceptTerms} />

    </span>
    Гарантирам, че имам навършени 18 години
  </p>
  {#if loading}
    <img style="width:50px" src="/loading.svg" alt="" />
  {/if}
  {#if error}
    <span>{error.message}</span>
  {/if}
  <span
    on:click={register}
    class={password.length > 4 && acceptTerms && password === passwordSecond && psevdonim.length > 4 && !error && validateEmail(email) ? 'neon-button-success' : 'neon-button'}>
    Регистрирай се
  </span>

</div>
