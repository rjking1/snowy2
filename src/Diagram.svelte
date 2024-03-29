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

  let snowy2Gen = 0;
  let tumut1Gen = 0;
  let tumut2Gen = 0;
  let upptumutGen = 0;
  let tumut3Gen: number = 0;
  let bloweringGen = 0;

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

<div class="container">
  <Empty />
  <Empty />
  <Dam name="Tantangara" size="255,000ML" />
  <EArrow gen={1} />
  <Dam name="Eucumbene" size="4,798,400ML" />
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
  <Gen name="Snowy 2.0" size="2000MW" gen={snowy2Gen} />
  <Empty />
  <Gen name="Tumut 1" size="330MW" gen={tumut1Gen} />
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
  <Dam name="Talbingo" size="921,400ML" />
  <WArrow gen={tumut2Gen} />
  <Gen name="Tumut 2" size="286MW" gen={tumut2Gen} />
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
  <Gen name="Tumut 3" size="1,800MW" gen={tumut3Gen} />
  <Empty />
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={doRefresh}>Refresh</button>
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
  <Dam name="Journama" size="43,542ML" />
  <EArrow gen={1} />
  <Dam name="Blowering" size="1,628,000ML" />
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
  <Gen name="Blowering" size="80MW" gen={bloweringGen} />
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

<style>
  .container {
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
