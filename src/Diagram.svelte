<script lang="ts">
  import { onMount } from "svelte";

  import { Button, DarkMode, Heading } from "flowbite-svelte";
  import { Tabs, TabItem } from "flowbite-svelte";

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
  import Region from "./Region.svelte";
  import Interconnector from "./Interconnector.svelte";
  import EwInterconnector from "./EWInterconnector.svelte";
  import ChartWidget from "./ChartWidget.svelte";
  import NsArrow from "./NSArrow.svelte";

  let qDams: any = undefined;
  let qSnowy: any = undefined;
  let qNem: any = undefined;
  let qPrice: any = undefined;
  let qinterc: any = undefined;
  let qRooftop: any = undefined;
  let qFuelType: any = undefined;

  let snowy2Gen: number = 0;
  let tumut1Gen: number = 0;
  let tumut2Gen: number = 0;
  let upptumutGen: number = 0;
  let tumut3Gen: number = 0;
  let bloweringGen: number = 0;

  let marketTime = "";

  let widgetList = [];

  function getByKey(arr: {}[], key: string, column: string): string {
    if (arr == undefined) {
      console.log("acc is undefined");
      return "0";
    }

    // console.log(key, column);
    const row = arr.find((x) => x["ID"] === key);
    // console.log(row);
    if(row) {
      return row[column];
    }else {
      return "0"
    }
  }

  onMount(async () => {
    await init();
  });

  export async function init() {
    console.log("init called");
    widgetList = [];
    // await doGetHTML();
    await performQueries(); // views and embedded SQL
    console.log("adding widgets to HTML...");
    // await addWidgetsToHTML();
    // await doUpdateAll();
  }

  async function performQueries() {
    // console.log($dbN)
    qSnowy = await doFetch(
      $dbN,
      "select DUID as ID, ROUND(SCADAVALUE,0) as v from DISPATCH__UNIT_SCADA where duid in ('TUMUT3','UPPTUMUT','BLOWERNG','SNOWYP','LYA1') order by settlementdate desc limit 5"
    );
    console.log(qSnowy);

    upptumutGen = parseInt(getByKey(qSnowy, "UPPTUMUT", "v"));
    tumut1Gen = Math.round((upptumutGen * 330) / 616);
    tumut2Gen = Math.round((upptumutGen * 286) / 616);
    tumut3Gen =
      parseInt(getByKey(qSnowy, "TUMUT3", "v")) +
      parseInt(getByKey(qSnowy, "SNOWYP", "v"));
    bloweringGen = parseInt(getByKey(qSnowy, "BLOWERNG", "v"));

    try {
      qDams = await doFetch(
        $dbN,
          `SELECT dam_id as ID, datetime, vol, acc_vol, 
          (select v1.acc_vol - v3.acc_vol from DAM_VOLS v3 where v3.dam_id=v1.dam_id and v3.datetime + interval 1 day = v1.datetime) as delta 
          FROM DAM_VOLS v1 where (dam_id, datetime) in (select dam_id, max(datetime) as datetime from DAM_VOLS group by dam_id)`
        );
    } catch (error) {
      console.log(error);
    }
    console.log(qDams);

    qPrice = await doFetch(
      $dbN,
      "select RegionID as ID, settlementdate, ROUND(RRP,2) as rrp from DISPATCH__PRICE order by settlementdate desc limit 5"
    );
    console.log(qPrice);

    // next is regionsum data
    qNem = await doFetch(
      $dbN,
      "select RegionID as ID, ROUND(ClearedSupply,0) as supply, ROUND(DispatchableGeneration,0) as gen from DISPATCH__REGIONSUM order by settlementdate desc limit 5"
    );
    console.log(qNem);

    // can get this from fueltype query !!
    qRooftop = await doFetch(
      $dbN, // Where interval_datetime >= curdate()
      "select REGIONID as ID, INTERVAL_DATETIME, round(POWER,0) as power from ROOFTOP__ACTUAL order by interval_datetime desc limit 5"
    );
    console.log(qRooftop);

    qinterc = await doFetch(
      $dbN,
      "select InterconnectorID as ID, ROUND(MWFlow,0) as flow from DISPATCH__INTERCONNECTORRES order by settlementdate desc limit 6"
    );
    console.log(qinterc);

    marketTime = getByKey(qPrice, "QLD1", "settlementdate").slice(11, 16);

    qFuelType = await doFetch(
      // -- {"height":400, "orientation":"h"}
      // (select max(settlementdate) from DISPATCH__PRICE)
      $dbN,
      `select concat(m.regionid, m.fueltype) as ID, round(sumscada,0) as v from SCADA_BY_FUELTYPE m \
      Where settlementdate = (select max(settlementdate) from DISPATCH__PRICE) \
      group by 1` // ORDER BY FIELD(_ft, 'Rooftop PV'), _ft, regionid`
    );
    console.log(qFuelType);
  }

  async function addWidgetsToHTML() {
    // see Dashboardpage for complete story
    // could we make this dynamic loader a shareable compnent
    await addChartWidget("#c1", qFuelType, "bar", {
      height: 800,
      width: 800,
      orientation: "h",
    });
  }

  async function doUpdateAll() {
    // TODO: need to update Snowy and NEM
    // see dashboard page for complete story
    // and we don't use updateChart...
    // updateChartWidget(
    //   // addChartWidget( //
    //   // this should be update but plotly draws into a div I give it and this makes it differnt
    //   "#c1",
    //   qFuelType,
    //   "bar",
    //   {
    //     height: 800,
    //     width: 800,
    //     orientation: "h",
    //   }
    // );
  }

  async function doRefresh() {
    await performQueries();
    await doUpdateAll();
  }

  // async function doChart() {
  // fields = JSON.parse(v.fields);
  // if (fields === null) {
  //   fields = [];
  // }
  // fields.push({ fieldName: "id", visibility: false });
  // console.log(fields);

  // let sql_text = v.get_sql.replace("%d", p.id);
  // let [opts, ...sql] = sql_text.split(/\r?\n/);
  // if (opts.startsWith("-- {")) {
  //   opts = JSON.parse(opts.slice(3));
  //   sql = sql.join("\n");
  // } else {
  //   opts = {};
  //   sql = sql_text;
  // }

  // console.log(sql);
  // const datetime = $gOptions.datetime;
  // sql = sql.replaceAll(":datetime:", datetime); // maybe this should also quote the datetime string
  // sql = sql.replaceAll(":duid:", $gOptions.duid);
  // console.log(sql);

  // opts.datetime = datetime;
  // console.log(opts);

  // data = await doFetch($dbN, sql);

  // addChartWidget("#plotlychart", qFuelType, 'bar', '');
  // }

  function addChartWidget(s, data, chartType, opts) {
    console.log("adding to widgetList..", s);
    const w = new ChartWidget({
      target: document.querySelector(s),
      props: {
        div: s,
        data: data,
        chartType: chartType,
        opts: opts,
      },
    });
    widgetList.push({
      sel: s,
      wgt: w,
    });
    console.log(widgetList);
  }

  // just to have it here aswell

  function updateChartWidget(s, data, chartType, opts) {
    console.log(widgetList);
    let widget = widgetList.find((w) => w.sel == s)["wgt"];
    console.log("found chart: ");
    console.log(widget);
    widget.$set({
      div: s,
      data: data,
      chartType: chartType,
      opts: opts,
    });
  }

  async function dbg() {
    console.log("widgetList:", widgetList);
    console.log("qFuelType:", qFuelType);
  }
