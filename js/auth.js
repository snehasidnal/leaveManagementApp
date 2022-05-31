function login() {
  var emails = document.getElementById("email").value;
  var passor = document.getElementById("password").value;

  // var actionCodeSettings = {
  //   // URL you want to redirect back to. The domain (www.example.com) for this
  //   // URL must be in the authorized domains list in the Firebase Console.
  //   url: 'https://firebase.google.com/',
  //   // This must be true.
  //   handleCodeInApp: true,
  //   iOS: {
  //     bundleId: 'com.example.ios'
  //   },
  //   android: {
  //     packageName: 'com.example.android',
  //     installApp: true,
  //     minimumVersion: '12'
  //   },
  //   dynamicLinkDomain: 'example.page.link'
  // };

  // firebase.auth().sendSignInLinkToEmail(emails, actionCodeSettings)
  // .then(() => {
  //   // The link was successfully sent. Inform the user.
  //   // Save the email locally so you don't need to ask the user for it again
  //   // if they open the link on the same device.
  //   window.alert("sign in successfull");
  //   window.localStorage.setItem('emailForSignIn', emails);
  //   // ...
  // })
  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // ...
  // });

  firebase.auth().signInWithEmailAndPassword(emails, passor)
    .then((userCredential) => {
      window.alert("signin successfull");
      console.log(userCredential.auth);
      window.location.href = "students-portal-html/admin.html";
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " : " + errorMessage);
      window.alert(errorCode + " : " + errorMessage);
    });
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log(user.uid);
    } else {
      window.alert(
        "Your have not part of team please sign up and get approvel"
      );
    }
  });
}
