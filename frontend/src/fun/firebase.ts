import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC47pZuHTxZevQXzRIvtuaeswFHlSIKMTI",
  authDomain: "cat-meme-gen.firebaseapp.com",
  projectId: "cat-meme-gen",
  storageBucket: "cat-meme-gen.appspot.com",
  messagingSenderId: "422599653121",
  appId: "1:422599653121:web:533386651ea9e039fd0d00"
};

const app = initializeApp(firebaseConfig);
// storage
export const Storage = getStorage(app);

