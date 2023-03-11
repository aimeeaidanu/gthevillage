// Initialize Firebase
var config = {
    apiKey: "AIzaSyA3SNRvY3trUraaaq1r3p8htPxDtjKG2Y8",
    authDomain: "forms-24dc7.firebaseapp.com",
    databaseURL: "https://forms-24dc7-default-rtdb.firebaseio.com/",
    projectId: "forms-24dc7",
    storageBucket: "forms-24dc7.appspot.com",
    messagingSenderId: "978312569479",
};
firebase.initializeApp(config);
var firestore = firebase.firestore();
// Define the functions to be called for each hash
var hashFunctions = {
    '#matches': goToMatches,
    '#profile': goToProfile,
    '#questionnaire': goToQuestionnaire,
    '#contact': goToContact,
    '#faq': goToFAQ
}
  
  // Check if the current hash matches one of the functions and call it
function checkHash() {
    var hash = window.location.hash;
    if (hashFunctions[hash]) {
        hashFunctions[hash]();
    }
}

// Call checkHash on page load
window.addEventListener('load', checkHash);

// Call checkHash on hash change
window.addEventListener('hashchange', checkHash);
  
showOverlay();
console.log("%cHey there, be careful! Don't run any untrustworthy scripts!",'color:red; font-size: 24px; font-weight: bold;' )
var delay = ms => new Promise(res => setTimeout(res, ms));
firebase.auth().onAuthStateChanged(async function (user) {
    hideOverlay();
    if (user){
        userId = user.uid
        userEmail = user.email;
        userEmail1 = user.email;
        document.getElementById("welcome-section").style.display = "none";
        document.getElementById("create-section").style.display = "none";
        if(document.getElementById("limbo-state").style.display == "none"){
            document.getElementById("user-section").style.display = "block";
        } else {
            document.getElementById("user-section").style.display = "none";
        }

        if (document.getElementById("user-section").style.display = 'block'){
            document.getElementById("slogan").innerHTML = ''
        }
        
        var db = firebase.firestore()
    
        db.collection("users").doc(user.email).get().then(function(doc) {
            if (doc.exists) {
                var name = doc.data().name;
                currentUserName = doc.data().name;
                var username = doc.data().username;
                document.getElementById("userName").innerHTML = name;
                document.getElementById("userUsername").innerHTML = username;
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        // Get all of the social networks for this user and display the links if they exist
        var socialNetworksRef = db.collection("users").doc(user.email).collection("socialNetworks");
        socialNetworksRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var networkName = doc.id;
                var link = doc.data().link;
                var button = document.getElementById(networkName);
                button.onclick = null;
                button.classList.remove('user-profile-button')
                var linkElement = document.createElement("a");
                linkElement.href = link;
                linkElement.textContent = link;
                button.innerHTML = ""
                button.appendChild(linkElement)
                // Add an edit button next to the social network link
                var editButton = document.createElement("button");
                editButton.classList.add('user-profile-button');
                editButton.innerHTML = '<i class="fas fa-edit"></i>';
                editButton.onclick = function() {
                    var newLink = prompt("Enter the new link for " + networkName);
                    if (newLink) {
                        doc.ref.update({ link: newLink })
                            .then(function() {
                                linkElement.href = newLink;
                                linkElement.textContent = newLink;
                            })
                            .catch(function(error) {
                                console.error("Error updating social network link: ", error);
                            });
                    }
                };
                button.appendChild(editButton);
            });
        }).catch(function(error) {
            console.error("Error getting social networks: ", error);
        });
        document.getElementById("userEmail").innerHTML = user.email;

        // Retrieve user questionnaire information from Firestore
        var db = firebase.firestore();
        db.collection("users").doc(userEmail1).get().then(function(doc) {
            if (doc.exists) {
                // Get the user questionnaire data
                var questionnaireData = doc.data();

                // Iterate over the questionnaire data and create list items for each field with its value
                for (var field in questionnaireData) {
                    // Check if the field has a value
                    if(!document.getElementById(field + "1")){
                        console.log(`%c${field}`, 'color:red')
                        continue
                    }
                    if (field == "typeOfJob" || 
                        field == "trainingTypeReceive" || field=="trainingTypeReceiveDegreeProgram" || field == "trainingTypeReceiveWriting" ||
                        field == "trainingTypeOffer" || field=="trainingTypeOfferDegreeProgram" || field=="trainingTypeOfferWriting" ||
                        field == "fundingTypeReceive" || field=="fundingTypeReceivePilotGrant" ||
                        field == "fundingTypeOffer" || field=="fundingTypeOfferPilotGrant" ||
                        field == "mentorshipTypeReceive" || field=="mentorshipTypeReceiveCategory" || field=="mentorshipTypeReceiveDuration" ||
                        field == "mentorshipTypeOffer" || field=="mentorshipTypeOfferCategory" || field=="mentorshipTypeOfferDuration") {
                        var fieldsToSelect = questionnaireData[field].split(",");
                        
                        fieldsToSelect.forEach(function(item) {
                            if(field == "typeOfJob"){
                                var checkbox = document.getElementById("typeoJob" + item + "1");
                            }else if(field == "trainingTypeReceive" || field == "trainingTypeReceiveDegreeProgram" || field == "trainingTypeReceiveWriting"){
                                var checkbox = document.getElementById("trainingReceive"+item+"1" || field=="trainingTypeOfferWriting")
                                if(checkbox == document.getElementById("trainingReceivedegreeProgram1")){
                                    document.getElementById("trainingTypeReceiveDegreeProgram1").style.display='block';
                                }else if(checkbox == document.getElementById("trainingReceivewriting1")){
                                    document.getElementById("trainingTypeReceiveWriting1").style.display='block'
                                }
                            }else if(field == "trainingTypeOffer" || field=="trainingTypeOfferDegreeProgram" || field=="trainingTypeOfferWriting"){
                                var checkbox = document.getElementById("trainingOffer"+item+"1")
                                if(checkbox == document.getElementById("trainingOfferdegreeProgram1")){
                                    document.getElementById("trainingTypeOfferDegreeProgram1").style.display='block';
                                }else if(checkbox == document.getElementById("trainingOfferwriting1")){
                                    document.getElementById("trainingTypeOfferWriting1").style.display='block'
                                }      
                            }else if(field == "fundingTypeReceive" || field=="fundingTypeReceivePilotGrant"){
                                var checkbox = document.getElementById("fundingReceive"+item+"1")
                                if(checkbox == document.getElementById("fundingReceivepilotGrant1")){
                                    document.getElementById("fundingTypeReceivePilotGrant1").style.display='block';
                                }
                            }else if(field == "fundingTypeOffer" || field=="fundingTypeOfferPilotGrant"){
                                var checkbox = document.getElementById("fundingOffer"+item+"1")
                                if(checkbox == document.getElementById("fundingOfferpilotGrant1")){
                                    document.getElementById("fundingTypeOfferPilotGrant1").style.display='block';
                                }
                            }else if(field == "mentorshipTypeReceive" || field=="mentorshipTypeReceiveCategory" || field=="mentorshipTypeReceiveDuration"){
                                var checkbox = document.getElementById("mentorshipReceive"+item+"1")
                            }else if(field == "mentorshipTypeOffer" || field=="mentorshipTypeOfferCategory" || field=="mentorshipTypeOfferDuration"){
                                var checkbox = document.getElementById("mentorshipOffer"+item+"1")
                            }
                            if (checkbox) {
                                checkbox.checked = true;
                            } else {
                                console.log("%cCheckbox not found: " + item,'color:red');
                            }
                        });
                    };
                    var questionnairefield = document.getElementById(field + "1");

                    questionnairefield.value = questionnaireData[field];
                }
            } else {
                console.log("No questionnaire data found for user " + userEmail1);
            }
        }).catch(function(error) {
            console.log("Error retrieving questionnaire data: ", error);
        });

        // Get the user's matches
        var matchesRef = firebase.firestore().collection(`users/${user.email}/matches`);
        matchesRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                var matchEmail = doc.get("email");
                // Get the social network data for the match
                var infoRef = firebase.firestore().collection('users').doc(matchEmail)
                const docRef = db.collection(`users/${user.email}/matches`).doc(matchEmail);
                infoRef.get().then(infoSnapshot => {
                    if(doc.data().passed == true){
                        return;
                    }
                    document.getElementById("noMatches").innerHTML = "Your Matches:"
                    const socialData = infoSnapshot.data();
                    // Create a new user item and append it to the user list
                    const userItem = document.createElement("div");
                    userItem.classList.add("user-item");
                    userItem.id = "user-item-" + socialData.name;
                    const userInfo = document.createElement("div");
                    userInfo.classList.add("user-info");
                    const userTitle = document.createElement("h3");
                    userTitle.textContent = socialData.name;
                    const userSubtitle = document.createElement("span");
                    userSubtitle.style.fontSize = "small";
                    userSubtitle.textContent = ` Location: ${socialData.location}`;
                    userTitle.appendChild(userSubtitle);
                    const likesRef = firestore.collection(`users/${matchEmail}/likes`);
                    const userLikeCount = document.createElement("h4")
                    likesRef.get().then((querySnapshot) => {
                        const numOfLikes = querySnapshot.size;
                        userLikeCount.innerHTML = `${numOfLikes} likes`;
                    }).catch((error) => {
                        console.error("Error getting likes collection: ", error);
                    });
                    
                    const userDescription = document.createElement("p");
                    userDescription.innerHTML = `<b>AI Analysis: </b>` + doc.data().similarities;;
                    userInfo.appendChild(userTitle);
                    userInfo.appendChild(userLikeCount)
                    userInfo.appendChild(userDescription);  
                    
                    const userButtons = document.createElement("div");
                    userButtons.classList.add("user-buttons");
                    const connectButton = document.createElement("button");
                    connectButton.id = "connect-button" + socialData.name;
                    connectButton.classList.add("connect-button");
                    connectButton.dataset.label = "Connect";
                    const connectIcon = document.createElement("i");
                    connectIcon.classList.add("fa", "fa-check");
                    connectIcon.style.color = "greenyellow";
                    connectButton.appendChild(connectIcon);
                    const emojisButton = document.createElement("button");
                    emojisButton.classList.add("emojis-button");
                    emojisButton.dataset.label = "Like";
                    emojisButton.textContent = "👍";
                    const passButton = document.createElement("button");
                    passButton.classList.add("pass-button");
                    passButton.id = "pass-button" + socialData.name
                    passButton.dataset.label = "Pass";
                    passButton.style.color = "red";
                    passButton.textContent = "X";
                    userButtons.appendChild(connectButton);
                    userButtons.appendChild(emojisButton);
                    userButtons.appendChild(passButton);
                    userItem.appendChild(userInfo);
                    userItem.appendChild(userButtons);
                    document.getElementById("user-list").appendChild(userItem);

                    // Get the social network data and display it in the user-connect div
                    const userConnectDiv = document.createElement('div');
                    userConnectDiv.classList.add('user-connect');
                    userConnectDiv.id = 'user-connect' + socialData.name;

                    const closeUserConnectDiv = document.createElement('div');
                    closeUserConnectDiv.classList.add('close-user-connect');
                    closeUserConnectDiv.id = 'close-user-connect' + socialData.name;
                    closeUserConnectDiv.textContent = 'X';

                    const h3Element = document.createElement('h3');
                    h3Element.textContent = 'Connect with ' + socialData.name;

                    const theirSocialsText = document.createElement('h3')
                    theirSocialsText.textContent = 'Their Socials: ';

                    const socialList = document.createElement('ul');
                    // Fetch each social network and add to social list
                    const socialRef = firebase.firestore().collection(`users/${matchEmail}/socialNetworks`);
                    socialRef.get().then((socialSnapshot) => {
                        socialSnapshot.docs.forEach((doc) => {
                            const data = doc.data();
                            const listItem = document.createElement('li');
                            listItem.textContent = data.link;
                            socialList.appendChild(listItem);
                        });
                    });

                    const aElement = document.createElement('a');
                    aElement.href = '#';
                    aElement.textContent = 'Share';

                    userConnectDiv.appendChild(closeUserConnectDiv);
                    userConnectDiv.appendChild(h3Element);
                    userConnectDiv.appendChild(theirSocialsText)
                    userConnectDiv.appendChild(socialList)
                    userConnectDiv.appendChild(aElement);

                    document.getElementById("extraFluff").appendChild(userConnectDiv)

                    connectButton.addEventListener('click', function(){
                        userConnectDiv.style.display='block'
                    });

                    closeUserConnectDiv.addEventListener('click', function(){
                        userConnectDiv.style.display='none'
                    })

                    // Add a click event listener to the emojis button
                    emojisButton.addEventListener("click", async () => {
                        const userEmail = user.email;
                      
                        const userDoc = await db.collection(`users/${matchEmail}/likes`).doc(userEmail).get();
                        if (userDoc.exists) {
                            showAlert("You've already liked " + matchEmail + "!", "warn")
                            return;
                        }
                      
                        const userLikesRef = db.collection(`users/${matchEmail}/likes`);
                        await userLikesRef.doc(userEmail).set({ likedAt: new Date() });
                        showAlert("Liked Profile", "success")
                    });

                    //pass method
                    const userPassDiv = document.createElement('div');
                    userPassDiv.className = "user-connect"
                    userPassDiv.id = "user-pass" + socialData.name;
                    userPassDiv.style.display = "none";
                    
                    const closeUserPassDiv = document.createElement('div');
                    closeUserPassDiv.className = "close-user-connect";
                    closeUserPassDiv.id = "close-user-pass" + socialData.name;
                    closeUserPassDiv.textContent = "X";

                    const h3 = document.createElement('h3');
                    h3.textContent = "Are you sure you want to pass " + socialData.name;

                    const passUserBtn = document.createElement('button');
                    passUserBtn.id = "passUser" + socialData.name;
                    passUserBtn.className = "passUser"
                    passUserBtn.textContent = "Pass";

                    passUserBtn.addEventListener('click', function(){
                        const userRef = db.collection('users').doc(user.email);
                        userRef.collection('matches').doc(matchEmail).set({
                          passed: true
                        }, { merge: true })
                        .then(() => {
                          showAlert('Match passed!');
                        }).then(()=>{
                            window.location.reload()
                        })
                        .catch((error) => {
                          console.error('Error passing match:', error);
                        });
                    })

                    userPassDiv.appendChild(closeUserPassDiv);
                    userPassDiv.appendChild(h3);
                    userPassDiv.appendChild(passUserBtn);
                    document.getElementById("extraFluff").appendChild(userPassDiv)
                    passButton.addEventListener('click', function(){
                        userPassDiv.style.display='block'
                    });

                    closeUserPassDiv.addEventListener('click', function(){
                        userPassDiv.style.display='none'
                    })
                });
            });
        });
        if(document.getElementById("limbo-state").style.display == "block"){
            document.getElementById("user-section").style.display = "none";
        }
    } else {
        if(document.getElementById("limbo-state").style.display == "block"){
            document.getElementById("welcome-section").style.display = "none"; 
        } else {
            document.getElementById("welcome-section").style.display = "block";
        }
        document.getElementById("create-section").style.display = "none";
        document.getElementById("user-section").style.display = "none";
    }
});

