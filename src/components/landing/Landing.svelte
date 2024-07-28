<style>
  .main {
    background-image: url("/romanOrgy.jpg");
    min-height: 100vh;
    display: flex;
    background-position: center;
    flex-direction: column;
  }
  .textCenter {
    width: 50vw;
    text-align: center;
    border-radius: 30px;
    background: #0c030399;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20vh;
    display: flex;
    flex-direction: column;
    padding: 25px;
    height: fit-content;
  }

  .buttonRow {
    margin-top: var(--spacing-huge);
  }

  button{
    font-size:1.5rem;
  }

  @media only screen and (max-width: 600px) {
    .textCenter {
      margin-top: auto;
      margin-bottom: auto;
      min-width: fit-content;
    }
    h1 {
      font-size: 1.5rem;
    }
    button{
      font-size:1rem;
    }
  }
</style>

<div class="main">

  <div class="textCenter">
    <p>
      Публикувай анонимно свои фантазии и желания, без да разкриваш самоличността си. 
      Други потребители могат да разглеждат тези публикации и да чатят с теб.
    </p>

    <div
      class=" flexJustifySpaceAround buttonRow flexRow
      justifyContentSpaceBetween">
      <button
        on:click={() => {
          location.assign('/#/login');
        }}
        class="buttonPrimary">
        Влез
      </button>
      <button
        on:click={() => {
          location.assign('/#/register');
        }}
        class="buttonPrimary">
        Регистрирай се
      </button>
    </div>
  </div>

</div>
