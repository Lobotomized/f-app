<script>
  let email = "";
  let password = "";

  function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }

  async function login() {
    const res = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    const jsonResponse = await res.json();
    localStorage.setItem('fappToken', jsonResponse.token)


  }


  
  async function example() {
    const res = await fetch("http://localhost:3000/tests", {
      method: "POST",
      body: JSON.stringify({
        Name: "string",
        poke: "string",
        additionalProp1: {}
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3NDhhMGU1LTljMDAtNDViNi1iNWZlLTE4ZmZkYzcxYjYyOCIsImVtYWlsIjoiaXZhbkB3cml0ZWNyYWZ0LmlvIiwiaWF0IjoxNjM3MDAzODc5LCJleHAiOjE2MzcwMjU0Nzl9.7X9ugYlNGxJtqmFt8RgLmXePWqj6tVxv1CmrPPNnXbo"
      }
    });
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
</style>

<div class="flexColumn flexAlignCenter">
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
    class={password.length > 4 ? 'colorSuccess' : 'colorPrimary'}>
    Парола
  </label>
  <input
    type="password"
    bind:value={password}
    class={password.length > 4 ? 'inputSuccess' : 'inputPrimary'} />

  <span
    on:click={login}
    class={password.length > 4 && validateEmail(email) ? 'neon-button-success' : 'neon-button'}>
    Заповядай
  </span>
</div>
