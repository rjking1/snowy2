import LoginPage from "./LoginPage.svelte";
// import ListPage from "./ListPage.svelte";
import NotFound from "./NotFound.svelte";
// import QueryPage from "./QueryPage.svelte";
import Diagram from "./Diagram.svelte";
// import { wrap } from "svelte-spa-router/wrap";

export const routes = {
  // "/": Home,
  "/": LoginPage,
  // Exact path + parameter
  // "/article/:title": Article,
  // "/login": LoginPage,
  // "/list": ListPage,
  // "/query": QueryPage,
  "/diagram": Diagram,
  // Wildcard
  "*": NotFound,
};