// Show the overlay and spinner
function showOverlay() {
    document.getElementById("overlay").style.display = "block";
}

// Hide the overlay and spinner
function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
}

function editQuestionnaireField(field){
    console.log(field)
}

document.getElementById("createAccountLink").addEventListener('click', function(){
    document.getElementById("welcome-section").style.display = "none"
    document.getElementById("create-section").style.display = "block"
})

document.getElementById("signInLink").addEventListener('click', function(){
    document.getElementById("welcome-section").style.display = "block"
    document.getElementById("create-section").style.display = "none"
})

function openNav() {
    if(document.getElementById("mySidenav").style.width != "250px"){
        document.getElementById("mySidenav").style.width = "250px";
    }else{
        closeNav()
    }
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function goToMatches(){
    document.getElementById("user-profile").style.display="none";
    document.getElementById("user-list").style.display="block";
    document.getElementById("user-contact").style.display="none";
    document.getElementById("user-questions").style.display="none";
    document.getElementById("user-questionnaire").style.display="none";
    document.getElementById("mySidenav").style.width = "0";
}
function goToProfile(){
    document.getElementById("user-profile").style.display="block";
    document.getElementById("user-list").style.display="none";
    document.getElementById("user-contact").style.display="none";
    document.getElementById("user-questions").style.display="none";
    document.getElementById("user-questionnaire").style.display="none";
    document.getElementById("mySidenav").style.width = "0";
}

function goToQuestionnaire(){
    document.getElementById("user-profile").style.display="none";
    document.getElementById("user-list").style.display="none";
    document.getElementById("user-contact").style.display="none";
    document.getElementById("user-questions").style.display="none";
    document.getElementById("user-questionnaire").style.display="block";
    document.getElementById("mySidenav").style.width = "0";
}
function goToContact(){
    document.getElementById("user-profile").style.display="none";
    document.getElementById("user-list").style.display="none";
    document.getElementById("user-contact").style.display="block";
    document.getElementById("user-questions").style.display="none";
    document.getElementById("user-questionnaire").style.display="none";
    document.getElementById("mySidenav").style.width = "0";
}

function goToFAQ(){
    document.getElementById("user-profile").style.display="none";
    document.getElementById("user-list").style.display="none";
    document.getElementById("user-contact").style.display="none";
    if(document.getElementById("user-questions").style.display=="block"){
        document.getElementById("user-questions").style.display="none";
        if(document.getElementById("welcome-section").style.display=="none" || document.getElementById("create-section").style.display=="none"){
            document.getElementById("welcome-section").style.display="block"
        }
    }else{
        document.getElementById("user-questions").style.display="block";
        if(document.getElementById("welcome-section").style.display=="block" || document.getElementById("create-section").style.display=="block"){
            document.getElementById("welcome-section").style.display="none"
            document.getElementById("create-section").style.display="none"
        }
    }
    document.getElementById("user-questionnaire").style.display="none";
    document.getElementById("mySidenav").style.width = "0";
}

var db = firebase.firestore();
// Get a reference to the "contact" collection
var contactRef = db.collection("contact");

// Get a reference to the form element and add a submit event listener
var submitContact = document.getElementById("submitContact");
submitContact.addEventListener("click", (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the form data
    const name = currentUserName;
    const email = userEmail;
    const message = document.getElementById("contactMessage").value;

    console.log(name,email,message)

    // Add a new document to the "contact" collection with the form data
    contactRef.doc(email).set({
        name: name,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        showAlert("Sent message!", "success");
        // Clear the form fields
        document.getElementById("contact").reset();
    })
    .catch((error) => {
        showAlert("Error adding document: " + error, "error");
    });
});

// Add event listeners to all "Add" buttons
var addButtons = document.getElementsByClassName("add-social-network");
for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function() {
        var networkName = this.getAttribute("data-network");
        addSocialNetwork(networkName);
    });
}

