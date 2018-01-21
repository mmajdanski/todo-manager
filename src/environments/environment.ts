// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB3VJ65cwhcrW8zqDJrvld-9zUuVLwroQ4",
    authDomain: "todo-sharing.firebaseapp.com",
    databaseURL: "https://todo-sharing.firebaseio.com",
    projectId: "todo-sharing",
    storageBucket: "",
    messagingSenderId: "861896735025"
  }
};
