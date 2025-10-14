import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCrZ0kWRgKnteuH6DLMXYdzmCmaNOg4fK8",
  authDomain: "paginabonita-9fb3f.firebaseapp.com",
  projectId: "paginabonita-9fb3f",
  storageBucket: "paginabonita-9fb3f.firebasestorage.app",
  messagingSenderId: "36877418303",
  appId: "1:36877418303:web:80b1bde41c01b9cbcd9d8a",
  measurementId: "G-69E5YX00VP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics, app };