function showInput(socialNetwork) {
    var inputId = socialNetwork + "-input";
    var inputDiv = document.getElementById(inputId);
    if (inputDiv.style.display === "none") {
        inputDiv.style.display = "block";
    } else {
        inputDiv.style.display = "none";
    }
}

document.getElementById("userPassword").addEventListener('click', function(){
    var passwordChange = document.getElementById("password-change-form")
    if(passwordChange.style.display == "none"){
        passwordChange.style.display = "block";
    } else if(passwordChange.style.display == "block") {
        passwordChange.style.display = "none";
    } else {
        passwordChange.style.display = "block";
    }
})

var currentPasswordInput = document.getElementById("current-password");
var newPasswordInput = document.getElementById("new-password");
var submitPasswordChangeBtn = document.getElementById("submit-password-change");

submitPasswordChangeBtn.addEventListener("click", () => {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPasswordInput.value);

    user.reauthenticateWithCredential(credential)
    .then(() => {
        return user.updatePassword(newPasswordInput.value);
    }).then(() => {
        showAlert("Password updated successfully", "success");
    }).catch((error) => {
      showAlert(error.message, "error");
    });
});

// Function to add a social network to the user's profile
function addSocialNetwork(networkName) {
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var email = user.email;

    // Get the input element
    var input = document.getElementById(networkName + "-link");
    console.log(networkName + "Link")
    console.log("input" + input)

    // Check if input exists before accessing its value
    if (input) {
        var link = input.value;
        console.log("link" + link)
        var networkRef = db.collection("users").doc(email).collection("socialNetworks").doc(networkName);
        networkRef.set({ link: link }).then(function() {
            // Replace the input element with the link
            var linkElement = document.createElement("a");
            linkElement.href = link;
            linkElement.textContent = networkName;

            var paragraph = input.parentNode;
            paragraph.removeChild(input);
            paragraph.appendChild(linkElement);

            window.location.reload();
        }).catch(function(error) {
            console.error("Error adding social network: ", error);
        });
    }
}

