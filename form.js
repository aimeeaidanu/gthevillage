console.log("%cInitiated Form Service", "font-weight:bold")

//Handle Branching Logic for question "Type Of Job"
function showArea(whichQuestion){
    console.log(`%c${whichQuestion}`,'color:lime')
    console.log(document.getElementById(whichQuestion + "1"))
    console.log(document.getElementById(whichQuestion + "1").checked)
    if (document.getElementById(whichQuestion + "1").checked) {
        document.getElementById(whichQuestion+"Q1").style.display = 'block';
    } else {
        document.getElementById(whichQuestion+"Q1").style.display = 'none';
    }
}

//Handle Branching Logic for questions
function showMoreOriginal(type, whichQuestion){
    console.log("%cshow me more of: " + type + whichQuestion, 'color:blue')
    if(document.getElementById(type + whichQuestion).checked){
        document.getElementById(type + whichQuestion + "Questions").style.display='block';
    } else {
        document.getElementById(type + whichQuestion + "Questions").style.display='none';
    }
}

function showMore(clicktype, type, whichQuestion, modifier){
    console.log("%cshow me more of: " + type + whichQuestion + modifier, 'color:blue')
    if(document.getElementById(clicktype).checked){
        document.getElementById(type + whichQuestion + modifier).style.display='block';
    } else {
        document.getElementById(type + whichQuestion + modifier).style.display='none';
    }
}

function resetRadioButtons(divId) {
    var divElement = document.getElementById(divId);
    var radioButtons = divElement.getElementsByTagName("input");
  
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].type == "radio") {
            radioButtons[i].checked = false;
        }
    }
}

//Handle saving quesstionnaire on user sign up
function saveQuestionnaire(type) {
    var questionnaireData = {
        name: document.getElementById("name").value,
        username: document.getElementById("username").value,
        gender: document.getElementById("gender").value,
        highestDegree: document.getElementById("highestDegree").value,
        location: document.getElementById("location").value,
        nationality: document.getElementById("nationality").value,
        workLocations: document.getElementById("workLocations").value,
        workOrganizations: document.getElementById("workOrganizations").value,
        roleOrganization: document.getElementById("roleOrganization").value,
        typeOfJob: Array.from(document.querySelectorAll('input[name=typeoJob]:checked')).map(el => el.value).join(','),
        trainingTypeReceive: Array.from(document.querySelectorAll('input[name=trainingTypeReceive]:checked')).map(el => el.value).join(','),
        trainingTypeReceiveDegreeProgram: document.querySelector('input[name=degreeProgramTypeReceive]:checked')?.value || '',
        trainingTypeReceiveWriting: document.querySelector('input[name=writingTypeReceive]:checked')?.value || '',
        trainingTypeOffer: Array.from(document.querySelectorAll('input[name=trainingTypeOffer]:checked')).map(el => el.value).join(','),
        trainingTypeOfferDegreeProgram: document.querySelector('input[name=degreeProgramTypeOffer]:checked')?.value || '',
        trainingTypeOfferWriting: document.querySelector('input[name=writingTypeOffer]:checked')?.value || '',
        fundingTypeReceive: Array.from(document.querySelectorAll('input[name=fundingTypeReceive]:checked')).map(el => el.value).join(','),
        fundingTypeReceivePilotGrant: document.querySelector('input[name=pilotGrantTypeReceive]:checked')?.value || '',
        fundingTypeOffer: Array.from(document.querySelectorAll('input[name=fundingTypeOffer]:checked')).map(el => el.value).join(','),
        fundingTypeOfferPilotGrant: document.querySelector('input[name=pilotGrantTypeOffer]:checked')?.value || '',
        mentorshipTypeReceive: document.querySelector('input[name=mentorship-type-receive]:checked')?.value || '',
        mentorshipTypeReceiveDuration: document.querySelector('input[name=mentorship-duration-receive]:checked')?.value || '',
        mentorshipTypeReceiveCategory: Array.from(document.querySelectorAll('input[name=mentorship-topic-receive]:checked')).map(el => el.value).join(',') || '',
        mentorshipTypeOffer:document.querySelector('input[name=mentorship-type-offer]:checked')?.value || '',
        mentorshipTypeOfferDuration: document.querySelector('input[name=mentorship-duration-offer]:checked')?.value || '',
        mentorshipTypeOfferCategory: Array.from(document.querySelectorAll('input[name=mentorship-topic-offer]:checked')).map(el => el.value).join(',') || '',
        yearsInJob: document.getElementById("yearsInJob").value,
        howToConnect: document.getElementById("howToConnect").value,
        suggestions: document.getElementById("suggestions").value,
        goals: document.getElementById("goals").value,
    };
      
    // Save the questionnaire data to Firestore
    var db = firebase.firestore();
    db.collection("users").doc(userEmail1).set(questionnaireData).then(function() {
        showAlert("Account created successfully!", "success");
        delay(3000);
        document.getElementById("user-section").style.display="block";
        document.getElementById("limbo-state").style.display="none";
    });
}

