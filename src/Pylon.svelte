<script lang="ts">
  export let gen = 0;
</script>

<div class="pylon side-by-side">
  {#if gen !== 0}
    <div class="blob">
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" fill="none" />
      </svg>
    </div>
  {/if}
  {gen} MW <img src="./assets/noun-transmission-tower-304344.svg" alt="" />
</div>

<style>
  .pylon {
    width: 60px;
    height: 70px;
  }
  .side-by-side {
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .blob {
    z-index: -1;
    position: absolute;
    border-top-left-radius: 60%;
    border-top-right-radius: 40%;
    border-bottom-right-radius: 55%;
    border-bottom-left-radius: 40%;
    background-color: #fffbd2;
    animation: wobble 5s infinite;
  }

  @keyframes wobble {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
