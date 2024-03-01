import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyAExkWHd6E097fdxEfT0tpqcuDviCGrpLA",
  authDomain: "prueba-api-17d83.firebaseapp.com",
  databaseURL: "https://prueba-api-17d83-default-rtdb.firebaseio.com",
  projectId: "prueba-api-17d83",
  storageBucket: "prueba-api-17d83.appspot.com",
  messagingSenderId: "599037367657",
  appId: "1:599037367657:web:4f6ee3454bb42ff0a559f8",
  measurementId: "G-V1569ZC8Z7"
};

export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const firebaseDatabase = getDatabase(app);