function login(){
    console.log("Test")
    var userEmail = document.getElementById("emailBox").value;
    var userPass = document.getElementById("passwordBox").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        showAlert("Error" + errorCode + ": " + errorMessage, "error");
    });
    showAlert("Logged In.", "success")
}

// Sign up with Google
document.getElementById("signupAccountGoogle").addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        userEmail1 = result.user.email;
        document.getElementById("limbo-state").style.display = "block";
        document.getElementById("create-section").style.display = "none";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showAlert(errorCode + " " + errorMessage, "error");
    });
});

// Sign in with Google
document.getElementById("signinAccountGoogle").addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Signed in
        showAlert("Signed In", "success")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showAlert(errorCode + " " + errorMessage, "error");
    });
});

function createAccount() {
    userEmail1 = document.getElementById("createEmailBox").value;
    userPass1 = document.getElementById("createPasswordBox").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail1, userPass1).then(function(user) {
        document.getElementById("limbo-state").style.display = "block";
        document.getElementById("create-section").style.display = "none";
        showAlert("Account created!", "success");
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        showAlert("Error" + errorCode + ": " + errorMessage, "error");
    });
}

function logout() {
    firebase.auth().signOut();
    document.getElementById("mySidenav").style.width = "0"
    showAlert("Signed Out.", "warn")
}

