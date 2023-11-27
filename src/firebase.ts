import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMLGSGK9UnDhxSMAfL8zR_dImRdhBQO7I",
  authDomain: "excelupload-70361.firebaseapp.com",
  projectId: "excelupload-70361",
  storageBucket: "excelupload-70361.appspot.com",
  messagingSenderId: "200184321579",
  appId: "1:200184321579:web:be4db425efa6d081847c6e",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
