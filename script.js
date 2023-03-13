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
        if (user.email === "aidanchen@ghealthvillage.com" || user.email === "yap.boum2@gmail.com" || user.email === "jhaberer@mgh.harvard.edu") {
            document.getElementById("adminLink").style.display = "block";
        } else {
            document.getElementById("adminLink").style.display = "none";
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
            var displayPassUpdate = false
            querySnapshot.forEach(doc => {
                var matchEmail = doc.get("email");
                // Get the social network data for the match
                var infoRef = firebase.firestore().collection('users').doc(matchEmail)
                const docRef = db.collection(`users/${user.email}/matches`).doc(matchEmail);
                infoRef.get().then(infoSnapshot => {
                    if(doc.data().passed == true){
                        if(displayPassUpdate == false){
                            document.getElementById("nopassedusers").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Passed users:";
                            displayPassUpdate = true
                        }
                        const passedUserDivSeperator = document.createElement('hr')
                        passedUserDivSeperator.style.width = "90%";
                        document.getElementById("nopassedusers").appendChild(passedUserDivSeperator)
                        const pasedUserDiv = document.createElement('div')
                        pasedUserDiv.style.display="flex"
                        pasedUserDiv.style.flexDirection="row"
                        pasedUserDiv.style.alignItems = "center"; // Vertically center the content
                        pasedUserDiv.style.margin="0 !important;"
                        const pasedUserName = document.createElement('h3')
                        pasedUserName.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;" + infoSnapshot.data().name
                        const pasedUserRevoke = document.createElement('i')
                        pasedUserRevoke.classList.add('fas', 'fa-times');
                        pasedUserRevoke.style.marginLeft = "auto"
                        pasedUserRevoke.style.cursor="pointer"
                        pasedUserRevoke.style.paddingRight = "15px"
                        pasedUserRevoke.addEventListener('click', function(){
                            const userRef = db.collection('users').doc(user.email);
                            userRef.collection('matches').doc(matchEmail)
                              .update({
                                passed: firebase.firestore.FieldValue.delete()
                              })
                              .then(() => {
                                showAlert('Match passed!');
                              })
                              .then(() => {
                                window.location.reload();
                              })
                              .catch((error) => {
                                console.error('Error passing match:', error);
                              });
                          });
                          
                        pasedUserDiv.appendChild(pasedUserName)
                        pasedUserDiv.appendChild(pasedUserRevoke)
                        document.getElementById("nopassedusers").appendChild(pasedUserDiv)
                        return;
                    }
                    document.getElementById("noMatches").innerHTML = "<b>Your Matches:</b>"
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
                    const buttonsContainer = document.createElement('div');
                    buttonsContainer.className = "user-buttons"
                    buttonsContainer.style.display="flex";
                    buttonsContainer.style.flexDirection="row";
                    const likesRef = firestore.collection(`users/${matchEmail}/likes`);
                    console.log("matchemail" + matchEmail)
                    const userLikeCount = document.createElement("h4")
                    likesRef.get().then((querySnapshot) => {
                        const numOfLikes = querySnapshot.size;
                        userLikeCount.innerHTML = `${numOfLikes} likes`;
                    }).catch((error) => {
                        console.error("Error getting likes collection: ", error);
                    });
                    const connectButton = document.createElement("button");
                    connectButton.id = "connect-button" + socialData.name;
                    connectButton.className = "matchButtonList"
                    connectButton.dataset.label = "Connect";
                    const connectIcon = document.createElement("i");
                    connectIcon.classList.add("fa", "fa-check");
                    connectIcon.style.color = "greenyellow";
                    connectButton.appendChild(connectIcon);
                    const emojisButton = document.createElement("button");
                    emojisButton.className = "matchButtonList"
                    emojisButton.dataset.label = "Like";
                    emojisButton.textContent = "👍";
                    const messageButton = document.createElement("button");
                    messageButton.id = "message-button" + socialData.name;
                    messageButton.className = "matchButtonList"
                    messageButton.dataset.label = "message";
                    const messageIcon = document.createElement("i");
                    messageIcon.classList.add("fas", "fa-envelope");
                    messageIcon.style.color = "darkgray"
                    messageButton.appendChild(messageIcon);
                    // Add an onclick event listener to the message button
                    messageButton.addEventListener("click", function() {
                        // Create the chat box element
                        const chatBox = document.createElement("div");
                        chatBox.className = "chatBox";

                        // Create the chat box header element
                        const chatBoxHeader = document.createElement("div");
                        chatBoxHeader.className = "chatBoxHeader";

                        // Create the first h2 element for the chat box header
                        const chatBoxHeaderH2_1 = document.createElement("h2");
                        chatBoxHeaderH2_1.textContent = "Chat with " + socialData.name;
                        // Create the beta stage tag element
                        const betaTag = document.createElement("span");
                        betaTag.textContent = "beta";
                        betaTag.classList.add("beta-tag");

                        // Append the beta stage tag element to the header h2 element
                        chatBoxHeaderH2_1.appendChild(betaTag);
                        // Create the second h2 element for the chat box header
                        const chatBoxHeaderH2_2 = document.createElement("h2");
                        chatBoxHeaderH2_2.className = "closeChatBox";
                        chatBoxHeaderH2_2.innerHTML = "&times;";
                        chatBoxHeaderH2_2.addEventListener('click', function(){
                            chatBox.style.display="none";
                        })

                        const chatDisclamar = document.createElement("p")
                        chatDisclamar.style.color="gray"
                        chatDisclamar.innerHTML = "Data isn't encrypted in this beta stage so don't share confidential information. We take data privacy seriously and will never share/access your messages with third parties unless required by law or for security reasons."

                        // Add the two h2 elements to the chat box header
                        chatBoxHeader.appendChild(chatBoxHeaderH2_1);
                        chatBoxHeader.appendChild(chatBoxHeaderH2_2);
                        
                        // Get the messages subcollection for the current user and match
                        const messagesRef = firestore.collection(`users/${userEmail1}/matches/${matchEmail}/messages`);
                        const chatSection = document.createElement('div')
                        chatSection.id="chatSection"+matchEmail
                        chatSection.className="chatMessages"
                        // Listen for changes to the messages collection
                        messagesRef.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                            chatSection.innerHTML = ""
                            snapshot.forEach((doc) => {
                                if (doc.exists) {
                                    var message = doc.data();console.log("timestamp" + message.timestamp)
                                    var messageBox = document.createElement("div");
                                    messageBox.id = `${message.author}&${message.message}&${message.timestamp}`;
                                    messageBox.classList.add("messageBox");
                                    if (message.author === userEmail1) {
                                        messageBox.classList.add("me");
                                        messageBox.innerHTML = `
                                        <p>${message.message}</p>
                                        <span class="yourTime">${new Date(message.timestamp).toLocaleString()}</span>
                                        `;
                                    } else {
                                        messageBox.innerHTML = `
                                        <p>${message.message}</p>
                                        <span class="myTime">${new Date(message.timestamp).toLocaleString()}</span>
                                        `;
                                    }
                                    chatSection.appendChild(messageBox);
                                }
                            });
                        });
                          
                        // Create the send message div element
                        const sendMessageDiv = document.createElement("div");
                        sendMessageDiv.className = "sendMessageDiv";

                        // Create the input element for the send message div
                        const sendMessageInput = document.createElement("input");
                        sendMessageInput.type = "text";
                        sendMessageInput.placeholder = "message";

                        // Create the button element for the send message div
                        const sendMessageButton = document.createElement("button");
                        const sendMessageIcon = document.createElement("i");
                        sendMessageIcon.className = "fa fa-paper-plane";
                        sendMessageButton.appendChild(sendMessageIcon);
                        // Reference the messages collection for the current user and the match
                        const userMessagesRef = db.collection(`users/${userEmail1}/matches/${matchEmail}/messages/`);
                        const matchMessagesRef = db.collection(`users/${matchEmail}/matches/${userEmail1}/messages/`);

                        // Attach an event listener to the send message button
                        sendMessageButton.addEventListener("click", function() {
                            // Get the message text from the send message input
                            const messageText = sendMessageInput.value.trim();

                            // If the message text is not empty
                            if (messageText) {
                                // Get the current timestamp
                                const timestamp = firebase.firestore.FieldValue.serverTimestamp();

                                // Add the message to the Firestore database for both users
                                userMessagesRef.add({
                                    author: userEmail1,
                                    message: messageText,
                                    timestamp: timestamp
                                });
                                matchMessagesRef.add({
                                    author: userEmail1,
                                    message: messageText,
                                    timestamp: timestamp
                                });
                                // Clear the send message input
                                sendMessageInput.value = "";
                                console.log('hi')
                            }
                        });

                        // Add the input element and send message button to the send message div
                        sendMessageDiv.appendChild(sendMessageInput);
                        sendMessageDiv.appendChild(sendMessageButton);

                        // Add the chat box header, message boxes, and send message div to the chat box
                        chatBox.appendChild(chatBoxHeader);
                        chatBox.appendChild(chatDisclamar);
                        chatBox.appendChild(chatSection);
                        chatBox.appendChild(sendMessageDiv);
                        document.getElementById("extraFluff").appendChild(chatBox)
                    });
                    const passButton = document.createElement("button");
                    passButton.className = "matchButtonList"
                    passButton.id = "pass-button" + socialData.name
                    passButton.dataset.label = "Pass";
                    passButton.style.color = "red";
                    const passIcon = document.createElement("i");
                    passIcon.classList.add("fas", "fa-times");
                    passButton.appendChild(passIcon);
                    buttonsContainer.appendChild(userLikeCount)
                    buttonsContainer.appendChild(connectButton);
                    buttonsContainer.appendChild(messageButton)
                    buttonsContainer.appendChild(emojisButton);
                    buttonsContainer.appendChild(passButton);
                    const userDescription = document.createElement("p");
                    userDescription.innerHTML = `<b>AI Analysis: </b>` + doc.data().similarities;
                    userInfo.appendChild(userTitle);
                    userInfo.appendChild(buttonsContainer); 
                    userInfo.appendChild(userDescription); 
                    userItem.appendChild(userInfo);
                    document.getElementById("user-list").appendChild(userItem);

                    // Get the social network data and display it in the user-connect div
                    const userConnectDiv = document.createElement('div');
                    userConnectDiv.classList.add('user-connect');
                    userConnectDiv.id = 'user-connect' + socialData.name;
                    userConnectDiv.style.position = "fixed";

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
                    userPassDiv.style.position = "fixed";
                    
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
        // Get the reference to the contacts collection
        var contactsRef = firebase.firestore().collection("contact");

        // Listen for changes to the contacts collection
        contactsRef.onSnapshot((snapshot) => {
            // Clear the message list
            console.log("here")
            const messageList = document.getElementById("contact-message-list");
            messageList.innerHTML = "";

            // Loop through the contact documents
            snapshot.forEach((doc) => {
                // Get the data for the document
                const data = doc.data();

                // Create a new message element
                const messageElement = document.createElement("div");
                messageElement.className = "message";

                // Create elements for the message data
                const nameElement = document.createElement("div");
                nameElement.className = "message-name";
                nameElement.textContent = data.name + " (" + data.email + ")";

                const messageTextElement = document.createElement("div");
                messageTextElement.className = "message-text";
                messageTextElement.textContent = data.message;

                const timestampElement = document.createElement("div");
                timestampElement.className = "message-timestamp";
                timestampElement.textContent = data.timestamp;

                // Create buttons for the message element
                const replyButton = document.createElement("button");
                replyButton.className = "message-button";
                replyButton.innerHTML = '<i class="fas fa-reply"></i>';
                replyButton.addEventListener("click", () => {
                    window.location.href = `mailto:${data.email}`;
                });

                const dismissButton = document.createElement("button");
                dismissButton.className = "message-button";
                dismissButton.innerHTML = '<i class="fas fa-times"></i>';
                dismissButton.addEventListener("click", () => {
                    const deleteMessageRef = firebase.firestore().collection("contact").doc(data.email);
                    
                    // Delete the message document
                    deleteMessageRef.delete()
                      .then(() => {
                        showAlert("Message deleted successfully", "success");
                      })
                      .catch((error) => {
                        showAlert("Error deleting message:", error, "error");
                      });
                  });
                  

                // Append the message data elements to the message element
                messageElement.appendChild(document.createElement('hr'))
                messageElement.appendChild(nameElement);
                messageElement.appendChild(messageTextElement);
                messageElement.appendChild(timestampElement);
                messageElement.appendChild(replyButton);
                messageElement.appendChild(dismissButton);

                // Append the message element to the message list
                messageList.appendChild(messageElement);
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

function showOverlay() {
    var overlay = document.getElementById("overlay");
    if (overlay) {
      overlay.style.display = "block";
    }
}
  
function hideOverlay() {
    var overlay = document.getElementById("overlay");
    if (overlay) {
      overlay.style.display = "none";
    }
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

var forgotPasswordLink = document.getElementById("forgotPasswordLink");

forgotPasswordLink.addEventListener("click", function() {
    const email = prompt("What is your email address?")
    
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert("Password reset email sent.");
    }).catch(function(error) {
        alert(error.message);
    });
});

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

var coll = document.getElementsByClassName("passedUserCollapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
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
    alertDiv.onclick = function() {
        alertDiv.style.display = "none";
    }

    var width = 0;
    var id = setInterval(frame, 60);

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