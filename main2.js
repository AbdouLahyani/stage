import { rc } from "./etagenbrs.js";

let e1r = rc.e1r;
let e1c = rc.e1c;

var etage = document.getElementById("etage").value;

selectEtage(etage);

function selectEtage() {
    var etage = document.getElementById("etage").value;
    switch (etage) {
        case '1':
            etage1();
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
            window.location.replace("./user5.php");
            break;
    }
    attachRadioClickEvent();
}



function attachRadioClickEvent() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('click', function () {
            handleRadioChange(this);
        });
    });
}



document.getElementById("etage").onchange = selectEtage;

selectEtage();


function numbers(row, col) {
    return row * e1c + col + 1;
}

function etage1() {
    var seatContainerElement = document.body.querySelector(".seatmap");
    seatContainerElement.innerHTML = "";
    for (let i = 0; i < e1r; i++) {
        var tr = document.createElement("tr");
        tr.classList.add('tr');
        seatContainerElement.appendChild(tr);
        for (let j = 0; j < e1c; j++) {
            var seat = document.createElement("td");
            seat.classList.add('seat');
            seat.id = numbers(i,j);
            let seatid = seat.id;

            var radioInput = document.createElement('input');
            radioInput.setAttribute('role', 'radio');
            radioInput.setAttribute('aria-checked', 'false');
            radioInput.setAttribute('aria-label', 'seat ' + seatid);
            radioInput.id = 'car_' + seatid;
            radioInput.type = 'radio';
            radioInput.dataset.state = '1';

            

            var containerDiv = document.createElement('div');
            containerDiv.classList.add('input-container');

            var radioTileDiv = document.createElement('div');
            radioTileDiv.classList.add('radio-tile');

            var ionIcon = document.createElement('ion-icon');
            ionIcon.setAttribute('name', 'desktop-outline');

            var label = document.createElement('label');
            label.setAttribute('for', 'car_' + seatid);
            label.textContent = numbers(i, j);

            radioTileDiv.appendChild(ionIcon);
            radioTileDiv.appendChild(label);

            containerDiv.appendChild(radioInput);
            containerDiv.appendChild(radioTileDiv);

            seat.appendChild(containerDiv);
            tr.appendChild(seat);
        }
    }
    verify(e1r, e1c);
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

const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(radio => {
    radio.addEventListener('click', function () {
        handleRadioChange(this);
    });
});

var T = [];

function verify(e1r, e1c) {
    for (let i = 0; i < e1r; i++) {
        for (let j = 0; j < e1c; j++) {
            var seatid = numbers(i, j);
            var seatElement = document.getElementById(seatid);

            if (seatElement) {
                (function (i, j, seatElement) {
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
                })(i, j, seatElement);
            } else {
                console.error("Element with id " + seatid + " not found.");
            }
        }
    }
}

document.getElementById("sendbtn").addEventListener("click", function () {
    let e1r = 3;
    let e1c = 7;
    topass(e1r, e1c);
})



var seatid = 0;



async function topass(e1r, e1c) {
    console.log(e1r, e1c);
    const total = e1r * e1c;
    console.log(total);

    const seats = document.querySelectorAll(".seat");

    let seatid;

    for (let i = 0; i < total; i++) {
        const seat = seats[i];
        const radio = seat.querySelector('input[type="radio"]');

        if (radio.checked && radio.dataset.state === '2') {
            seatid = seat.id;
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
        }
        http.send(JSON.stringify({ v1: v1 }));
    } else {
        console.log("No checked seat with state '2' found.");
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    location.reload()
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

attachRadioClickEvent();