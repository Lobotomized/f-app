<style>
  .menuButton {
    font-size: 2rem;
  }
  .flexColumn > * {
    margin-bottom: 25px;
  }
  .flexColumn {
    margin-bottom:200px;
  }

  p {
    width: 50%;
    border: solid;
  }
  .flexRow > * {
    margin-left: 10px;
  }
  @media only screen and (max-width: 600px) {
    .flexRow {
      flex-direction: column;
    }
    .flexRow > * {
      margin-bottom: 10px;
    }
  }
</style>

<div class="flexColumn flexAlignCenter">
  <h1 class="colorSuccess">Хединг 1</h1>
  <h2 class="colorSecondary">Хединг 2</h2>
  <h3>Хединг 3</h3>
  <h4 class="colorSecondary">Хединг 4</h4>

  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias, eum
    reiciendis? Officia distinctio dolore aliquid, cum quasi accusamus
    consequatur sunt eligendi eos consequuntur hic, itaque accusantium alias
    tempore deserunt nemo.
  </p>

  <duv class="flexRow flexJustifySpaceAround">
    <button class="buttonPrimary">Бутон</button>
    <button class="buttonSuccess">Бутон</button>
    <button class="buttonSecondary">Бутон</button>
  </duv>

  <div class="flexRow">

    <input type="text" class="inputPrimary" />
    <input type="text" class="inputSecondary" />
    <input type="text" class="inputSuccess" />
  </div>

  <div class="flexRow">
    <textarea class="textAreaPrimary" cols="30" rows="10" />
    <textarea class="textAreaSecondary" cols="30" rows="10" />
  </div>

  <a href="/" class="neon-button menuButton">Регистрация</a>

</div>
