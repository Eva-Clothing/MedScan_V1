// import * as firebase from 'firebase';
// To apply the default browser preference instead of explicitly setting it.



function onload(){
  firebase.auth().languageCode = 'it';
  firebase.auth().useDeviceLanguage();
  render();
}



function render() {

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  recaptchaVerifier.render();
  
}


function phoneAuth() {

  console.log("clicked");
  //get the number
  var number=document.getElementById('phonenumber_input').value;
  console.log(number);
  //phone number authentication function of firebase
  //it takes two parameter first one is number,,,second one is recaptcha
  firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
      //s is in lowercase
      window.confirmationResult=confirmationResult;
      coderesult=confirmationResult;
      console.log(coderesult);
      alert("Message sent");
  }).catch(function (error) {
      alert(error.message);
  });
}