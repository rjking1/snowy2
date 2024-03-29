<script lang="ts">

  import "flowbite";

  export let gen;

  $: opp = gen == 0 ? 0.1 : 1;
</script>

<div class="arrow" >
  <img
    data-popover-target="popover-top" data-popover-placement="top" 
    src="./assets/noun-arrow-1921114-s.svg"
    alt=""
    style="opacity: {opp}"
  />
</div>

<div data-popover id="popover-top" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
    <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
        <h3 class="font-semibold text-gray-900 dark:text-white">Popover top</h3>
    </div>
    <div class="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
    </div>
    <div data-popper-arrow></div>
</div>

<style>
  .arrow {
    width: 50px;
    height: 50px;
  }
</style>
