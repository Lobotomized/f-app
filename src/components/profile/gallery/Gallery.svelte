<script>
  import { onMount } from "svelte";
  import { UserObserver } from "../../../stores";

  import api from "../../../apiCalls";

  let user = {};
  let photos = [];
  let photosSkip = 0;
  let loading = false;

  UserObserver.subscribe(innerUser => {
    user = innerUser;
  });

  const loadMore = async function() {
    photosSkip += 20;

    const getThePhotos = await api.getUserPhotos(photosSkip);
    photos = [...photos, ...getThePhotos.photos];
  };
  const onFileSelected = async e => {
    let image = e.target.files[0];
    const data = new FormData();
    loading = true;
    data.append("upload", image);
    try {
      const result = await api.postFile("/upload", data);
      photos = [result.photo, ...photos];
      loading = false;
    } catch (err) {}
  };

  onMount(async () => {
    const getThePhotos = await api.getUserPhotos(photosSkip);
    await api.getMe();
    photos = [...getThePhotos.photos];
  });
</script>

<style>
  .displayBlock {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: var(--spacing-medium);
  }

  .uploadUi {
    padding: var(--spacing-medium);
    border-radius: var(--spacing-small);
    font-size: 1rem;
    font-weight: bolder;
    cursor: pointer;
    border: solid;
    border-width: var(--spacing-tiny);
    outline: none;

    display: block;

    max-width: 40vw;
    margin: 30px auto 20px;
  }

  .neon-button {
    font-size: 2rem;
    text-align: center;
    margin-top: var(--spacing-medium);
  }
  .invis {
    display: none;
  }

  .span4e {
    margin-top: 10px;
    font-size: 2em;
    cursor: pointer;
  }
  .loadingImage {
    width: 50px;
    color: var(--clr-primary);
  }
  .photoGallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 30px;
  }

  .photo {
    margin: var(--spacing-medium);
    padding: var(--spacing-medium);
  }

  .photo img {
    border-radius: var(--spacing-small);
    max-width: 100%;
  }

  @media screen and (min-width: 600px) {
    .photoGallery {
      padding: 30px 6rem;
    }
    .photo {
      flex-basis: 100%;
      min-width: 100%;
    }
  }

  .flexRow {
    justify-content: space-around;
  }
  @media screen and (min-width: 992px) {
    .photo {
      flex-basis: 50%;
      min-width: 50%;
    }
  }
  @media screen and (min-width: 1200px) {
    .photo {
      flex-basis: 33%;
      min-width: 33%;
    }
  }
</style>

<div>

  <label class="uploadUi buttonPrimary">
    <input
      type="file"
      accept=".jpg, .jpeg, .png"
      class="invis"
      on:change={e => onFileSelected(e)} />

    {#if loading}
      <img class="loadingImage" src="/loading.svg" alt="" />
    {:else}
      <span>Натисни ТУК, за да качиш снимка</span>
    {/if}

  </label>

  <div class="photoGallery">
    {#each photos as photo}
      <div class="photo {photo._id === user.avatar ? 'borderSuccess' : ''}" >
        <img src={photo.imageUrl} class="displayBlock" alt={photo.imageUrl} />
        <div class="flexRow">
          <div
            on:click={async () => {
              await api.deletePhoto(photo._id);
              photos = photos.filter(pho => {
                return pho._id != photo._id;
              });
            }}
            class="span4e buttonPrimary">
            ИЗТРИЙ
          </div>

          <div
            on:click={async () => {
              await api.setAvatar(photo._id);
              await api.getMe();
            }}
            class="span4e buttonSuccess">
            СЛОЖИ АВАТАР
          </div>
        </div>

      </div>
    {/each}
  </div>

  {#if photos.length % 20 === 0 && photos.length > 1}
    <span on:click={loadMore} class="neon-button">Зареди още</span>
  {/if}

</div>