</script>

<Tabs
  style="pill"
  contentClass="p-4 bg-white-50 rounded-lg dark:bg-gray-800 mt-4"
>
  <Button color="light" on:click={doRefresh}>Refresh</Button>
  <TabItem open title="Snowy Dams">
    {#if qDams && qSnowy}
      <div class="snowy-grid">
        <Empty />
        <Empty />
        <Dam
          name="Burrinjuck"
          currDate={getByKey(qDams, "BUR", "datetime")}
          currVol={parseInt(getByKey(qDams, "BUR", "vol"))}
          currAccessible={parseInt(getByKey(qDams, "BUR", "acc_vol"))}
          delta={parseInt(getByKey(qDams, "BUR", "delta"))}
          size="1026000"
        />
        <Empty />
        <Empty />
        <Empty />
        <Empty />

        <Empty />
        <Empty />
        <NsArrow gen={-1} />
        <Empty />
        <Empty />
        <Empty />
        <Empty />

        <Empty />
        <Empty />
        <Dam
          name="Tantangara"
          currDate={getByKey(qDams, "TAN", "datetime")}
          currVol={parseInt(getByKey(qDams, "TAN", "vol"))}
          currAccessible={parseInt(getByKey(qDams, "TAN", "acc_vol"))}
          delta={parseInt(getByKey(qDams, "TAN", "delta"))}
          size="255000"
        />
        <EArrow gen={1} />
        <Dam
          name="Eucumbene"
          currDate={getByKey(qDams, "EUC", "datetime")}
          currVol={parseInt(getByKey(qDams, "EUC", "vol"))}
          currAccessible={parseInt(getByKey(qDams, "EUC", "acc_vol"))}
          delta={parseInt(getByKey(qDams, "EUC", "delta"))}
          size="4798400"
        />
        <EArrow gen={1} />
        <p>Irrigation, Environment, Town water</p>

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
          maxFlow="6 x 50"
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
          currDate={getByKey(qDams, "TAL", "datetime")}
          currVol={parseInt(getByKey(qDams, "TAL", "vol"))}
          currAccessible={parseInt(getByKey(qDams, "TAL", "acc_vol"))}
          delta={parseInt(getByKey(qDams, "TAL", "delta"))}
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
          maxFlow="6 x 188"
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
          currDate={getByKey(qDams, "JOU", "datetime")}
          currVol={parseInt(getByKey(qDams, "JOU", "vol"))}
          currAccessible={parseInt(getByKey(qDams, "JOU", "acc_vol"))}
          delta={parseInt(getByKey(qDams, "JOU", "delta"))}
          size="43542"
        />
        <EArrow gen={1} />
        <Dam
          name="Blowering"
          currDate={getByKey(qDams, "BLO", "datetime")}
          currVol={parseInt(getByKey(qDams, "BLO", "vol"))}
          currAccessible={parseInt(getByKey(qDams, "BLO", "acc_vol"))}
          delta={parseInt(getByKey(qDams, "BLO", "delta"))}
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
        <p>Irrigation, Environment, Town water</p>
        <Empty />
        <Empty />
        <Empty />
        <Empty />
      </div>
    {:else}
      <div>querying...</div>
    {/if}
  </TabItem>
  <TabItem title="NEM">
    <div class="flex flex-row mt-4">
      <!-- <Heading tag="h3" class="bg-blue-300">NEM</Heading> -->
      {#if qNem && qinterc && qPrice && qRooftop && qFuelType}
        <div class="nem-grid">
          <div>Market time: <b>{marketTime}</b></div>
          <Empty />
          <Region
            name="QLD"
            price={getByKey(qPrice, "QLD1", "rrp")}
            supply={getByKey(qNem, "QLD1", "supply")}
            gen={getByKey(qNem, "QLD1", "gen")}
            rooftop={getByKey(qRooftop, "QLD1", "power")}
            fossil={Math.trunc(getByKey(qFuelType, "QLD1Black Coal", "v")) + Math.trunc(getByKey(qFuelType, "QLD1Gas", "v")) }
            solar={getByKey(qFuelType, "QLD1Solar", "v")}
            wind={getByKey(qFuelType, "QLD1Wind", "v")}
            hydro={getByKey(qFuelType, "QLD1Hydro", "v")}
            hstorage={getByKey(qFuelType, "QLD1Hydro Storage", "v")}
            bstorage={getByKey(qFuelType, "QLD1Battery Storage", "v")}
          />

          <Empty />
          <Empty />
          <Interconnector
            name="NSW1-QLD1 and N-Q-MNSP1"
            flow={parseInt(getByKey(qinterc, "NSW1-QLD1", "flow")) +
              parseInt(getByKey(qinterc, "N-Q-MNSP1", "flow"))}
          />

          <Empty />
          <Empty />
          <Region
            name="NSW"
            price={getByKey(qPrice, "NSW1", "rrp")}
            supply={getByKey(qNem, "NSW1", "supply")}
            gen={getByKey(qNem, "NSW1", "gen")}
            rooftop={getByKey(qRooftop, "NSW1", "power")}
            fossil={Math.trunc(getByKey(qFuelType, "NSW1Black Coal", "v")) + Math.trunc(getByKey(qFuelType, "NSW1Gas", "v")) }
            solar={getByKey(qFuelType, "NSW1Solar", "v")}
            wind={getByKey(qFuelType, "NSW1Wind", "v")}
            hydro={getByKey(qFuelType, "NSW1Hydro", "v")}
            hstorage={getByKey(qFuelType, "NSW1Hydro Storage", "v")}
            bstorage={getByKey(qFuelType, "NSW1Battery Storage", "v")}
          />

          <Empty />
          <Empty />
          <Interconnector
            name="VIC1-NSW1"
            flow={getByKey(qinterc, "VIC1-NSW1", "flow")}
          />

          <Region
            name="SA"
            price={getByKey(qPrice, "SA1", "rrp")}
            supply={getByKey(qNem, "SA1", "supply")}
            gen={getByKey(qNem, "SA1", "gen")}
            rooftop={getByKey(qRooftop, "SA1", "power")}
            fossil={getByKey(qFuelType, "SA1Gas", "v")}
            solar={getByKey(qFuelType, "SA1Solar", "v")}
            wind={getByKey(qFuelType, "SA1Wind", "v")}
            bstorage={getByKey(qFuelType, "SA1Battery Storage", "v")}
          />
          <EwInterconnector
            name="V-SA"
            flow={parseInt(getByKey(qinterc, "V-SA", "flow")) +
              parseInt(getByKey(qinterc, "V-S-MNSP1", "flow"))}
          />
          <Region
            name="VIC"
            price={getByKey(qPrice, "VIC1", "rrp")}
            supply={getByKey(qNem, "VIC1", "supply")}
            gen={getByKey(qNem, "VIC1", "gen")}
            rooftop={getByKey(qRooftop, "VIC1", "power")}
            fossil={Math.trunc(getByKey(qFuelType, "VIC1Brown Coal", "v")) + Math.trunc(getByKey(qFuelType, "VIC1Gas", "v")) }
            solar={getByKey(qFuelType, "VIC1Solar", "v")}
            wind={getByKey(qFuelType, "VIC1Wind", "v")}
            hydro={getByKey(qFuelType, "VIC1Hydro", "v")}
            bstorage={getByKey(qFuelType, "VIC1Battery Storage", "v")}
          />

          <Empty />
          <Empty />
          <Interconnector
            name="Basslink"
            flow={getByKey(qinterc, "T-V-MNSP1", "flow")}
          />

          <Empty />
          <Empty />
          <Region
            name="TAS"
            price={getByKey(qPrice, "TAS1", "rrp")}
            supply={getByKey(qNem, "TAS1", "supply")}
            gen={getByKey(qNem, "TAS1", "gen")}
            rooftop={getByKey(qRooftop, "TAS1", "power")}
            fossil={getByKey(qFuelType, "TAS1Gas", "v")}
            solar={getByKey(qFuelType, "TAS1Solar", "v")}
            wind={getByKey(qFuelType, "TAS1Wind", "v")}
            hydro={getByKey(qFuelType, "TAS1Hydro", "v")}
            bstorage={getByKey(qFuelType, "TAS1Battery Storage", "v")}
          />
        </div>
      {/if}
    </div>
  </TabItem>
  <TabItem title="Fuel Type" on:click={dbg}>
    <div class="flex flex-row mt-4">
      <!-- <Heading tag="h3" class="bg-blue-300">NEM</Heading> -->
      {#if qFuelType}
        <div>
          <div id="c1">chart here</div>
        </div>
      {/if}
    </div>
  </TabItem>
</Tabs>
<div>
  Data sourced from AEMO, BoM http://www.bom.gov.au/waterdata/ and wikipedia
  https://en.wikipedia.org/wiki/List_of_dams_and_reservoirs_in_Australia and
  related sources
</div>

<!-- <div class="fixed bottom-0 left-0">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={doRefresh}>Refresh</button
  >
</div> -->

<style>
  .snowy-grid {
    display: grid;
    /* grid-template-columns: 120px 60px 300px 60px 250px 110px 150px; */
    grid-template-columns: 10% 8% 25% 7% 25% 10% 15%;
    grid-auto-rows: 110px;
    grid-auto-flow: row;
    justify-content: center;
    justify-items: center;
    align-items: center;
    padding: 5px;
  }

  .nem-grid {
    display: grid;
    /* grid-template-columns: 120px 60px 300px 60px 250px 110px 150px; */
    grid-template-columns: 500px 150px 500px;
    grid-template-rows: 150px;
    grid-auto-columns: 150px;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    justify-content: center;
    justify-items: center;
    align-items: center;
    padding: 50px;
  }
</style>
