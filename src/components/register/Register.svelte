<script>
  import Switch from "../general/Switch.svelte";
  let acceptTerms = false;
  let email = "";
  let psevdonim = "";
  let password = "";
  let passwordSecond = "";

  function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }
</script>

<style>

  /* Small screens */
  @media only screen and (max-width: 600px) {
    .containElement {
      padding-bottom: calc(var(--spacing-huge)*2) !important;
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
    class={validateEmail(email) ? 'colorSuccess' : 'colorPrimary'}>
    Email
  </label>
  <input
    type="text"
    bind:value={email}
    class={validateEmail(email) ? 'inputSuccess' : 'inputPrimary'} />

  <label
    for="inputPrimary"
    class={psevdonim.length > 4 ? 'colorSuccess' : 'colorPrimary'}>
    Псевдоним
  </label>
  <input
    type="text"
    bind:value={psevdonim}
    class={psevdonim.length > 4 ? 'inputSuccess' : 'inputPrimary'} />

  <label
    for="inputPrimary"
    class={password.length > 4 && password === passwordSecond ? 'colorSuccess' : 'colorPrimary'}>
    Парола
  </label>
  <input
    type="password"
    bind:value={password}
    class={password.length > 4 && password === passwordSecond ? 'inputSuccess' : 'inputPrimary'} />

  <label
    for="inputPrimary"
    class={passwordSecond.length > 4 && password === passwordSecond ? 'colorSuccess' : 'colorPrimary'}>
    Повтори паролата
  </label>
  <input
    type="password"
    bind:value={passwordSecond}
    class={password.length > 4 && password === passwordSecond ? 'inputSuccess' : 'inputPrimary'} />
  <p class={acceptTerms ? 'colorSuccess guarantee' : 'colorPrimary guarantee'}>
    <span class="switch">
      <Switch bind:checked={acceptTerms} />

    </span>
    Гарантирам, че имам навършени 18 години
  </p>
  <a
    href="/"
    class={password.length > 4 && acceptTerms && password === passwordSecond && psevdonim.length > 4 && validateEmail(email) ? 'neon-button-success' : 'neon-button'}>
    Регистрирай се
  </a>
</div>
