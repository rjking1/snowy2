<script lang="ts">
  import {
    doFetch,
    doInternalLogin,
    writeAuditText,
  } from "../../common/dbutils";
  // import { gotoPage } from "./pageStack.js";
  import Router, { link, push } from "svelte-spa-router";
  import {
    society,
    page,
    dbName,
    dbN,
    loggedIn,
    permissions,
    views,
  } from "./stores";
  import {
    ART7_DB_PREFIX,
    ART7_DSQL_URL,
    PYBASE_DB_PREFIX,
    PYBASE_DSQL_URL,
  } from "../../common/config.js";
  import md5 from "blueimp-md5";
  import { Button, Input, Label } from "flowbite-svelte";

  let server;
  let dbprefix;
  let username = "";
  let password = "";
  let token = "";
  let qresult;

  async function doLogin() {
    $dbName = $dbName.toLowerCase();
    let [db, server_abbrev] = $dbName.split(":"); // so for pybase, specify as nem:py
    console.log(db);
    console.log(server_abbrev);
    if (server_abbrev == "py") {
      server = PYBASE_DSQL_URL;
      dbprefix = PYBASE_DB_PREFIX;
    } else {
      server = ART7_DSQL_URL;
      dbprefix = ART7_DB_PREFIX;
    }

    // console.log("about to login..", username, password);
    qresult = await doInternalLogin({
      db: dbprefix + db,
      server: server,
      up: md5(username.toUpperCase() + md5(password) + "up"),
    });
    token = qresult[0]["token"];
    console.log("token=", token);

    qresult = await doFetch(
      { db: dbprefix + db, server: server, token: token },
      "select u.id, u.user_name, def_capab, exceptions from py_roles r join py_users u on r.id=u.role_id where upper(u.user_name)='" +
        username.toUpperCase() +
        "' and (u.password='" +
        md5(password) +
        "' or u.password='" +
        password +
        "')"
    );
    if (qresult.length == 0) {
      alert("Invalid user name or password");
    } else if ("error" in qresult[0]) {
      alert("Error accessing database");
    } else {
      $permissions = {
        u_id: qresult[0]["id"],
        u_name: qresult[0]["user_name"],
        cap: qresult[0]["def_capab"],
        ex: qresult[0]["exceptions"],
        token: token,
      };
      $dbN = { db: dbprefix + db, server: server, token: token };
      $loggedIn = "true";

      // qresult = await doFetch(
      //   $dbN,
      //   "select val from py_named_values where id like 'sys.society.%' order by id"
      // );
      // $society = qresult[0]["val"];
      // $permissions["tables_prefix"] = qresult[1]["val"] // for the future and need to add to all databases

      console.log($permissions);

      // $views = await doFetch(
      //   $dbN,
      //   "select id, name, formDesc, to_view, get_sql, put_sql, fields, subviews, audit_template from py_views"
      // ); //  where name not like 'py_%'
      // console.log($views);

      // writeAuditText(
      //   $dbN,
      //   $permissions.u_id,
      //   $permissions.u_name,
      //   $permissions.u_name + " logged in"
      // );

      // $page = gotoPage("index", "index");
      push("/diagram");
      // $page = "diagram";
    }
  }
</script>

<main>
  <!-- <form on:submit|preventDefault={doLogin}> -->
    <Label class="mt-4 items-center">
      Database <Input class="me-4 font-bold" bind:value={$dbName} required />
    </Label>
    <Label class="mt-4 items-center">
      User name <Input class="me-4 font-bold" bind:value={username} required />
    </Label>
    <Label class="mt-4 items-center">
      Password <Input type="password" class="me-4 font-bold" bind:value={password} required />
    </Label>

    <Button on:click={doLogin}>Login</Button>
  <!-- </form> -->
</main>

<style>
  input {
    width: 200px;
  }
</style>
