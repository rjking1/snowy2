<script lang="ts">
  import { Popover } from "flowbite-svelte";

  export let name: string;
  export let price: number = 0.0;
  export let supply: number = 0;
  export let gen: number = 0;
  export let rooftop: number = 0;
  export let fossil: number = 0;
  export let solar: number = 0;
  export let wind: number = 0;
  export let hydro: number = 0;
  export let hstorage: number = 0;
  export let bstorage: number = 0;
  // export let size: number = 10000; // capacity
  // export let currVol: number = 4000;
  // export let currAccessible: number = 2000;
  // export let currDate = "01/01/2024";

  // $: currPercentage = Math.trunc((currVol * 100.0) / size).toString();
  // $: currAccPercent = Math.trunc((currAccessible * 100.0) / size).toString();
  // $: currVolBal = Math.trunc(
  //   ((currVol - currAccessible) * 100.0) / size
  // ).toString();
  // $: lms = size > 1000000 ? "200" : size > 500000 ? "150" : size > 100000 ? "100" : "50";

  // console.log(name, currVol, size, currPercentage);

  const id = Math.trunc(Math.random() * 1000).toString();
</script>

<div class="region">
  <div class="left">
  <span class="left"><b>{name}</b></span><span class="right" style="background-color: navajowhite"><b>$ {price}</b></span>
  <br />Grid demand /
  <br /><span>Supply:</span><span class="right" style="background-color: lightcyan;">{supply} MW</span>
  <br />Off-grid demand /
  <br /><span>Rooftop:</span><span class="right" style="background-color: rgba(240, 230, 140, 0.6);">{rooftop} MW</span>
  </div>
  <div class="right">
    <span>Fossil:</span><span class="right" style="background-color: rgba(60, 60, 60, 0.15);">{fossil} MW</span>
    <br /><span>Solar:</span><span class="right" style="background-color: rgba(240, 230, 140, 0.6);">{solar} MW</span>
    <br /><span>Wind:</span><span class="right" style="background-color: rgba(6, 281, 6, 0.225);">{wind} MW</span>
    {#if hydro}
    <br /><span>Hydro:</span><span class="right" style="background-color: rgba(6, 181, 286, 0.425);">{hydro} MW</span>
    {/if}
    {#if hstorage}
    <br /><span>Hydro Storage:&nbsp;</span><span class="right" style="background-color: rgba(6, 181, 286, 0.2);">{hstorage} MW</span>
    {/if}
    {#if bstorage}
    <br /><span>Battery Storage:&nbsp;</span><span class="right" style="background-color: rgba(181, 6, 286, 0.225);">{bstorage} MW</span>
    {/if}
    <br /><hr />
    <span>Generation:&nbsp;</span><span class="right" style="background-color: lavenderblush">{gen} MW</span>
  </div>
  <div class="right">
    <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </div>
  <Popover
    class="w-64 text-sm "
    title={name}
    triggeredBy="#id{id}"
    placement="right"
  >
    Supply: {supply} MW
    <br />Generation: {gen} MW
    <br />Rooftop: {rooftop} MW
  </Popover>
</div>

<style>
  .region {
    background-color: aliceblue;
    border: 2px solid black;
    border-radius: 3px;
    padding: 10px;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
</style>
