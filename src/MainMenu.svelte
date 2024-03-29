<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
  // import { Button } from "flowbite-svelte";
  // import { link } from "svelte-spa-router";

</script>

<Navbar let:hidden let:toggle>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="#/" active={true}>Login</NavLi>
    <NavLi href="#/list">List</NavLi>
    <NavLi href="#/add">Add</NavLi>
    <NavLi href="#/query">Query</NavLi>
  </NavUl>
</Navbar>

<!-- <a href="#/">Login</a>
<a href="#/list">List</a>
<a href="#/add">Add</a>
<a href="#/query">Query</a> -->
