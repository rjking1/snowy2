<script lang="ts">
  export let name: string;
  export let flow: number;

  $: dir = flow <= 0 ? "s" : "n";
  $: opp = flow == 0 ? 0.1 : 1;
  // console.log(flow,dir)
</script>

<div class="side-by-side">
  <img
    class="arrow"
    src="./assets/noun-arrow-1921114-{dir}.svg"
    alt=""
    style="opacity: {opp}"
  />
  {Math.abs(flow)}&nbsp;MW
</div>

<style>
  .arrow {
    width: 50px;
    height: 70px;
  }
  .side-by-side {
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
