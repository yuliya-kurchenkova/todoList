import { Environment } from "./interface";

export const environment: Environment = {
  production: false,
  firebase: {
  apiKey: 'AIzaSyCSryZv6V6V6ztXyP6oBiwkNPbUd5SYsOY',
  authDomain: "todo-angular-d27e2.firebaseapp.com",
  projectId: "todo-angular-d27e2",
  storageBucket: "todo-angular-d27e2.appspot.com",
  messagingSenderId: "762241243387",
  appId: "1:762241243387:web:92588a6459d5079a16785e"
  }
};

export const authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`;
export const baseURL = 'https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/';
