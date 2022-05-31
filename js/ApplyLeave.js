const inputs = document.querySelectorAll(".input");
const form = document.querySelector("form");
// const [firstname, lastname, email, phone, city, country, linkedln, website] = inputs;
// const cvLabel = document.querySelector('cv-label');
// const file = document.querySelector('input[type="file"]');
const file = document.querySelector("#cv");
const checkbox = document.querySelector('input[type="checkbox"]');

for (let input of inputs) {
  let parent = input.parentElement;
  let label = parent.querySelector("label");
  label.className = "label";
  label.style.color = "black";
  label.style.visibility = "visible";

  input.addEventListener("focus", () => {
    let parent = input.parentElement;
    let label = parent.querySelector("label");
    label.className = "label focus";
    label.style.color = "#00dd5c";
    label.style.visibility = "visible";
  });

  input.addEventListener("blur", () => {
    let parent = input.parentElement;
    let label = parent.querySelector("label");
    label.className = "label";
    label.style.color = "black";
    label.style.visibility = "visible";
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  // var styleCss = document.getElementById('#container').style;
  // document.getElementById('#container').style.position = "fixed";
  // styleCss.display= none;
  // styleCss.width= "100%";
  // styleCss.height= "100%";
  // styleCss.top= 0;
  // styleCss.left= 0;
  // styleCss.right= 0;
  // styleCss.bottom= 0;
  // styleCss.backgroundColor = rgba(0,0,0,0.5);
  // styleCss.zIndex= 2;
  // styleCss.cursor= pointer;
  // document.head.appendChild(style);
});

function validateInputs() {
  for (let input of inputs) {
    if (input.name !== "website") {
      if (input.value.trim() === "") showError(input, "This field is required");
      else {
        showSuccess(input);
      }
    }
  }

  if (file.value === "") showError(file, "No file selected");
  else {
    showSuccess(file);
    if (!checkbox.checked) showError(checkbox, "Do you agree?");
    else {
      showSuccess(checkbox);
      var leaveType = document.getElementById("leaveType").value;
      var fromDate = document.getElementById("fromDate").value;
      var toDate = document.getElementById("toDate").value;
      var reason = document.getElementById("reason").value;
      var fileDoc = document.getElementById("cv").files[0];
      var approvalFacultyName= document.getElementById("approvalFaculty").value.split(",")[0];
      var approvalFacultyMAilId= document.getElementById("approvalFaculty").value.split(",")[1];
      console.log(approvalFacultyName);
      console.log(approvalFacultyMAilId);
      // window.open("https://codepen.io/i_amsuperfly/pen/MWrEjar", '_self');
      // window.alert(
      //   "leave type: " +
      //     leaveType +
      //     " from date: " +
      //     fromDate +
      //     " to date: " +
      //     toDate +
      //     " reason: " +
      //     reason +
      //     " cv: " +
      //     cv
      // );
      saveLeaveApplication(leaveType,fromDate,toDate,reason,fileDoc,approvalFacultyName,approvalFacultyMAilId);
      form.reset();
    }
  }
}

function showError(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector("small");
  errorMessage.innerText = message;
  formControl.className = "form-control text error";
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control text";
}

function saveLeaveApplication(leaveType,fromDate,toDate,reason,fileDoc,approvalFacultyName,approvalFacultyMAilId){
 

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    console.log(user.uid);
    // console.log(user.displayName);
    var leaveDocUrl;
    const ref=firebase.storage().ref('leaveDoc');
    // document.getElementById("cv").files[0];
      const name=(+new Date())+"-"+user.displayName;
      const metadata={
          contentType:fileDoc.type
      };
  
      const task=ref.child(name).put(fileDoc,metadata);
      task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then (url =>{
       
          console.log(url);
          leaveDocUrl=url;
          
          firebase.database().ref('leave/'+user.uid).set({
            Name:user.displayName,
            LeaveType:leaveType,
            FromDate:fromDate,
            ToDate:toDate,
            Reason:reason,
            LeaveDoc:leaveDocUrl,
            approval:{
              ApprovalFaculty:approvalFacultyName,
              ApprovalId:approvalFacultyMAilId,
              ApprovedByFaculty: false
            }
            
          }).then(
           
            );
            sendMail(user.displayName, leaveType, fromDate, toDate, reason, leaveDocUrl,approvalFacultyName,approvalFacultyMAilId)
            
  });
   
  } else {
    // User not logged in or has just logged out.
    window.alert("logedout");
  }
});
	
}
function sendMail(displayName, leaveType, fromDate, toDate, reason, leaveDocUrl,approvalFacultyName,approvalFacultyMAilId){
  console.log("send mail functiomn");



    var templateParams = {
      faculty_id: approvalFacultyMAilId,
        to_name: approvalFacultyName,
      from_name: displayName,
      message: reason,
      leave_type: leaveType,
      from_date: fromDate,
      to_date: toDate,
      doc_url: leaveDocUrl
      
    };

    emailjs
      .send("service_it6zytf", "template_cvytyar", templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          window.alert("success");
        },
        function (error) {
          console.log("FAILED...", error);
          window.alert("error");
        }
      );
        
}







