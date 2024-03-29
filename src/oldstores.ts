import { writable } from 'svelte/store';

// export const page = writable("login");
export const loggedIn = writable("false")
export const permissions = writable()
// export const views = writable("")

let db_local = localStorage.getItem('ridetracker_db')  // can also be test
export const dbName = writable(db_local || 'rides2')
dbName.subscribe((value) => localStorage.setItem('ridetracker_db', value))

export const dbN = writable("")  // the full name, ie art25..._test