<script lang="ts">
  export let gen;

  $: opp = gen == 0 ? 0.1 : 1;
  // console.log(gen,dir)
</script>

<div class="arrow">
  <img src="./assets/noun-arrow-2025157-e.svg" alt="" style="opacity: {opp}" />
</div>

<style>
  .arrow {
    width: 50px;
    height: 50px;
  }
</style>
