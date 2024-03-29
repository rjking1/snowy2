<script lang="ts">
  import { dbName } from "./stores";
  import Router, { push } from "svelte-spa-router";
  import { routes } from "./routes";
  import { onMount } from "svelte";
  import { DarkMode, Heading } from "flowbite-svelte";
  import MainMenu from "./MainMenu.svelte";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("db")) {
    $dbName = urlParams.get("db");
  }



</script>

<main>
  <div class="flex flex-row mt-4">
    <DarkMode />
    <Heading tag="h3" class="bg-blue-300">Snowy 2.0</Heading>
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
