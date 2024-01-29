let enbtn = document.getElementById("english");
let frbtn = document.getElementById("french");
let arbtn = document.getElementById("arabic");
let darkmodebtn = document.getElementById("darkmodebtn");
const darkModeToggle = localStorage.getItem('darkmode');
const language = getLanguagePreferences();
let annulationbtn = document.getElementById("annulerbtn");
let logoutbtn = document.querySelector(".btn.btn-danger"); // Corrected selector
let etage1 = document.getElementById("etage1");
let etage2 = document.getElementById("etage2");
let etage3 = document.getElementById("etage3");
let etage4 = document.getElementById("etage4");
let etage5 = document.getElementById("etage5");
let etagetitle = document.getElementById("etagetitle");
let sendbtn = document.getElementById("sendbtn");
let timetitle = document.getElementById("timetitle");
let duration = document.getElementById("durationtitle");


function setLanguagePreferences(lang) {
    localStorage.setItem('language', lang);
}

function getLanguagePreferences() {
    return localStorage.getItem('language') || 'en';
}

function toggleDarkMode() {
    const currentMode = localStorage.getItem('darkmode');
    const newMode = currentMode === 'enabled' ? 'disabled' : 'enabled';
    localStorage.setItem('darkmode', newMode);

    // Toggle the 'dark-mode' class on the body
    document.body.classList.toggle('dark-mode', newMode === 'enabled');

    // Update the button text based on language and dark mode state
    updateUI(getLanguagePreferences());
}

function updateUI(language) {
    const darkModeToggle = localStorage.getItem('darkmode');

    darkmodebtn.innerHTML = darkModeToggle === 'enabled'
        ? (language === 'en' ? 'Light Mode' : (language === 'fr' ? 'Mode Jour' : 'الوضع الصباحي'))
        : (language === 'en' ? 'Dark Mode' : (language === 'fr' ? 'Mode Nuit' : 'الوضع الليلي'));

    etage1.innerHTML = language === 'en' ? 'Floor 1' : (language === 'fr' ? 'Etage 1' : 'الطابق 1');
    etage2.innerHTML = language === 'en' ? 'Floor 2' : (language === 'fr' ? 'Etage 2' : 'الطابق 2');
    etage3.innerHTML = language === 'en' ? 'Floor 3' : (language === 'fr' ? 'Etage 3' : 'الطابق 3');
    etage4.innerHTML = language === 'en' ? 'Floor 4' : (language === 'fr' ? 'Etage 4' : 'الطابق 4');
    etage5.innerHTML = language === 'en' ? 'Floor 5' : (language === 'fr' ? 'Etage 5' : 'الطابق 5');
    annulationbtn.innerHTML = language === 'en' ? 'Cancel' : (language === 'fr' ? 'Annuler' : 'إلغاء');
    logoutbtn.innerHTML = language === 'en' ? 'Logout' : (language === 'fr' ? 'Se déconnecter' : 'تسجيل الخروج');
    etagetitle.innerHTML = language === 'en' ? 'Choose your floor' : (language === 'fr' ? 'Choisissez votre étage' : 'اختر الطابق الخاص بك');
    sendbtn.value = language === 'en' ? 'Send' : (language === 'fr' ? 'Envoyer' : 'إرسال');
    timetitle.innerHTML = language === 'en' ? 'Choose your time' : (language === 'fr' ? 'Choisissez votre temps' : 'اختر توقيتك');
    duration.innerHTML = language === 'en' ? 'Choose your duration' : (language === 'fr' ? 'Choisissez votre période' : 'اختر المدة');

}

enbtn.addEventListener('click', () => {
    setLanguagePreferences('en');
    updateUI('en');
});

frbtn.addEventListener('click', () => {
    setLanguagePreferences('fr');
    updateUI('fr');
});

arbtn.addEventListener('click', () => {
    setLanguagePreferences('ar');
    updateUI('ar');
});

darkmodebtn.addEventListener('click', toggleDarkMode);

// Set initial dark mode state and language
updateUI(language);
