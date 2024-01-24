
document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = localStorage.getItem('darkmode');
    let toggleButton = document.getElementById('darkmodebtn');
    let linedataimg = document.getElementById("linedatalogo");
    let container1 = document.getElementById("container1");
    let container0 = document.getElementById("container0");
    let etagetitle = document.getElementById("etagetitle");
    let sendbtn = document.getElementById("sendbtn");
    const root = document.querySelector(':root');
    const imagePath1 = "images/L1.jpg";
    const imagePath2 = "images/L2.png";

    if (darkModeToggle === 'enabled') {

      document.body.classList.add('darkmode');
      container1.classList.add('darkmode');
      container0.classList.add('darkmode');
      etagetitle.classList.add('darkmode');
      sendbtn.classList.add('darkmode');
      linedataimg.src = imagePath2;
      root.classList.remove('lightmode');
      sendbtn.classList.remove('lightmode');
      root.classList.add('darkmode');
      toggleButton.classList.remove('lightmode');
      toggleButton.classList.add('darkmode');
      toggleButton.innerHTML = 'Light Mode';
    } else {

      linedataimg.src = imagePath1;
      root.classList.remove('darkmode');
      root.classList.add('lightmode');
      toggleButton.classList.remove('darkmode');
      toggleButton.classList.add('lightmode');
      toggleButton.classList.remove('darkmode');
      toggleButton.classList.add('lightmode');
      toggleButton.innerHTML = 'Dark Mode';
    }
  

    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('darkmode');
      container1.classList.toggle('darkmode');
      container0.classList.toggle('darkmode');
      etagetitle.classList.toggle('darkmode');
      toggleButton.classList.toggle('darkmode');
      sendbtn.classList.toggle('darkmode');
  

      if (document.body.classList.contains('darkmode')) {
        localStorage.setItem('darkmode', 'enabled');
      } else {
        localStorage.setItem('darkmode', 'disabled');
      }
    });
  

    toggleButton.addEventListener('click', function () {
      changeimg();
    });
  
    function changeimg() {
      let linedataimg = document.getElementById("linedatalogo");
      const root = document.querySelector(':root')
      const imagePath1 = "images/L1.jpg";
      const imagePath2 = "images/L2.png";
  
      if (linedataimg.src.endsWith(imagePath1)) {
        linedataimg.src = imagePath2;
        toggleButton.classList.remove('lightmode');
        toggleButton.classList.add('darkmode');
        root.classList.remove('lightmode');
        root.classList.add("darkmode");
        toggleButton.innerHTML = 'Light Mode'
        sendbtn.classList.remove('lightmode');
        sendbtn.classList.add("darkmode");
      } else if (linedataimg.src.endsWith(imagePath2)) {
        linedataimg.src = imagePath1;
        root.classList.remove('darkmode');
        root.classList.add("lightmode");
        toggleButton.classList.remove('darkmode');
        toggleButton.classList.add('lightmode');
        toggleButton.innerHTML = 'Dark Mode';
        sendbtn.classList.remove('darkmode');
        sendbtn.classList.add("lightmode");
    
      }
    }
  });