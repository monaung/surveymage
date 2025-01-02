import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCPq7PdRK_lIH34dINLw2fT47WlvVhpms",
  authDomain: "surveymage-a9236.firebaseapp.com",
  projectId: "surveymage-a9236",
  storageBucket: "surveymage-a9236.firebasestorage.app",
  messagingSenderId: "343384607891",
  appId: "1:343384607891:web:155c32cb788da4e3fe5166",
  measurementId: "G-440081QTJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
export default app; 