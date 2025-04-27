// Initialize Firebase FIRST
firebase.initializeApp(firebaseConfig);

// Firestore access
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");
  const navLinks = document.getElementById("nav-links");
  const hamburger = document.getElementById("hamburger");
  const contactForm = document.getElementById("contactForm");

  function updateNavbar(user) {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    const sidebarLinks = document.getElementById("sidebar-links");

    if (user && navLinks) {
      const letter = user.email[0].toUpperCase();
      navLinks.innerHTML = `
      <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
      <li><a href="about.html"><i class="fas fa-info-circle"></i> About</a></li>
      <li><a href="crud.html"><i class="fas fa-cogs"></i> Crud</a></li>
      <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
      <li class="avatar" id="profileAvatar"> ${letter}</li>
    `;

      sidebar.style.display = "block"; 
      mainContent.classList.add("logged-in");

      sidebarLinks.innerHTML = `
  
  <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
  <li><a href="about.html"><i class="fas fa-info-circle"></i> About</a></li>
  <li><a href="crud.html"><i class="fas fa-cogs"></i> Crud</a></li>
  <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
   <li><a href="profile.html"><i class="fas fa-user"></i> Profile</a></li>
  
`;
      

      // Ensure the profile avatar is clickable and redirects to profile page
      setTimeout(() => {
        const avatar = document.getElementById("profileAvatar");
        if (avatar) {
          avatar.addEventListener("click", () => {
            window.location.href = "profile.html"; // Navigate to the profile page
          });
        }
      }, 100);

    } else {
      navLinks.innerHTML = `
        <li><button id="loginBtn">Login</button></li>
        <li><button id="signupBtn">Sign Up</button></li>
      `;

      sidebar.style.display = "none";
      mainContent.classList.remove("logged-in");

      setTimeout(() => {
        const loginBtn = document.getElementById("loginBtn");
        const signupBtn = document.getElementById("signupBtn");
        if (loginBtn) loginBtn.onclick = showLogin;
        if (signupBtn) signupBtn.onclick = showSignup;
      }, 100);
    }
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  function showLogin() {
    if (loginModal) {
      loginModal.style.display = "flex";
      if (signupModal) signupModal.style.display = "none";
    }
  }

  function showSignup() {
    if (signupModal) {
      signupModal.style.display = "flex";
      if (loginModal) loginModal.style.display = "none";
    }
  }

  if (document.getElementById("switchToSignup"))
    document.getElementById("switchToSignup").onclick = showSignup;

  if (document.getElementById("switchToLogin"))
    document.getElementById("switchToLogin").onclick = showLogin;

  // AUTH LISTENER
  firebase.auth().onAuthStateChanged((user) => {
    updateNavbar(user);

    if (contactForm) {
      if (user) {
        contactForm.style.display = "block";
        contactForm.addEventListener("submit", handleContactForm);
      } else {
        contactForm.style.display = "none";
      }
    }
  });

  function handleContactForm(e) {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    if (!user) {
      Swal.fire("Please log in", "You need to log in to send a message.", "warning");
      return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    db.collection("contacts").add({
      name,
      email,
      message,
      userId: user.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Swal.fire("Success", "Message sent successfully!", "success");
      contactForm.reset();
    })
    .catch((error) => {
      console.error("Error sending message: ", error);
      Swal.fire("Oops!", "Failed to send message.", "error");
    });
  }

  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        if (loginModal) loginModal.style.display = "none";
        Swal.fire("Login Successful!", "Welcome back!", "success").then(() => {
          window.location.reload();
        });
      })
      .catch(err => Swal.fire("Error", err.message, "error"));
    });
  }

  // SIGNUP
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const number = document.getElementById("signupNumber").value;
      const age = document.getElementById("signupAge").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
          return db.collection("users").doc(cred.user.uid).set({
            name, number, age, email
          });
        })
        .then(() => {
          Swal.fire("Signup Successful!", "Please log in.", "success").then(() => {
            if (signupModal) signupModal.style.display = "none";
            if (loginModal) loginModal.style.display = "flex";
          });
        })
        .catch(err => Swal.fire("Error", err.message, "error"));
    });
  }

  // GOOGLE SIGN-IN
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const googleLoginBtn = document.getElementById("googleLogin");
  const googleSignupBtn = document.getElementById("googleSignup");

  if (googleLoginBtn) googleLoginBtn.onclick = googleSignin;
  if (googleSignupBtn) googleSignupBtn.onclick = googleSignin;

  function googleSignin() {
    firebase.auth().signInWithPopup(googleProvider)
      .then(result => {
        const user = result.user;
        const userRef = db.collection("users").doc(user.uid);

        userRef.get().then(doc => {
          if (!doc.exists) {
            return userRef.set({
              name: user.displayName || "",
              email: user.email,
              number: "",
              age: ""
            });
          }
        });

        if (loginModal) loginModal.style.display = "none";
        if (signupModal) signupModal.style.display = "none";

        Swal.fire("Login Successful!", "Welcome!", "success").then(() => {
          window.location.reload();
        });
      })
      .catch(err => Swal.fire("Error", err.message, "error"));
  }

  // CLOSE BUTTONS
  if (document.getElementById("closeLogin"))
    document.getElementById("closeLogin").onclick = () => {
      loginModal.style.display = "none";
    };

  if (document.getElementById("closeSignup"))
    document.getElementById("closeSignup").onclick = () => {
      signupModal.style.display = "none";
    };
});

// PROFILE PAGE
if (window.location.pathname.includes("profile.html")) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userRef = db.collection("users").doc(user.uid);
      userRef.get().then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          document.getElementById("profileName").textContent = userData.name || "";
          document.getElementById("profileNumber").textContent = userData.number || "";
          document.getElementById("profileAge").textContent = userData.age || "";
          document.getElementById("profileEmail").textContent = userData.email || user.email;
        }
      }).catch(err => console.error("Error fetching profile data:", err));
    } else {
      window.location.href = "index.html";
    }
  });
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    firebase.auth().signOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been logged out successfully.",
          confirmButtonColor: "#d6af4c"
        }).then(() => {
          window.location.href = "index.html";
        });
      })
      .catch((error) => {
        console.error("Logout Error:", error);
        Swal.fire("Oops!", "Something went wrong while logging out.", "error");
      });
  });
}