//Handle updating user's questionnaire
function updateQuestionnaire() {
    var questionnaireData = {
        name: document.getElementById("name1").value,
        username: document.getElementById("username1").value,
        gender: document.getElementById("gender1").value,
        highestDegree: document.getElementById("highestDegree1").value,
        location: document.getElementById("location1").value,
        nationality: document.getElementById("nationality1").value,
        workLocations: document.getElementById("workLocations1").value,
        workOrganizations: document.getElementById("workOrganizations1").value,
        roleOrganization: document.getElementById("roleOrganization1").value,
        typeOfJob: Array.from(document.querySelectorAll('input[name=typeoJob]:checked')).map(el => el.value).join(',') || '',
        typeOfJobresearchArea: document.getElementById("typeOfJobresearchArea1").value,
        typeOfJobclinicalSpecialty: document.getElementById("typeOfJobclinicalSpecialty1").value,
        typeOfJobbusiness: document.getElementById("typeOfJobbusiness1").value,
        typeOfJobngo: document.getElementById("typeOfJobngo1").value,
        typeOfJobfunding: document.getElementById("typeOfJobfunding1").value,
        typeOfJobpublishing: document.getElementById("typeOfJobpublishing1").value,
        typeOfJobotherSpecify: document.getElementById("typeOfJobotherSpecify1").value,
        trainingTypeReceive: Array.from(document.querySelectorAll('input[name=trainingTypeReceive]:checked')).map(el => el.value).join(',') || '',
        trainingTypeReceiveDegreeProgram: document.querySelector('input[name=degreeProgramTypeReceive]:checked')?.value || '',
        trainingTypeReceiveWriting: document.querySelector('input[name=writingTypeReceive]:checked')?.value || '',
        trainingTypeOffer: Array.from(document.querySelectorAll('input[name=trainingTypeOffer]:checked')).map(el => el.value).join(',') || '',
        trainingTypeOfferDegreeProgram: document.querySelector('input[name=degreeProgramTypeOffer]:checked')?.value || '',
        trainingTypeOfferWriting: document.querySelector('input[name=writingTypeOffer]:checked')?.value,
        fundingTypeReceive: Array.from(document.querySelectorAll('input[name=fundingTypeReceive]:checked')).map(el => el.value).join(',') || '',
        fundingTypeReceivePilotGrant: document.querySelector('input[name=pilotGrantTypeReceive]:checked')?.value || '',
        fundingTypeOffer: Array.from(document.querySelectorAll('input[name=fundingTypeOffer]:checked')).map(el => el.value).join(',') || '',
        fundingTypeOfferPilotGrant: document.querySelector('input[name=pilotGrantTypeOffer]:checked')?.value || '',
        yearsInJob: document.getElementById("yearsInJob1").value,
        mentorshipTypeReceive: document.querySelector('input[name=mentorship-type-receive]:checked')?.value || '',
        mentorshipTypeReceiveDuration: document.querySelector('input[name=mentorship-duration-receive]:checked')?.value || '',
        mentorshipTypeReceiveCategory: Array.from(document.querySelectorAll('input[name=mentorship-topic-receive]:checked')).map(el => el.value).join(',') || '',
        mentorshipTypeOffer:document.querySelector('input[name=mentorship-type-offer]:checked')?.value || '',
        mentorshipTypeOfferDuration: document.querySelector('input[name=mentorship-duration-offer]:checked')?.value || '',
        mentorshipTypeOfferCategory: Array.from(document.querySelectorAll('input[name=mentorship-topic-offer]:checked')).map(el => el.value).join(',') || '',
        howToConnect: document.getElementById("howToConnect1").value,
        suggestions: document.getElementById("suggestions1").value,
        goals: document.getElementById("goals1").value,
    };
      
    // Save the questionnaire data to Firestore
    var db = firebase.firestore();
    db.collection("users").doc(userEmail1).set(questionnaireData).then(function() {
        showAlert("Data updated!", "success");
        delay(3000);
        goToMatches()
    });
}
