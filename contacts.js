//generate unique Id for each contact
function uniqueNumber() {
    var date = Date.now();
    
    if (date <= uniqueNumber.previous) {
        date = ++uniqueNumber.previous;
    } else {
        uniqueNumber.previous = date;
    }

    return date;
}

uniqueNumber.previous = 0;

function ID(){
  return uniqueNumber();
}



//function to toggle hide
function add() {

    var x = document.getElementById("div1");
    var y = document.getElementById("div2");
    if (x.style.display == "none") {
        x.style.display = "block";
        y.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "block";
    }

    emptyList();
}


//function to turn off Save Changes
function offSaveChanges(){
    var x = document.getElementById("save");
    var y = document.getElementById("saveChanges");
    x.style.display = "inline";
    y.style.display = "none";
    }

//form validation
function formValidation(){
    var name, phone, mail, identifier;
    name = document.getElementById("name").value;
    phone = document.getElementById("number").value;
    mail = document.getElementById("email").value;
    identifier = ID();
 
    if (!name|| !phone){
        return false;
    }
}


    // function to get values
function getValues(){
    var name, phone, mail, identifier;
    name = document.getElementById("name").value;
    phone = document.getElementById("number").value;
    mail = document.getElementById("email").value;
    identifier = ID();

    //save values as an objcet  
    var values = {
            name: name,
            phoneNumber: phone,
            E_mail: mail,
            uniqueID: identifier
    };

   //save values to local storage
    if (localStorage.getItem("contacts") === null){
        // create an array
        var contacts = [];
        // add to the array
        contacts.push(values);
        // set to local storage
        localStorage.setItem("contacts", JSON.stringify(contacts));
    } else{
        // get contacts from local storage
        var contacts = JSON.parse(localStorage.getItem("contacts"));
        // add contacts to the array
        contacts.push(values);
        //Re-set back to local storage
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }
        
    //call fetch contacts
    fetchContacts();
}


//Fetch contacts to output
function fetchContacts(){

    // get contacts from local storage
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    // get output id
    var contactsResults = document.getElementById("outputs");

    //Build output
    contactsResults.innerHTML = "";
    for (var cont of contacts){
        var name = cont.name;
        var phoneNumber = cont.phoneNumber;
        var E_mail = cont.E_mail;
        var uniqueID = cont.uniqueID;

        contactsResults.innerHTML += ` <div id="contactsResults" class="contactsResults">
                                        <h2> ${name} </h2>
                                        <p class = "buttonParagraph"> Phone: ${phoneNumber}  </p> 
                                        <button onclick = "deleteContact(${uniqueID}); emptyList();"id="delete" class="delete">Delete</button> 
                                        <p class = "buttonParagraph"> Email: <i> ${E_mail}</i></p> 
                                        <button onclick = "editContact(${uniqueID})" id="edit" class="edit">Edit</button>
                                    </div>
                                    <br>
                                    `;
        
    }
    emptyList();
}


//function to delete contact
function deleteContact (uniqueID){
    // get contacts from local storage
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    //Loop through the array
    for (var cont of contacts){
        if (cont.uniqueID == uniqueID){
            //get index of cont
            var i = contacts.indexOf(cont);
            //remove from array
            contacts.splice(i, 1);
            break;   
        }
    }

    //Re-set back to local storage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    fetchContacts();
}




//function to edit contacts
function editContact (uniqueID){
    //toggle to turn on Save Changes
    var x = document.getElementById("save");
    var y = document.getElementById("saveChanges");
    x.style.display = "none";
    y.style.display = "inline";
   

    // get contacts from local storage
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    //Loop through the array
    var contIndex;
    for (var cont of contacts){
        if (cont.uniqueID == uniqueID){
            //get index of cont
            contIndex = contacts.indexOf(cont);
                   
            //set the form values to current value
            document.getElementById("name").value = cont.name;
            document.getElementById("number").value = cont.phoneNumber;
            document.getElementById("email").value = cont.E_mail;
            break;
        
        }
    }
     //toggle the add
     add();
     
    myArray = [contIndex, contacts];
    return myArray;
}



//toggle empty contacts div
function emptyList(){
    var x = document.getElementById("empty");
    var y = document.getElementById("outputs");
    if (y.innerHTML === "") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


function cancel(){
    add();
    //toggle empty contacts div
}


function save(){

    //form validation
    if (formValidation() == false){
        alert("Please enter contact details");
        return false;
    }

    getValues();
    add();
        
}

function saveChanges(){
    
    //form validation
    if (formValidation() == false){
        alert("Please enter contact details");
        return false;
    }

    var index = myArray[0];
    var contactList = myArray[1];
    contactList.splice(index, 1);
          
    //Re-set back to local storage
    localStorage.setItem("contacts", JSON.stringify(contactList));
    
    save();
        
    
}










window.addEventListener("DOMContentLoaded", function() {
    myArray = [];
  
    // add event listener to image
        document.getElementById("pix").addEventListener("click", function(){
            add();
            document.getElementById("myForm").reset();
        });

    // add event listener to cancel
        document.getElementById("cancel").addEventListener("click", cancel);

    //add event listener to save
        document.getElementById("save").addEventListener("click", save);

    // add event listener to save changes
        document.getElementById("saveChanges").addEventListener("click", saveChanges);
    
        





}, false);