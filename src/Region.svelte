<script lang="ts">
  import { Popover } from "flowbite-svelte";

  export let name: string;
  export let price: number = 0.0;
  export let supply: number = 0;
  export let gen: number = 0;
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
  <span class="left"><b>{name}</b></span><span class="right">$ {price}</span>
  <br />Supply: {supply} MW
  <br />Generation: {gen} MW

  <Popover
    class="w-64 text-sm "
    title={name}
    triggeredBy="#id{id}"
    placement="right"
  >
    Supply: {supply} MW
    <br />Generation: {gen} MW
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
