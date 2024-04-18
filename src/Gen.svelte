<script lang="ts">
  import { Popover } from "flowbite-svelte";

  export let name: string;
  export let size: string;
  export let gen: number; // current
  export let head: number = 150; //eg Tumut3 150m
  export let turbines: number = 6; // 6
  export let turbineSize: number = 300; // 300 MW
  export let maxFlow: number = 188 * 6; // 188*6 m^3/s for all turbines -- recheck!!!!

  // genMW = head(m) * flow(m^3/s) * eff,say 0.93 * g  / 1000
  // eg tumut 2 262*119*0.93*9.8 / 1000 = ~280  ; flow = gen * 1000 / (head * eff * g)

  const eff = 0.93;
  const g = 9.8;

  $: calcFlow = Math.trunc((gen * 1000) / (head * eff * g)); // cumecs= m^3/s
  $: calcFlowML = Math.trunc((calcFlow * 1000 * 3600) / 1000000); // ML per hour

  $: opp = gen == 0 ? 0.2 : 1;
  $: cls = gen == 0 ? "" : gen > 0 ? "cc" : "acc";

  // console.log(name, gen, cls);
  const id = Math.trunc(100000+Math.random() * 100000);
</script>

<div class="side-by-side">
  <div class={cls}>
    <!-- <img src="./assets/noun-hydro-power-6247453.svg" alt={name} width='60px' style="opacity: {opp}" /> -->
    <img
      id="id{id}"
      src="./assets/noun-gear-941149.svg"
      alt={name}
      width="60px"
      style="opacity: {opp}"
    />
  </div>
  {name}
  <Popover
    class="w-64 text-sm "
    title={name}
    triggeredBy="#id{id}"
    placement="right"
  >
    {#if gen >= 0}
      Generating: {gen} MW
    {:else}
      Pumping: {-gen} MW
    {/if}
    <br />Turbines: {turbines} x {turbineSize} MW
    <br />Head: {head} m
    <br />Reg Max Flow: {maxFlow} m^3/s
    <br />Water Flow: {calcFlow} m^3/s
    <br />Water Flow: {calcFlowML} ML/h
  </Popover>
</div>

<style>
  .side-by-side {
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .cc {
    animation: cc 3s infinite linear;
  }

  @keyframes cc {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  .acc {
    animation: acc 3s infinite linear;
  }

  @keyframes acc {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
</style>