async function matchUser(user){
    const userData = formatInput(getUserData(user))
    const snapshot = await db.collection('users').get();
    snapshot.forEach(doc => {
        if(doc.id === user){
            console.log("Hey, this is me!")
        } else {
            console.log(doc.id, '=>', doc.data());
            compareUsers(user,doc.id)
        }
    });
}

async function compareUsers(user1, user2) {
    // Get the user data from Firestore
    const user1Data = await getUserData(user1);
    const user2Data = await getUserData(user2);
  
    // Format the data as inputs to the GPT model
    const input1 = formatInput(user1Data);
    const input2 = formatInput(user2Data);
    
    // Call the OpenAI GPT endpoint to generate text comparing the two users
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // Replace with your OpenAI API key
        },
        body: JSON.stringify({
            prompt: `Compare user ${user1} to user ${user2}.\n\nUser ${user1}: ${input1}\n\nUser ${user2}: ${input2}\n\n`,
            temperature:0.5,
            max_tokens:256,
            top_p:1,
            frequency_penalty:0,
            presence_penalty:0
        })
    });
    // Parse the response and extract the generated text
    const responseJson = await response.json();
    const comparison = responseJson.choices[0].text.trim();
    const docRefPath = `users/${user1}/matches/${user2}/`;
    const docRefPath2 = `users/${user2}/matches/${user1}`;
    
    fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            prompt: `Similarity Analysis: ${comparison}\n\nDo these two users have enough similarities to be considered a match?\n\nYes or No:\n\n`,
            temperature:0.2,
            max_tokens:25,
            top_p:1,
            frequency_penalty:0,
            presence_penalty:0
        })
    })
    .then(response => response.json())
    .then(data => {
        var answer = data.choices[0].text.trim();
        console.log(comparison)
        console.log("Answer: " + answer);
        if(answer.toLowerCase().includes("yes")) {
            db.doc(docRefPath).set({
                email:user2,
                similarities:comparison
            }).then(() => {
                console.log(`%c${answer.split(" ")[0]}`, "color:green");
            }).catch((error) => {
                console.error(error);
            });
            db.doc(docRefPath2).set({
                email:user2,
                similarities:comparison
            }).catch((error) => {
                console.error(error)
            })
        } else {
            console.log(`%c${answer.split(" ")[0]}`, "color:red");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    return comparison;
}

// Helper function to get a user's data from Firestore
async function getUserData(user) {
    const doc = await db.collection('users').doc(user).get();
    return doc.data();
}

// Helper function to format user data as input to the GPT model
function formatInput(data) {
    let input = '';
    for (const key in data) {
        input += `${key}: ${data[key]}\n`;
    }
    return input;
}

function showAlert(text, type) {
    var alertDiv = document.getElementById('alertDiv');
    alertDiv.style.display = "block"
    alertDiv.style.position = "fixed";
    alertDiv.style.alignItems = "center";
    alertDiv.style.justifyContent = "center";

    var progressBar = document.getElementById('alertProgress');
    if(type == "error"){
        alertDiv.style.backgroundColor = "red"
        progressBar.style.backgroundColor = "darkred";
    }
    else if(type == "warn"){
        alertDiv.style.backgroundColor = "#F1FF33"
        progressBar.style.backgroundColor = "#FFEA33";
    }
    else {
        alertDiv.style.backgroundColor = "#93F218"
        progressBar.style.backgroundColor = "#51E018";
    }
    alertDiv.appendChild(progressBar);

    var textDiv = document.getElementById('alertDivText');
    textDiv.innerHTML = text;
    alertDiv.appendChild(textDiv);

    var width = 0;
    var id = setInterval(frame, 30);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            alertDiv.style.display = "none";
        } else {
            width++; 
            progressBar.style.width = width + '%'; 
        }
    }

    var startX;
    alertDiv.addEventListener('touchstart', function (e) {
        startX = e.changedTouches[0].pageX;
    });

    alertDiv.addEventListener('touchend', function (e) {
        var currentX = e.changedTouches[0].pageX;
        if (currentX < startX) {
        // User swiped left, dismiss alert
        alertDiv.style.display = "none";
        }
    });
}

