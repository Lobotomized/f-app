<script>
  import { onMount } from "svelte";

  import api from "../../../apiCalls";

  let photos = [];
  let photosSkip = 0;
  let loading = false;

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
    photos = [...getThePhotos.photos];
  });
</script>

<style>
  .displayBlock {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: var(--spacing-medium);
    max-width: 40vw;
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
    font-size: 2em;
    cursor: pointer;
  }
  .loadingImage {
    width: 50px;
    color: var(--clr-primary);
  }
</style>

<div>

  <label class="span4e">
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
  {#each photos as photo}
    <div>
      <img src={photo.imageUrl} class="displayBlock" alt={photo.imageUrl} />

      <span on:click={async () => {
        await api.deletePhoto(photo._id);
        photos = photos.filter((pho) => {
          console.log(pho._id != photo._id, '   tuka')
          return pho._id != photo._id
        })
      }} class="span4e">ИЗТРИЙ</span>
    </div>
  {/each}

  {#if photos.length % 20 === 0 && photos.length > 1}
    <span on:click={loadMore} class="neon-button">Зареди още</span>
  {/if}

</div>
