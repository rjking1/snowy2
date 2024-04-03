import { writable } from 'svelte/store';

export const page = writable("login");
export const loggedIn = writable("false")
export const permissions = writable("")
export const society = writable("PyBase")
export const views = writable("")
export const emailDetails = writable("")
export const gOptions = writable({})

let db_local = localStorage.getItem('pybase_db_snowy')
export const dbName = writable(db_local || 'nem:py')
dbName.subscribe((value) => localStorage.setItem('pybase_db_snowy', value))

export const dbN = writable({})  // the full name, ie art25..._test

// export const store = writable({
//   dbN: {},
//   tenantDetail: {},
// });