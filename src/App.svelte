<script>
  import DesignElements from "./components/designElements/DesignElements.svelte";
  import Chat from "./components/chat/Chat.svelte";
  import Register from "./components/register/Register.svelte";
  import Fantasies from "./components/fantasies/Fantasies.svelte";
  import Landing from "./components/landing/Landing.svelte";
  import Navbar from "./components/Navbar/Navbar.svelte";
  import NavbarUnlogged from "./components/navbarunlogged/NavbarUnlogged.svelte";
  import Profile from "./components/profile/Profile.svelte";
  import Write from "./components/write/Write.svelte";
  import { onDestroy, onMount } from "svelte";
  import Router from "svelte-spa-router";
  import Login from "./components/login/Login.svelte";
  import { NewMessagesCount, UserObserver } from "./stores";
  import socket from "./socket";
  import api from "./apiCalls";

  let user = {};
  let newMessagesCount = 0;

  const unsubscribeUser = UserObserver.subscribe(innerUser => {
    user = innerUser;
  });
  if (localStorage.getItem("fappUser")) {
    UserObserver.set(JSON.parse(localStorage.getItem("fappUser")));
  }
  
  const unsubscribeMessages = NewMessagesCount.subscribe(innerMessages => {
    newMessagesCount = innerMessages;
  });

  onDestroy(() =>{
    unsubscribeUser()
    unsubscribeMessages();
  })
  onMount(() => {
    connect();
    api
      .getNewMessagesCount()
      .then(result => {
        NewMessagesCount.set(result.count);
      })
      .catch(err => {
        console.log(err, " wtf");
      });
  });

  const connect = function() {
    socket.auth = { userId: user._id };
    socket.connect();
  };



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
  {#if user?.email}
    <Navbar count={newMessagesCount} />
  {:else}
    <NavbarUnlogged />
  {/if}
  <div class="container">
    {#if user?.email}
    <Router
      routes={{ '/write': Write, '/profile': Profile, '/': Fantasies,  '/chat': Chat, '/chats': Chat, '/fantasies': Fantasies }} />
    {:else}
        <Router
       routes={{  '/': Landing,  '/register': Register,  '/login': Login }} />
    {/if}
    

  </div>


</main>
