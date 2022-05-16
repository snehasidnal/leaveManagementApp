function login() {
  var emails = document.getElementById("email").value;
  var passor = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(emails, passor)
    .then((userCredential) => {
      window.alert("signin successfull");
      console.log(userCredential.auth);
      window.load = "homepage.html";
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " : " + errorMessage);
      window.alert(errorCode + " : " + errorMessage);
    });
  // firebase.auth().onAuthStateChanged(function (user) {
  //   if (user) {
  //     // User is signed in.
  //     console.log(user.uid);
  //   } else {
  //     window.alert(
  //       "Your have not part of team please sign up and get approvel"
  //     );
  //   }
  // });
}