/**
old prompt: User 1: " + JSON.stringify(input1) + "\n\nUser 2: " + JSON.stringify(input2) + "\n\n
async function compareUsers(user1, user2) {
    // Format the data as inputs to the GPT model
    const input1 = await formatInput(user1);
    const input2 = await formatInput(user2);

    // Call the OpenAI GPT endpoint to generate text comparing the two users
    const response1 = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            messages: [
                {"role": "system", "content": `You are comparing user ${user1} to user ${user2}`},
                {"role": "user", "content": input1},
                {"role": "user", "content": input2},
            ],
            max_tokens: 256,
            stop: '\n'
        })
    });
    const responseJson1 = await response1.json();
    const comparison = responseJson1.choices[0].text.trim();

    // Call the OpenAI GPT endpoint to ask if the two users are a match
    const response2 = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            messages: [
                {"role": "system", "content": `Do ${user1} and ${user2} have enough similarities to be considered a match?`},
                {"role": "user", "content": `User 1: ${input1}\nUser 2: ${input2}`},
                {"role": "assistant", "content": `Here is my analysis: ${comparison}`},
                {"role": "user", "content": `Is this a match? Yes or No?`},
            ],
            max_tokens: 256,
            stop: '\n',
            context: responseJson1.choices[0].context
        })
    });
    const responseJson2 = await response2.json();
    const match = responseJson2.choices[0].text.trim();

    console.log(`Comparison of ${user1} and ${user2}: ${comparison}`);
    console.log(`Are ${user1} and ${user2} a match? ${match}`);

    return comparison;
}
// Get a reference to the Firestore database
var db = firebase.firestore();

function matchRequests(user) {
    console.log("match");
    var openkey = "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";
    var db = firebase.firestore();

    db.collection("users").where("email", "==", user).get().then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
            var fields = querySnapshot.docs[0].data();
            var currentUserFieldString = "";
            for (var field in fields) {
                if (fields.hasOwnProperty(field)) {
                    currentUserFieldString += fields[field] + " ";
                }
            }
            db.collection("users").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.id !== user) {
                        var fields = doc.data();
                        var otherUserFieldString = "";
                        for (var field in fields) {
                            if (fields.hasOwnProperty(field)) {
                                otherUserFieldString += fields[field] + " ";
                            }
                        }
                        calculateMatch(currentUserFieldString, otherUserFieldString, openkey);
                    }
                });
            }).catch((error) => {
                console.log("Error getting documents:", error);
            });
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
*/
