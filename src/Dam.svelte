<script lang="ts">
  export let name: string;
  export let size: string;
</script>

<div class="side-by-side">
  <img src="./assets/noun-dam-892764.svg" alt={name} />
  {name}
  <br>
  {size}
</div>

<style>
  .side-by-side {
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
