<script lang="ts">
  import { dbName } from "./stores";
  import Router, { push } from "svelte-spa-router";
  import { routes } from "./routes";
  import { onMount } from "svelte";
  import { DarkMode, Heading } from "flowbite-svelte";
  import MainMenu from "./MainMenu.svelte";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
  import { dbN } from "./stores"

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("db")) {
    $dbName = urlParams.get("db");
  }

  // from https://steveolensky.medium.com/persist-your-svelte-store-between-page-refreshes-in-a-few-lines-of-code-8dc36fc926a6 :

  let savestore = false

  $: if (savestore && $dbN) {
    window.sessionStorage.setItem("snowy2_dbN", JSON.stringify($dbN))
  }

  onMount(async () => {
    let ses = window.sessionStorage.getItem("snowy2_dbN")
      if (ses) {
        console.log("sob-- ~ loading ses", ses)
        $dbN = JSON.parse(ses)
      }
    savestore = true
  })

</script>

<main>
  <div class="flex flex-row mt-4">
    <!-- <DarkMode /> -->
    <Heading tag="h3" class="bg-blue-300">Snowy</Heading>
  </div>
  <Router {routes} />
  <!-- <MainMenu /> -->
  <!-- <Navbar let:hidden let:toggle>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi href="#/" active={true}>Login</NavLi>
      <NavLi href="#/list">List</NavLi>
      <NavLi href="#/add">Add</NavLi>
      <NavLi href="#/query">Query</NavLi>
    </NavUl>
  </Navbar> -->
</main>

<!-- <div class="p-8 overflow-hidden bg-gray-50 dark:bg-gray-900"> -->
<!-- </div> -->
