
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  // import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
  // import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
  

  // const firebaseConfig = {
  //     apiKey: "AIzaSyAm1-VHbDb8-s8UQ2_AZ4by-EJE7QWirUk",
  //     authDomain: "hackaton-14afd.firebaseapp.com",
  //     projectId: "hackaton-14afd",
  //     storageBucket: "hackaton-14afd.firebasestorage.app",
  //     messagingSenderId: "379025562842",
  //     appId: "1:379025562842:web:18697f72d072b86cc599e3",
  //     measurementId: "G-BH4ZVP3CMP"
  // };
  
 
  // const app = initializeApp(firebaseConfig);
  // const auth = getAuth(app);
  // const db = getFirestore(app);
  

  // export { auth, db };
  
  // firebase-config.js 


  



  const firebaseConfig = {
    apiKey: "AIzaSyAm1-VHbDb8-s8UQ2_AZ4by-EJE7QWirUk",
    authDomain: "hackaton-14afd.firebaseapp.com",
    projectId: "hackaton-14afd",
    storageBucket: "hackaton-14afd.firebasestorage.app",
    messagingSenderId: "379025562842",
    appId: "1:379025562842:web:18697f72d072b86cc599e3",
    measurementId: "G-BH4ZVP3CMP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
