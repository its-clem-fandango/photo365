import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyVo9vIemKRDVClsxiuo_7hj-0vdlzDcw",
  authDomain: "donewithit-912b6.firebaseapp.com",
  projectId: "donewithit-912b6",
  storageBucket: "donewithit-912b6.appspot.com",
  messagingSenderId: "804995097809",
  appId: "1:804995097809:web:14982d042e4272cc9451f0",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
