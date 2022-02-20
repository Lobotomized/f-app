<script>
  import Gallery from "./gallery/Gallery.svelte";
  import Characteristics from "./characteristics/Characteristics.svelte";
  import { UserObserver } from "../../stores";

  let user = {};

  UserObserver.subscribe(innerUser => {
    user = innerUser;
  });
</script>

<style>
  div {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding-bottom: 40px;
  }
  p{
    max-width:fit-content;
    margin-left:auto;
    margin-right:auto;
    color:var(--clr-secondary);
  }
</style>

<div>
  <h1>Здравей {user.username}</h1>
  <p>Аватарът е видим само за потребители, на които си споделил профил</p>
  <Gallery />
  <!-- <Characteristics /> -->
</div>
