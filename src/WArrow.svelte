<script lang="ts">
  export let gen;

  $: opp = gen == 0 ? 0.1 : 1;
</script>

<div class="ns-arrow">
  <img src="./assets/noun-arrow-1921114-w.svg" alt="" style="opacity: {opp}" />
</div>

<style>
  .ns-arrow {
    width: 50px;
    height: 50px;
  }
</style>
