<script>
  import Gallery from "./gallery/Gallery.svelte";
  import Characteristics from "./characteristics/Characteristics.svelte";
import { UserObserver } from "../../stores";


  let user = {};

  UserObserver.subscribe((innerUser) => {
    user = innerUser;
  })
</script>

<style>
  div {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding-bottom: 40px;
  }
</style>

<div>
  <h1>Здравей {user.username}</h1>
  <Gallery />
  <!-- <Characteristics /> -->
</div>
