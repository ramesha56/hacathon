// // crud.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// import { getDatabase, ref, get, set, child, update, remove }
//   from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAm1-VHbDb8-s8UQ2_AZ4by-EJE7QWirUk",
//   authDomain: "hackaton-14afd.firebaseapp.com",
//   projectId: "hackaton-14afd",
//   storageBucket: "hackaton-14afd.appspot.com",
//   messagingSenderId: "379025562842",
//   appId: "1:379025562842:web:18697f72d072b86cc599e3",
//   measurementId: "G-BH4ZVP3CMP"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// let namebox = document.getElementById("namebox");
// let rollbox = document.getElementById("rollbox");
// let sectionbox = document.getElementById("sectionbox");
// let genbox = document.getElementById("genbox");

// let ins = document.getElementById("ins");
// let sel = document.getElementById("sel");
// let tableBody = document.getElementById("tableBody");

// function clearForm() {
//   namebox.value = '';
//   rollbox.value = '';
//   sectionbox.value = '';
//   genbox.value = 'male';
// }

// function insertData() {
//   if (rollbox.value === "") {
//     alert("Roll No is required!");
//     return;
//   }

//   set(ref(db, "Thestudents/" + rollbox.value), {
//     Nameofstd: namebox.value,
//     Rollbox: rollbox.value,
//     Section: sectionbox.value,
//     Gender: genbox.value
//   })
//     .then(() => {
//       alert("Data stored successfully");
//       clearForm();
//       fetchData();
//     })
//     .catch((error) => {
//       alert("Error: " + error);
//     });
// }

// function fetchData() {
//   const dbref = ref(db);
//   get(child(dbref, "Thestudents"))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         tableBody.innerHTML = "";

//         snapshot.forEach(childSnapshot => {
//           let data = childSnapshot.val();

//           let row = document.createElement('tr');
//           row.innerHTML = `
//             <td>${data.Nameofstd}</td>
//             <td>${data.Rollbox}</td>
//             <td>${data.Section}</td>
//             <td>${data.Gender}</td>
//             <td class="action-btns">
//               <button onclick="editData('${data.Rollbox}')">Edit</button>
//               <button onclick="deleteData('${data.Rollbox}')">Delete</button>
//             </td>
//           `;

//           tableBody.appendChild(row);
//         });

//       } else {
//         tableBody.innerHTML = "<tr><td colspan='5'>No data found</td></tr>";
//       }
//     })
//     .catch((error) => {
//       alert("Error: " + error);
//     });
// }

// window.editData = function (rollno) {
//   const dbref = ref(db, "Thestudents/" + rollno);
//   get(dbref)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         let data = snapshot.val();
//         namebox.value = data.Nameofstd;
//         rollbox.value = data.Rollbox;
//         sectionbox.value = data.Section;
//         genbox.value = data.Gender;
//       } else {
//         alert("No data found for edit");
//       }
//     })
//     .catch((error) => {
//       alert("Error: " + error);
//     });
// }

// window.deleteData = function (rollno) {
//   if (confirm("Are you sure you want to delete?")) {
//     remove(ref(db, "Thestudents/" + rollno))
//       .then(() => {
//         alert("Data deleted successfully");
//         fetchData();
//       })
//       .catch((error) => {
//         alert("Error: " + error);
//       });
//   }
// }

// ins.addEventListener('click', insertData);
// sel.addEventListener('click', fetchData);

// fetchData();
