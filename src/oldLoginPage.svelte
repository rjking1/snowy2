<script lang="ts">
  import { doFetch } from "./common";
  // import { gotoPage } from "./pageStack.js";
  import Router, { link, push } from "svelte-spa-router";
  import {
    // society,
    // page,
    dbName,
    dbN,
    loggedIn,
    permissions,
    // views,
  } from "./stores";
  import { Input, Button } from "flowbite-svelte";

  const db_base = "art25285_";
  let username = "";
  let password = "";
  let qresult;

  async function doLogin() {
    $dbName = $dbName.toLowerCase();

    qresult = await doFetch(
      db_base + $dbName,
      "select u.id, u.user_name, def_capab, exceptions from py_roles r join py_users u on r.id=u.role_id where upper(u.user_name)='" +
        username.toUpperCase() +
        "' and u.password='" +
        password +
        "'"
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
      };
      $dbN = db_base + $dbName;
      console.log($dbN);
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

      // $page = "list";

      push("/diagram");
    }
  }
</script>

<main>
  <div class="w-full max-w-xs">
    <form on:submit|preventDefault={doLogin}>
      <div class="m-4">
        <label class="block text-gray-700 text-sm font-bold" for="db"
          >Database</label
        >
        <Input id="db" bind:value={$dbName} required />

        <label class="block text-gray-700 text-sm font-bold" for="user"
          >User name</label
        >
        <Input id="user" bind:value={username} required />

        <label class="block text-gray-700 text-sm font-bold" for="password"
          >Password</label
        >
        <Input id="password" type="password" bind:value={password} required />
        <Button class="mt-4" id="login" type="submit">Login</Button>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs mt-4">
      &copy;2023 Viking Computer Services Pty Ltd.
    </p>
  </div>
</main>
