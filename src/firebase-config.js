import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDE0-1FZHMlOOJDFGm4bRxLjrPIrHKkJs8",
    authDomain: "chatapp-c713c.firebaseapp.com",
    projectId: "chatapp-c713c",
    storageBucket: "chatapp-c713c.appspot.com",
    messagingSenderId: "840216965806",
    appId: "1:840216965806:web:b8c626199059b3b6fdf33f"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();
  export const db = getFirestore(app);