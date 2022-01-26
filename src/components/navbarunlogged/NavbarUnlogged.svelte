<script>
  import { link } from "svelte-spa-router";
</script>

<style>
  .navbar {
    position: fixed;
    background-color: var(--clr-primary-background);
    transition: width var(--time-small) ease;
    overflow: auto;
  }

  .navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .nav-item {
    width: 100%;
  }

  .nav-item:last-child {
    /* margin-top: auto; */
  }

  .nav-link {
    display: flex;
    align-items: center;
    height: 5rem;
    color: var(--clr-secondary);
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: var(--time-small);
  }

  .nav-link:hover {
    filter: grayscale(0%) opacity(1);
    background: var(--bg-secondary);
    color: var(--text-secondary);
  }

  .link-text {
    display: none;
    margin-left: 1rem;
  }

  .nav-link svg {
    width: 2rem;
    min-width: 2rem;
    margin: 0 1.5rem;
  }

  .fa-primary {
    color: var(--clr-primary);
  }

  .fa-secondary {
    color: var(--clr-secondary);
  }

  .fa-primary,
  .fa-secondary {
    transition: var(--time-small);
  }

  .logo {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-align: center;
    color: var(--clr-primary);
    background: var(--clr-primary-background);
    font-size: 1.5rem;
    letter-spacing: 0.3ch;
    width: 100%;
  }

  .logo svg {
    transform: rotate(0deg);
    transition: var(--time-small);
  }

  .logo-text {
    display: inline;
    position: absolute;
    left: -999px;
    transition: var(--time-small);
  }

  .navbar:hover .logo svg {
    transform: rotate(-180deg);
  }

  /* Small screens */
  @media only screen and (max-width: 600px) {
    .navbar {
      bottom: 0;
      width: 100vw;
      height: 5rem;
    }

    .logo {
      display: none;
    }

    .navbar-nav {
      flex-direction: row;
    }

    .nav-link {
      justify-content: center;
    }
    .nav-item:last-child {
      margin-top: 0;
    }
  }

  /* Large screens */
  @media only screen and (min-width: 600px) {
    .navbar {
      top: 0;
      width: 5rem;
      height: 100vh;
    }

    .navbar:hover {
      width: 16rem;
    }

    .navbar:hover .link-text {
      display: inline;
    }

    .navbar:hover .logo svg {
      margin-left: 11rem;
    }

    .navbar:hover .logo-text {
      left: 0px;
    }
  }
</style>

<nav class="navbar">
  <ul class="navbar-nav">
    <li class="logo">
      <a href="/#/" use:link={'/'} class="nav-link">
        <span class="link-text logo-text">Меню</span>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="angle-double-right"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x">
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94
              23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1
              0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94
              23.94 0 0 1 .1 34z"
              class="fa-secondary" />
            <path
              fill="currentColor"
              d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224
              386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94
              0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24
              0 0 1-.11 34z"
              class="fa-primary" />
          </g>
        </svg>
      </a>
    </li>

    <li class="nav-item">
      <a href="/#/login" class="nav-link">
        <svg
          height="100px"
          width="100px"
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          fill="currentColor"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 100 100">

          <path
            d="M 35.6875 5 A 3.0003 3.0003 0 0 0 33 8 L 33 75 A 3.0003 3.0003 0
            0 0 36 78 L 44 78 L 44 92 A 3.0003 3.0003 0 0 0 48.15625 94.78125 L
            88.15625 78.125 A 3.0003 3.0003 0 0 0 90 75.34375 L 90 8 A 3.0003
            3.0003 0 0 0 87 5 L 36 5 A 3.0003 3.0003 0 0 0 35.6875 5 z M 39 11 L
            72.96875 11 L 45.78125 23.25 A 3.0003 3.0003 0 0 0 44 26 L 44 72 L
            39 72 L 39 11 z M 84 12.625 L 84 73.375 L 50 87.5 L 50 27.9375 L 84
            12.625 z M 16.8125 28.96875 A 3.0003 3.0003 0 0 0 15 34.21875 L
            19.1875 38 L 13 38 A 3.0003 3.0003 0 0 0 12.6875 38 A 3.0040663
            3.0040663 0 1 0 13 44 L 19.1875 44 L 15 47.78125 A 3.0003 3.0003 0 1
            0 19 52.21875 L 29 43.21875 A 3.0003 3.0003 0 0 0 29 38.78125 L 19
            29.78125 A 3.0003 3.0003 0 0 0 16.8125 28.96875 z M 62.90625 45 A
            3.0003 3.0003 0 0 0 61.8125 45.25 L 54.8125 48.25 A 3.0003 3.0003 0
            0 0 53 51 L 53 56 A 3.0003 3.0003 0 1 0 59 56 L 59 52.96875 L
            64.1875 50.75 A 3.0003 3.0003 0 0 0 62.90625 45 z " />
        </svg>
        <span class="link-text">Вход</span>
      </a>
    </li>

  </ul>
</nav>
