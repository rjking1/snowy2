<script lang="ts">
  import { doFetch } from "../../common/dbutils";
  import { dbN } from "./stores";

  import Dam from "./Dam.svelte";
  import EArrow from "./EArrow.svelte";
  import WArrow from "./WArrow.svelte";
  import Empty from "./Empty.svelte";
  import Gen from "./Gen.svelte";
  import NSArrow from "./NSArrow.svelte";
  import SArrow from "./SArrow.svelte";
  import Pylon from "./Pylon.svelte";
  import EwPower from "./EWPower.svelte";
  import EPower from "./EPower.svelte";

  let snowy2Gen: number = 0;
  let tumut1Gen: number = 0;
  let tumut2Gen: number = 0;
  let upptumutGen: number = 0;
  let tumut3Gen: number = 0;
  let bloweringGen: number = 0;

  let tantangaraVol: number = 62665;
  let tantangaraAccVol: number = 47300;
  let tantangaraDate = "01-04-2024";
  let eucumbeneVol: number = 2677000;
  let eucumbeneAccVol: number = 1813000;
  let eucumbeneDate = "01-04-2024";
  let tumut1Vol: number = 60000;
  let tumut2Vol: number = 70000;
  let talbingoVol: number = 860000;
  let talbingoAccVol: number = 101000;
  let talbingoDate = "31-01-2024";
  let journamaVol: number = 35805;
  let bloweringVol: number = 1050000;

  let qresult = undefined;

  async function doRefresh() {
    // console.log($dbN)
    qresult = await doFetch(
      $dbN,
      "select DUID, ROUND(SCADAVALUE,0) as v from DISPATCH__UNIT_SCADA where duid='UPPTUMUT' order by settlementdate desc   limit 1"
    );
    console.log(qresult);
    upptumutGen = parseInt(qresult[0]["v"]);
    tumut1Gen = Math.round((upptumutGen * 330) / 616);
    tumut2Gen = Math.round((upptumutGen * 286) / 616);

    qresult = await doFetch(
      $dbN,
      "select DUID, ROUND(SCADAVALUE,0) as v from DISPATCH__UNIT_SCADA where duid like 'BLOW%' order by settlementdate desc   limit 1"
    );
    // console.log(qresult);
    bloweringGen = parseInt(qresult[0]["v"]);

    qresult = await doFetch(
      $dbN,
      "select duid, ROUND(SCADAVALUE,0) as v from DISPATCH__UNIT_SCADA where duid = 'TUMUT3' order by settlementdate desc   limit 1"
    );
    console.log(qresult);
    tumut3Gen = parseInt(qresult[0]["v"]);

    qresult = await doFetch(
      $dbN,
      "select duid, ROUND(SCADAVALUE,0) as v from DISPATCH__UNIT_SCADA where duid = 'SNOWYP' order by settlementdate desc   limit 1"
    );
    console.log(qresult);
    tumut3Gen = tumut3Gen + parseInt(qresult[0]["v"]); // addin pump -- only one will be non-zero
  }
</script>

<!-- <div>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={doRefresh}>Refresh</button>
</div> -->

