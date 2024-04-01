<script lang="ts">
  import { Popover } from "flowbite-svelte";

  export let name: string;
  export let currVol: number = 40;
  export let currAccessible: number = 20;
  export let size: number = 100; // capacity

  $: currPercentage = Math.trunc((currVol * 100.0) / size).toString();

  console.log(name, currVol, size, currPercentage);

  const id = Math.trunc(Math.random() * 1000).toString();
</script>

<div>
  <meter
    id="id{id}"
    value={currPercentage}
    low="20"
    high="80"
    min="0"
    max="100"
    optimum="100"
  ></meter>
  <span class="meter-value">{name}</span>
  <Popover
    class="w-64 text-sm "
    title={name}
    triggeredBy="#id{id}"
    placement="right"
  >
    <br />Percentage full: {currPercentage} %
    <br />Current volume: {currVol} ML
    <br />Capacity: {size} ML
    <br />Accessible volume: {currAccessible} ML
  </Popover>
</div>

<style>
  meter {
    height: 180px;
    width: 80px;
    transform: rotate(-90deg);
  }

  .meter-value {
    display: block;
    position: relative;
    top: -40px;
    height: 20px;
  }

  meter::-webkit-meter-suboptimum-value {
    background: none;
    background-color: #2266ee;
  }
  :-moz-meter-sub-optimum::-moz-meter-bar {
    background: none;
    background-color: #3333ee;
  }
</style>
