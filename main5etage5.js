import { rc } from "./etagenbrs.js";

let e1r = rc.e1r;
let e1c = rc.e1c;

let e2r = rc.e2r;
let e2c = rc.e2c;

let e3r = rc.e3r;
let e3c = rc.e3c;

let e4r = rc.e4r;
let e4c = rc.e4c;

let e5r = rc.e5r;
let e5c = rc.e5c;



function selectEtage() {
    var etage = document.getElementById("etage").value;
    switch (etage) {
        case '1':
            window.location.replace("./user.php");
            break;
        case '2':
            window.location.replace("./user2.php");
            break;
        case '3':
            window.location.replace("./user3.php");
            break;
        case '4':
            window.location.replace("./user4.php");
            break;
        case '5':
            etage5();
            break;
    }
    attachRadioClickEvent();
}

document.getElementById("etage").onchange = selectEtage;

selectEtage();

function numbers(row, col) {
    const startingNumber = 86;
    return startingNumber + (row - e1r - e2r - e3r - e4r) * e5c + (col - e1c - e2c - e3c - e4c);
}


function handleRadioChange(radio) {
    const currentState = radio.dataset.state;

    const allRadioButtons = document.querySelectorAll('input[type="radio"]');
    allRadioButtons.forEach((otherRadio) => {
        const otherState = otherRadio.dataset.state;
        if (otherRadio !== radio && otherState !== '3') {
            otherRadio.checked = false;
            otherRadio.dataset.state = '1';
        }
    });

    if (currentState === '1') {
        radio.checked = true;
        radio.dataset.state = '2';
    } else if (currentState === '2') {
        radio.checked = false;
        radio.dataset.state = '1';
    }
}



function attachRadioClickEvent() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('click', function () {
            handleRadioChange(this);
        });
    });
}




function etage5() {
    var seatContainerElement = document.body.querySelector(".seatmap");
    seatContainerElement.innerHTML = "";

    for (let i = 0; i < e5r; i++) {
        var tr = document.createElement("tr");
        tr.classList.add('tr');
        seatContainerElement.appendChild(tr);

        for (let j = 0; j < e5c; j++) {
            var seat = document.createElement("td");
            seat.classList.add('seat');
            seat.id = numbers(e1r + e2r + e3r + e4r + i, e1c + e2c + e3c + e4c + j);
            let seatid = seat.id;

            var radioInput = document.createElement('input');
            radioInput.setAttribute('role', 'radio');
            radioInput.setAttribute('aria-checked', 'false');
            radioInput.setAttribute('aria-label', 'seat ' + seatid);
            radioInput.id = 'car_' + seatid;
            radioInput.type = 'radio';
            radioInput.dataset.state = '1';
            radioInput.classList.add("radioinput");

            var containerDiv = document.createElement('div');
            containerDiv.classList.add('input-container');

            var radioTileDiv = document.createElement('div');
            radioTileDiv.classList.add('radio-tile');

            var ionIcon = document.createElement('ion-icon');
            ionIcon.setAttribute('name', 'desktop-outline');

            var label = document.createElement('label');
            label.setAttribute('for', 'car_' + seatid);
            label.textContent = numbers(e1r + e2r + e3r + e4r + i, e1c + e2c + e3c + e4c + j);

            radioTileDiv.appendChild(ionIcon);
            radioTileDiv.appendChild(label);

            containerDiv.appendChild(radioInput);
            containerDiv.appendChild(radioTileDiv);

            seat.appendChild(containerDiv);
            tr.appendChild(seat);
        }
    }
    verify();
}


document.getElementById("sendbtn").addEventListener("click", function () {
    topass(e5r, e5c);
})







var T = [];

function verify() {
    for (let i = e1r + e2r + e3r + e4r; i < e1r + e2r + e3r + e4r + e5r; i++) {
        for (let j = e1c + e2c + e3c + e4c; j < e1c + e2c + e3c + e4c + e5c; j++) {
            let seatid = numbers(i, j);
            let seatElement = document.getElementById(seatid);
            console.log(seatid)
            if (seatElement) {
                (function (i, j, seatElement, seatid) {
                    let http = new XMLHttpRequest();
                    http.open('POST', 'seatoccupied.php');
                    http.setRequestHeader('Content-Type', 'application/json');
                    
                    http.onload = function () {
                        console.log(this.response);
                        var radio = seatElement.querySelector("input[type='radio']");
                        if (this.response === "Seat already occupied") {
                            radio.checked = true;
                            radio.dataset.state = "3";
                            T.push({
                                row: i,
                                column: j,
                                seatId: seatid,
                                state: 'occupied'
                            });
                        } else {
                            T.push({
                                row: i,
                                column: j,
                                seatId: seatid,
                                state: 'unoccupied'
                            });
                        }
                    };
                    
                    http.send(JSON.stringify({ v1: seatid }));
                })(i, j, seatElement, seatid);
            }
        }
    }
    console.log(T);
}

async function topass(A, B) {
    console.log(A, B);
    const total = A * B;
    console.log(total);

    const seats = document.querySelectorAll(".seat");

    let seatid;

    for (let i = 0; i < total; i++) {
        const seat = seats[i];
        const radio = seat.querySelector('input[type="radio"]');
        const row = Math.floor(i / B);
        const col = i % B;

        if (radio.checked && radio.dataset.state === '2') {
            seatid = numbers(e1r + e2r + e3r + e4r + row, e1c + e2c + e3c + e4c + col);
            console.log(seatid);
            break;
        }
    }

    if (seatid) {
        let v1 = seatid;

        let http = new XMLHttpRequest();
        http.open('POST', 'seatreg.php');
        http.setRequestHeader('Content-Type', 'application/json');

        http.onload = function () {
            console.log(this.response);
            alert(this.response);
        };
        http.send(JSON.stringify({ v1: v1 }));
    } else {
        console.log("No checked seat with state '2' found.");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    location.reload();
}

document.getElementById("annulerbtn").addEventListener("click", async function () {
    try {
        const response = await fetch('annulation.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        console.log(responseData.status);
        alert(responseData.status);
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred. Please try again.');
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    location.reload()
});

console.log(e5r, e5c);