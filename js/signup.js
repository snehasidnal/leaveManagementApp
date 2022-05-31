function login()
{
	var emails = document.getElementById("email").value;
	var passor = document.getElementById("password").value;
	var name=document.getElementById("name").value;
	var faculty=document.getElementById("faculty").value;
	
	firebase.auth().createUserWithEmailAndPassword(emails, passor)
  .then((userCredential) => {
    
    var user = userCredential.user;
	var id=firebase.auth().currentUser.uid;

    if (firebase.auth().currentUser != null) {
        firebase.auth().currentUser.updateProfile({
            displayName: name,
            email:emails
        }).then(function () {
            console.log("Updated");
            firebase.database().ref('student/'+id).set({
                UserName:name,
                EmailId:emails,
                Faculty:faculty,
                AccountValidation: "NotApproved"
                });
        }, function (error) {
            console.log("Error happened");
        });
    }
	// firebase.database().ref('student/'+id).set({
	// UserName:name,
	// EmailId:emails,
    // Faculty:faculty,
	// AccountValidation: "NotApproved"
	// });
    window.alert("user created");
   
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	// Email sent.
		window.alert("verification mail is sent to your mail");
		window.location.href= "Login.html";
	}).catch(function(error) {
	// An error happened.
    window.alert("error");
	});
	
	
	
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    
  });
	
   
}