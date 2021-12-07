<script>
  import DesignElements from "./components/designElements/DesignElements.svelte";
  import Chat from "./components/chat/Chat.svelte";
  import Register from "./components/register/Register.svelte";
  import Fantasies from "./components/fantasies/Fantasies.svelte";
  import Landing from "./components/landing/Landing.svelte"
  import Navbar from "./components/navbar/Navbar.svelte";

  import Router, { location, link } from "svelte-spa-router";
  import Login from "./components/login/login.svelte";
  import {UserObserver} from "./stores"

  let user = {};
  UserObserver.subscribe((innerUser => {
    user = innerUser
  }))
</script>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: red;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .container {
    margin-left: auto;
    margin-right: auto;
  }

  @media only screen and (max-width: 600px) {
    .container {
      margin-left: auto;
      margin-right: auto;
      /* padding: var(--spacing-huge); */
    }
  }
</style>

<main>
  <Navbar />
  <div class="container">
    <!-- <Register /> -->
    <!-- <DesignElements /> -->
    <!-- <Chat /> -->
    
    <Router
      routes={{ '/': Landing,'/design': DesignElements, '/chat': Chat, '/register': Register, '/chats': Chat, '/fantasies': Fantasies, '/login': Login }} />
  </div>

</main>
