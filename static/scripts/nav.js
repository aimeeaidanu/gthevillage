console.log("%cInitiated NavBar Service", "font-weight:bold")

// Define the functions to be called for each hash
var hashFunctions = {
    '#matches': goToMatches,
    '#profile': goToProfile,
    '#questionnaire': goToQuestionnaire,
    '#contact': goToContact,
    '#faq': goToFAQ
};
  
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
    document.getElementById("user-passed").style.display="flex"
    document.getElementById("user-contact").style.display="none";
    document.getElementById("user-questions").style.display="none";
    document.getElementById("user-questionnaire").style.display="none";
    document.getElementById('user-admin-panel').style.display="none"
    document.getElementById("mySidenav").style.width = "0";
}
function goToProfile(){
    document.getElementById("user-profile").style.display="block";
    document.getElementById("user-list").style.display="none";
    document.getElementById("user-contact").style.display="none";
    document.getElementById("user-passed").style.display="none"
    document.getElementById("user-questions").style.display="none";
    document.getElementById("user-questionnaire").style.display="none";
    document.getElementById('user-admin-panel').style.display="none"
    document.getElementById("mySidenav").style.width = "0";
}

function goToQuestionnaire(){
    document.getElementById("user-profile").style.display="none";
    document.getElementById("user-list").style.display="none";
    document.getElementById("user-passed").style.display="none"
    document.getElementById("user-contact").style.display="none";
    document.getElementById("user-questions").style.display="none";
    document.getElementById("user-questionnaire").style.display="block";
    document.getElementById('user-admin-panel').style.display="none"
    document.getElementById("mySidenav").style.width = "0";
}
function goToContact(){
    document.getElementById("user-profile").style.display="none";
    document.getElementById("user-list").style.display="none";
    document.getElementById("user-passed").style.display="none"
    document.getElementById("user-contact").style.display="block";
    document.getElementById("user-questions").style.display="none";
    document.getElementById("user-questionnaire").style.display="none";
    document.getElementById('user-admin-panel').style.display="none"
    document.getElementById("mySidenav").style.width = "0";
}

function goToFAQ(){
    document.getElementById("user-profile").style.display="none";
    document.getElementById("user-list").style.display="none";
    document.getElementById("user-passed").style.display="none"
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
    document.getElementById('user-admin-panel').style.display="none"
    document.getElementById("mySidenav").style.width = "0";
}

function goToAdmin(){
    document.getElementById("user-profile").style.display="none";
    document.getElementById("user-list").style.display="none";
    document.getElementById("user-passed").style.display="none"
    document.getElementById("user-contact").style.display="none";
    document.getElementById("user-questions").style.display="none";
    document.getElementById("user-questionnaire").style.display="none";
    document.getElementById('user-admin-panel').style.display="block"
    document.getElementById("mySidenav").style.width = "0";
}