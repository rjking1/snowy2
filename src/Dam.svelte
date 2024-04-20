<script lang="ts">
  import { Popover } from "flowbite-svelte";

  export let name: string;
  export let size: number = 10000; // capacity
  export let currVol: number = 4000;
  export let currAccessible: number = 2000;
  export let delta: number = 2000;
  export let currDate = "01/01/2024";

  $: currPercentage = Math.trunc((currVol * 100.0) / size).toString();
  $: currAccPercent = Math.trunc((currAccessible * 100.0) / size).toString();
  $: currAccDelta = Math.trunc(Math.abs(delta)).toString();
  $: currVolBal = Math.trunc(
    ((currVol - currAccessible) * 100.0) / size
  ).toString();
  $: lms = size > 1000000 ? "200" : size > 500000 ? "150" : size > 100000 ? "100" : "50";
  $: arrow = delta > 0 ? "▲" : "▼"
  $: arrowColour = delta > 0 ? "teal": "salmon"

  console.log(name, currVol, size, currPercentage);

  const id = Math.trunc(200000+Math.random() * 100000);
</script>

<div>
  <div class="w" id="id{id}" style="height: 100px; width: {lms}px">
    <div class="b" style="height: {currVolBal}px">
      {currVolBal} %
    </div>
    <div class="a" style="height: {currAccPercent}px">
      {currAccPercent} %
    </div>
  </div>
  {name}

  <Popover
    class="w-64 text-sm "
    title={name}
    triggeredBy="#id{id}"
    placement="right"
  >
    Percentage full: {currPercentage} %
    <br />Capacity: {size} ML
    <br />Last reading on: {currDate}
    <br />Current volume: {currVol} ML
    <br /><span style="background-color: rgba(6, 181, 240, 0.925); width: 10px; height: 10px; color: white">Accessible volume: {currAccessible} ML</span>
    <br />24h change: <span style="background-color: {arrowColour}; width: 10px; height: 10px; color: white">{currAccDelta} ML {arrow}</span>
    <br />Accessible percentage: {currAccPercent} %
  </Popover>
</div>

<style>
  .w {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    background-color: lightgray;
    border: 2px solid black;
    border-radius: 3px;
    font-family: Helvetica;
    font-size: 10pt;
  }

  .a {
    background-color: rgba(6, 181, 240, 0.925);
    color: #fff;
    width: 100%;
  }

  .b {
    background-color: rgb(12, 128, 167);
    color: #fff ;
    width: 100%;
  }
</style>
