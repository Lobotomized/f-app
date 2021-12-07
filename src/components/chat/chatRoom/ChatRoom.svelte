<script>
  export let room;
</script>

<style>
  .main {
    margin-bottom: var(--spacing-medium);
    margin-top: var(--spacing-medium);
    cursor: pointer;
    padding: var(--spacing-medium);
    max-height: 8rem;
    align-items: center;
  }
  h5 {
    padding: var(--spacing-tiny);
    margin: 0;
  }

  .avatar {
    max-height: 2rem;
    max-width: 2rem;
    border-radius: var(--spacing-huge);
  }

  @media only screen and (max-width: 600px) {
    h5{
      display:none;
    }
    .main{
      max-width:50px;
      border:none;
      max-height:4rem;
    }
  }
</style>

<div class="flexRow main borderPrimary flexJustifySpaceBetween">
  <img src="https://via.placeholder.com/300" class="avatar" alt="" />
  <h5>{room.name}</h5>

</div>
