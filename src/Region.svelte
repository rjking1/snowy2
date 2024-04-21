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

  // calc red or green depending on % renewables
  let renew: number = parseInt(solar) + parseInt(wind) + parseInt(bstorage) + parseInt(rooftop)
  if(hydro) renew += parseInt(hydro)
  if(hstorage) renew += parseInt(hstorage)
  console.log(name , renew, parseInt(gen) + parseInt(rooftop))
  // const genColour = (renew > fossil) ? "green" : "indianred"
  const renewPercent= Math.trunc(renew * 100.0 / (parseInt(gen) + parseInt(rooftop)))
  const genColour = (renewPercent > 50) ? "green" : "indianred"

  const id = Math.trunc(Math.random() * 1000).toString();
</script>

<div class="region" id="id{id}">
  <div class="left">
  <span class="left"><b>{name}</b></span><span class="right" style="background-color: navajowhite"><b>$ {price}</b></span>
  <br />Grid demand /
  <br /><span>Supply:</span><span class="right">&nbsp;MW</span><span class="right" style="background-color: blue; color:white;">&nbsp;{supply}&nbsp;</span>

  <br /><span>Rooftop PV:&nbsp;</span><span class="right">&nbsp;MW</span><span class="right" style="background-color: rgba(240, 230, 140, 0.9);">{rooftop}&nbsp;</span>
  <br /><span>Renewable %:&nbsp;</span><span class="right">&nbsp;%&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="right" style="background-color:{genColour}; color:white;">&nbsp;{renewPercent}&nbsp;</span>
  </div>
  <div class="right">
    <span>Fossil:</span><span class="right">&nbsp;MW</span><span class="right" style="background-color: rgba(60, 60, 60, 0.15);">{fossil}</span>
    <br /><span>Solar:</span><span class="right">&nbsp;MW</span><span class="right" style="background-color: rgba(240, 230, 140, 0.9);">{solar}</span>
    <br /><span>Wind:</span><span class="right">&nbsp;MW</span><span class="right" style="background-color: rgba(6, 281, 6, 0.225);">{wind}</span>
    {#if hydro}
    <br /><span>Hydro:</span><span class="right">&nbsp;MW</span><span class="right" style="background-color: rgba(6, 181, 286, 0.425);">{hydro}</span>
    {/if}
    {#if hstorage}
    <br /><span>Hydro Storage:&nbsp;</span><span class="right">&nbsp;MW</span><span class="right" style="background-color: rgba(6, 181, 286, 0.2);">{hstorage}</span>
    {/if}
    {#if bstorage}
    <br /><span>Battery Storage:&nbsp;</span><span class="right">&nbsp;MW</span><span class="right" style="background-color: rgba(181, 6, 286, 0.225);">{bstorage}</span>
    {/if}
    <br /><hr />
    <span>Generation:&nbsp;</span><span class="right">&nbsp;MW</span><span class="right" style="background-color: blue; color:white;">&nbsp;{gen}&nbsp;</span>
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