<div class="snowy-grid">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={doRefresh}>Refresh</button
  >
  <Empty />
  <Dam
    name="Tantangara"
    currVol={tantangaraVol}
    currAccessible={tantangaraAccVol}
    currDate={tantangaraDate}
    size="255000"
  />
  <EArrow gen={1} />
  <Dam
    name="Eucumbene"
    currVol={eucumbeneVol}
    currAccessible={eucumbeneAccVol}
    currDate={eucumbeneDate}
    size="4798400"
  />
  <EArrow gen={1} />
  <p>Irrigation/Enviro/Town water</p>

  <Empty />
  <Empty />
  <NSArrow gen={snowy2Gen} />
  <Empty />
  <SArrow gen={tumut1Gen} />
  <Empty />
  <Empty />

  <Pylon gen={snowy2Gen} />
  <EwPower gen={snowy2Gen} />
  <Gen
    name="Snowy 2.0"
    size="2000MW"
    gen={snowy2Gen}
    turbineSize="340"
    turbines="6"
    head="700"
    maxFlow="6*50"
  />
  <Empty />
  <Gen
    name="Tumut 1"
    size="330MW"
    gen={tumut1Gen}
    turbineSize="82"
    turbines="4"
    head="292"
    maxFlow="119"
  />
  <EPower gen={tumut1Gen} />
  <Empty />

  <Empty />
  <Empty />
  <NSArrow gen={snowy2Gen} />
  <Empty />
  <SArrow gen={tumut1Gen} />
  <Empty />
  <Pylon gen={upptumutGen} />

  <Empty />
  <Empty />
  <Dam
    name="Talbingo"
    currVol={talbingoVol}
    currAccessible={talbingoAccVol}
    currDate={talbingoDate}
    size="921400"
  />
  <WArrow gen={tumut2Gen} />
  <Gen
    name="Tumut 2"
    size="286MW"
    gen={tumut2Gen}
    turbineSize="71"
    turbines="4"
    head="262"
    maxFlow="119"
  />
  <EPower gen={tumut2Gen} />
  <Empty />

  <Empty />
  <Empty />
  <NSArrow gen={tumut3Gen} />
  <Empty />
  <Empty />
  <Empty />
  <Empty />

  <Pylon gen={tumut3Gen} />
  <EwPower gen={tumut3Gen} />
  <Gen
    name="Tumut 3"
    size="1,800MW (600 pumping)"
    gen={tumut3Gen}
    turbineSize="300"
    turbines="6"
    head="150"
    maxFlow="6*188"
  />
  <Empty />
  <Empty />
  <Empty />
  <Empty />

  <Empty />
  <Empty />
  <NSArrow gen={tumut3Gen} />
  <Empty />
  <Empty />
  <Empty />
  <Empty />

  <Empty />
  <Empty />
  <Dam
    name="Journama"
    currVol={journamaVol}
    currAccessible="22500"
    currDate={talbingoDate}
    size="43542"
  />
  <EArrow gen={1} />
  <Dam
    name="Blowering"
    currVol={bloweringVol}
    currAccessible="1043000"
    currDate={eucumbeneDate}
    size="1628000"
  />
  <Empty />
  <Empty />

  <Empty />
  <Empty />
  <Empty />
  <Empty />
  <SArrow gen={bloweringGen} />
  <Empty />
  <Empty />

  <Empty />
  <Empty />

  <Empty />
  <Empty />
  <Gen
    name="Blowering"
    size="80MW"
    gen={bloweringGen}
    turbineSize="80"
    turbines="1"
    head="87"
    maxFlow="90"
  />
  <EPower gen={bloweringGen} />
  <Pylon gen={bloweringGen} />
  <Empty />
  <Empty />

  <Empty />
  <Empty />
  <SArrow gen={bloweringGen} />
  <Empty />
  <Empty />
  <Empty />
  <Empty />

  <Empty />
  <Empty />
  <p>Irrigation/Enviro/Town water</p>
  <Empty />
  <Empty />
  <Empty />
  <Empty />
</div>
<div>
  Data sourced from AEMO, BoM http://www.bom.gov.au/waterdata/ and wikipedia
  https://en.wikipedia.org/wiki/List_of_dams_and_reservoirs_in_Australia and
  related sources
</div>

<style>
  .snowy-grid {
    display: grid;
    /* grid-template-columns: 120px 60px 300px 60px 250px 110px 150px; */
    grid-template-columns: 10% 8% 25% 7% 25% 10% 15%;
    grid-template-rows: 150px;
    grid-auto-columns: 150px;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    justify-content: center;
    justify-items: center;
    align-items: center;
    padding: 5px;
  }

  .nem-grid {
    display: grid;
    /* grid-template-columns: 120px 60px 300px 60px 250px 110px 150px; */
    grid-template-columns: 10% 8% 25% 7% 25% 10% 15%;
    grid-template-rows: 150px;
    grid-auto-columns: 150px;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    justify-content: center;
    justify-items: center;
    align-items: center;
    padding: 5px;
  }
</style>
