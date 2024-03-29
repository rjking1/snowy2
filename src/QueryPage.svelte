<script>
  import { doFetch } from "./common";
  import { dbN } from "./stores";

  let sql =
    "select r.ride_date, rt.name, b.name, r.km, r.alt_gain, r.description, r.weather from rides r" +
    " join bikes b on b.id = r.bike_id join routes rt on rt.id = r.route_id" +
    " where r.ride_date > curdate() - interval 1 month order by ride_date desc";
  let qresult = null;

  async function doQuery() {
    qresult = await doFetch($dbN, sql);
  }
</script>

<label>SQL</label>
<input bind:value={sql} />

<button type="button" on:click={doQuery}>Query</button>

<label>Result:</label>
<pre>
  {#if qresult}
    Rides
    <ul>
      {#each qresult as row}
        <li>
          {#each Object.values(row) as field}{field + ' '}{/each}
        </li>
      {/each}
    </ul>
  {/if}
</pre>

<style>
  input {
    width: 90%;
  }
  li {
    list-style: none;
  }
</style>
