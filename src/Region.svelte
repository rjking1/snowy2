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
  <span class="left"><b>{name}</b></span><span class="right">$ {price}</span>
  <br /><span class="left">Supply:</span><span class="right">{supply} MW</span> 
  <br />Generation: {gen} MW
  <br /><span>Rooftop:</span><span class="right">{rooftop} MW</span>
  </div>
  <div class="right">
    <br />Fossil: {fossil} MW
    <br />Solar: {solar} MW
    <br />Wind: {wind} MW
    <br />Hydro: {hydro} MW
    <br />Hydro Storage: {hstorage} MW
    <br />Battery Storage: {bstorage} MW
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
