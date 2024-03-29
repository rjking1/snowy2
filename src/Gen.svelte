<script lang="ts">
  export let name: string;
  export let size: string;
  export let gen: number;

  $:  opp = gen == 0 ? 0.2 : 1;
  $:  cls = gen == 0 ? '' : gen > 0 ? 'cc' : 'acc';

  // console.log(name, gen, cls);
</script>

<div class="side-by-side">
  <div class={cls}>
    <!-- <img src="./assets/noun-hydro-power-6247453.svg" alt={name} width='60px' style="opacity: {opp}" /> -->
    <img
      src="./assets/noun-gear-941149.svg"
      alt={name}
      width="60px"
      style="opacity: {opp}"
    />
  </div>
  {name}
  <br />
  {gen} / {size}
</div>

<style>
  .side-by-side {
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .cc {
    animation: cc 3s infinite linear;
  }

  @keyframes cc {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  .acc {
    animation: acc 3s infinite linear;
  }

  @keyframes acc {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

</style>
