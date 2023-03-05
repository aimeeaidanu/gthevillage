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
                linkElement.href = "mailto:"+link;
                linkElement.textContent = link;
                button.innerHTML = ""
                button.appendChild(linkElement)
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
                    if (questionnaireData[field]) {
                        var questionnairefield = document.getElementById(field + "1")
                        questionnairefield.value=questionnaireData[field]
                    }
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
                infoRef.get().then(infoSnapshot => {
                    document.getElementById("noMatches").innerHTML = ""
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
                    const userDescription = document.createElement("p");
                    userDescription.innerHTML = `<b>You both are:</b> ${socialData.commonInterests}`;
                    userInfo.appendChild(userTitle);
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
                        console.log("liked!")
                        const userEmail = user.email;
                      
                        const userDoc = await db.collection(`users/${matchEmail}/likes`).doc(userEmail).get();
                        if (userDoc.exists) {
                            console.log("sike")
                          return;
                        }
                      
                        const userLikesRef = db.collection(`users/${userEmail}/likes`);
                        await userLikesRef.doc(userEmail).set({ likedAt: new Date() });
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

function saveQuestionnaire(type) {
    var userName = document.getElementById("name").value;
    var username = document.getElementById("username").value;
    var gender = document.getElementById("gender").value;
    var highestDegree = document.getElementById("highestDegree").value;
    var location = document.getElementById("location").value;
    var nationality = document.getElementById("nationality").value;
    var workLocations = document.getElementById("workLocations").value;
    var workOrganizations = document.getElementById("workOrganizations").value;
    var roleOrganization = document.getElementById("roleOrganization").value;
    
    var typeOfJobs = document.querySelectorAll('input[name=typeoJob]:checked');
    var typeJobArray = Array.from(typeOfJobs).map(el => el.value);
    var typeOfJobValues = typeJobArray.join(',');
    
    var yearsInJob = document.getElementById("yearsInJob").value;
    
    var resourcesNeeded = document.querySelectorAll('input[name=resourcosNeeded]:checked')
    var resourcesNeedArray = Array.from(resourcesNeeded).map(el => el.value);
    var resourcesNeededValues = resourcesNeedArray.join(',');
    
    var needed = document.getElementById("needed").value;
    
    var resourcesProvided = document.querySelectorAll('input[name=resourcosProvided]:checked');
    var resourcesProvideArray = Array.from(resourcesProvided).map(el => el.value);
    var resourcesProvidedValues = resourcesProvideArray.join(',');
    
    var provided = document.getElementById("provided").value;
    var goals = document.getElementById("goals").value;
    var suggestions = document.getElementById("suggestions").value;

    // Save the questionnaire data to Firestore
    var db = firebase.firestore();
    db.collection("users").doc(userEmail1).set({
        name: userName,
        username: username,
        gender: gender,
        highestDegree: highestDegree,
        location: location,
        nationality: nationality,
        workLocations: workLocations,
        workOrganizations: workOrganizations,
        roleOrganization: roleOrganization,
        typeOfJob: typeOfJobValues,
        yearsInJob: yearsInJob,
        resourcesNeeded: resourcesNeededValues,
        needed: needed,
        resourcesProvided: resourcesProvidedValues,
        provided: provided,
        goals: goals,
        suggestions: suggestions,
    }).then(function(){
        showAlert("Account created successfully!", "success");
        delay(3000)
        window.location.reload()
    })
}

function retakeQuestionnaire(){
    document.getElementById("updateQuestionnaireForm").style.display="block";
    document.getElementById("mainQuestionnairePage").style.display="none"
    document.getElementById("questionnaireFormInfo").innerHTML="Retake your questionnaire form. <a href='#' onclick='seeQuestionnaire()'>View your information</a>"
}

function seeQuestionnaire(){
    document.getElementById("updateQuestionnaireForm").style.display="none";
    document.getElementById("mainQuestionnairePage").style.display="block"
    document.getElementById("questionnaireFormInfo").innerHTML="If you haven't taken the questionnaire or want to retake it, <a href='#' onclick='retakeQuestionnaire()'>click here</a>. Its important to keep your information updated for the most accurate matches"
}

function updateQuestionnaire() {
    var userName = document.getElementById("name1").value;
    var username = document.getElementById("username1").value;
    var gender = document.getElementById("gender1").value;
    var highestDegree = document.getElementById("highestDegree1").value;
    var location = document.getElementById("location1").value;
    var nationality = document.getElementById("nationality1").value;
    var workLocations = document.getElementById("workLocations1").value;
    var workOrganizations = document.getElementById("workOrganizations1").value;
    var roleOrganization = document.getElementById("roleOrganization1").value;
    
    var typeOfJobs = document.querySelectorAll('input[name=typeoJob]:checked');
    var typeJobArray = Array.from(typeOfJobs).map(el => el.value);
    var typeOfJobValues = typeJobArray.join(',');
    
    var yearsInJob = document.getElementById("yearsInJob1").value;
    
    var resourcesNeeded = document.querySelectorAll('input[name=resourcosNeeded]:checked')
    var resourcesNeedArray = Array.from(resourcesNeeded).map(el => el.value);
    var resourcesNeededValues = resourcesNeedArray.join(',');
    
    var needed = document.getElementById("needed1").value;
    
    var resourcesProvided = document.querySelectorAll('input[name=resourcosProvided]:checked');
    var resourcesProvideArray = Array.from(resourcesProvided).map(el => el.value);
    var resourcesProvidedValues = resourcesProvideArray.join(',');
    
    var provided = document.getElementById("provided1").value;
    var goals = document.getElementById("goals1").value;
    var suggestions = document.getElementById("suggestions1").value;

    // Save the questionnaire data to Firestore
    var db = firebase.firestore();
    db.collection("users").doc(userEmail1).set({
        name: userName,
        username: username,
        gender: gender,
        highestDegree: highestDegree,
        location: location,
        nationality: nationality,
        workLocations: workLocations,
        workOrganizations: workOrganizations,
        roleOrganization: roleOrganization,
        typeOfJob: typeOfJobValues,
        yearsInJob: yearsInJob,
        resourcesNeeded: resourcesNeededValues,
        needed: needed,
        resourcesProvided: resourcesProvidedValues,
        provided: provided,
        goals: goals,
        suggestions: suggestions,
    }).then(function(){
        showAlert("Account created successfully!", "success");
        delay(3000)
        window.location.reload()
    })
}

function logout() {
    firebase.auth().signOut();
    showAlert("Signed Out.", "warn")
}

// Get a reference to the Firestore database
var db = firebase.firestore();

function matchRequests() {
    console.log("match")

    const requestsRef = query(collectionGroup(db, 'requests'))
    const providingRef = query(collectionGroup(db, 'providings'))
    const matchesRef = query(collectionGroup(db, 'matches'))

    requestsRef.get().then((requestsSnapshot) => {
        providingRef.get().then((providingSnapshot) => {
            const requests = requestsSnapshot.docs.map(doc => doc.data());
            const providings = providingSnapshot.docs.map(doc => doc.data());
            console.log("reached")
            for (const request of requests) {
                const matches = [];

                for (const providing of providings) {
                    const matchValue = calculateMatchValue(request.requestText, providing.provideText);
                    if (matchValue > 0.343) {
                        console.log("MatchValue Maxed")
                        db.collection('matches')
                        .doc(request.userEmail + request.requestText + providing.userEmail + providing.provideText)
                        .set(
                            {
                            requesterEmail: request.userEmail,
                            requestText: request.requestText,
                            providerEmail: providing.userEmail,
                            provideText: providing.provideText,
                            matchValue: matchValue,
                            },
                            { merge: true }
                        )
                        .then((docRef) => {
                            console.log('Request submitted successfully dawg!');
                        })
                        .catch((error) => {
                            console.error('Error submitting request: ' + error, "error");
                        });
                        console.log("setting")
                    }
                }
            }
        });
    });
}

function calculateMatchValue(string1, string2) {
    const match = stringSimilarity.compareTwoStrings(
        string1,
        string2
    );
    return match;
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
}