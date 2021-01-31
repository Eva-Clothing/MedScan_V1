
        
  var db =firebase.firestore();


  var barcode_Entered = document.getElementById("barcode_input");
  var pin_Entered = document.getElementById("pin_input")
  
  function barcodeEntered(){

    // db.collection("test-patients").doc(barcode_Entered.value).get().then(function(doc) {
    //   if(doc.data().Pin == pin_Entered.value){
        sessionStorage.setItem("EnteredBarcode",barcode_Entered.value)
        console.log(localStorage.getItem("EnteredBarcode"));
    //   }else{
    //     console.log("errororororor");
    //   }
      

    // });
    
  }
  

  // ----------- HOMEPAGE ------------
  
  function onLoadPage(){

   var specimen_register = document.getElementById("specimen_register");

    //About Patient
    var name_span =document.getElementById("name-span");
    var height_span =document.getElementById("height-span");
    var weight_span =document.getElementById("weight-span");
    var age_span =document.getElementById("age-span");
    var gender_span =document.getElementById("gender-span");
    var blood_group_span =document.getElementById("blood-group-span");

    var alergies_span =document.getElementById("alergies-span");
    var PHCs_span =document.getElementById("PHCs-span");  

    // ABOUT SECTION
      // db.collection("test-patients").doc("5Nmk2CoADlLYOiHQWRt0").get().then(function(querySnapshot) {

        // const sfRef = db.collection('test-patients').doc('');
        // const collections = await sfRef.listCollections();
        // collections.forEach(collection => {
        //   console.log('Found subcollection with id:', collection.id);
        // });
      // db.collection("test-patients").doc((sessionStorage.getItem("EnteredBarcode"))).get().then(function(doc) {
    

      //   // console.log("appt reg : "+ doc.data().id);
      //   console.log("appt reg : "+ collection.data().id);

      // });

      // APPOINTMENT REGISTER
      db.collection("test-patients").doc(sessionStorage.getItem("EnteredBarcode")).get().then(function(doc) {

        name_span.innerText=doc.data().Full_Name;
        height_span.innerText=doc.data().Height;
        weight_span.innerText=doc.data().Weight;
        age_span.innerText=doc.data().Age ;
        gender_span.innerText=doc.data().Gender;
        blood_group_span.innerText=doc.data().Blood_Group;
        
        alergies_span.innerText=doc.data().Alergies;
        PHCs_span.innerText=doc.data().PHC;

      });
      
     

    db.collection("Specimens").where("UID","==", sessionStorage.getItem("EnteredBarcode")).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        
        //Defineing Card Tags

        const div =document.createElement('div');
        div.classList.add("specimen-card");
        
        const label1 =document.createElement('label');
        label1.appendChild(document.createTextNode("Name  : _" ));
        const label2 =document.createElement('label');
        label2.appendChild(document.createTextNode("Date  : _"));
        const label3 =document.createElement('label');
        label3.appendChild(document.createTextNode("Time  : _"));
        
        //Inserting Data Into Card

        const span1 =document.createElement('span');
        span1.appendChild(document.createTextNode(doc.data().Sample_Name));
        const span2 =document.createElement('span');
        span2.appendChild(document.createTextNode(doc.data().Date));
        const span3 =document.createElement('span');
        span3.appendChild(document.createTextNode(doc.data().Time));
        
        
       // Creating Card
        
        div.appendChild(label1);
        div.appendChild(span1);
        div.appendChild(document.createElement('br'));
        div.appendChild(label2);
        div.appendChild(span2);
        div.appendChild(document.createElement('br'));
        div.appendChild(label3);
        div.appendChild(span3);
        
        specimen_register.appendChild(div);
        
        
       
      });
    });
  }


// New Specimen Add 

function newSpecForm(){

  document.getElementById("new_spec_form").classList.toggle("hide");

}

function addSpecimen() {

  var new_spec_name = document.getElementById("new_spec_name");
  var new_spec_date = document.getElementById("new_spec_date");
  var new_spec_time = document.getElementById("new_spec_time");
  var error_msg     = document.getElementById("spec_form_errormssg");

  if(new_spec_name.value != "" && new_spec_date.value != "" && new_spec_time.value != "" ){

      db.collection("Specimens").doc().set({
        
        Sample_Name:new_spec_name.value,
        Date:  new_spec_date.value,
        Time: new_spec_time.value,
        UID: sessionStorage.getItem("EnteredBarcode")
        
      })
      
      .then(function() {
        console.log("Document successfully written!");
        location.reload();
        
      })
      .catch(function(error) {
        mssg_div.classList.add("error");
      });
    }else{
      error_msg.classList.add("hide");
      error_msg.classList.add("error");
      error_msg.innerText=" Pls Enter All Values";
    }
}


function toggle_accordian(){
  var visit_info = document.getElementById("visit-info");
  visit_info.classList.toggle("hide");
}