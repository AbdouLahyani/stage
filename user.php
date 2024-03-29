<!DOCTYPE html>
<html lang="en">
<?php
session_start();
if (!(isset($_SESSION["user"]))) {
    header("Location: main.php");
    exit;
}
?>


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="main2.css">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

</head>

<body>
    <link rel="stylesheet" href="pre.css">
    <div class="loader">
        <img src="load-gif.gif" alt="">
    </div>
    <script src="pre.js" charset="utf-8"></script>

    <div id="blur">
        <div id="container1">
            <img id="linedatalogo" src="images/L1.jpg" alt="linedatalogo">
            <table>
                <tr>
                    <td id="english" class="lang">
                        <div class="language-square">EN</div>
                    </td>
                    <td id="french" class="lang">
                        <div class="language-square">FR</div>
                    </td>
                    <td class="lang" id="arabic">
                        <div class="language-square">AR</div>
                    </td>
                    <script type="module" src="languages.js"></script>

                    <td><button type="button" id="darkmodebtn" class="btn btn-dark">Dark Mode</button></td>
                    <td><button id="annulerbtn" class="btn btn-warning">Annulation</button></td>
                    <td><a href="logout.php" class="btn btn-danger">Logout</a></td>
                </tr>
            </table>
        </div>
    </div>

    <div class="container0" id="container0">
        <h1 class="etagetitle" id="etagetitle">Sélectionner votre salle</h1>
        <select class="form-select" aria-label="Default select example" id="etage">
            <option id="etage1" selected value="1">Etage 1</option>
            <option id="etage2" value="2">Etage 2</option>
            <option id="etage3" value="3">Etage 3</option>
            <option id="etage4" value="4">Etage 4</option>
            <option id="etage5" value="5">Etage 5</option>
        </select>
    </div>
    <form action="seatreg.php" method="post" id="form">
        <nav id="nav">
            <h2 class="h2" id="timetitle">Choose your time</h2>
            <div class="cs-form">
                <input type="time" id="time" class="form-control" />
            </div>
            <br>
            <h2 class="h2" id="durationtitle">Choose the duration</h2>
            <input type="text" class="form-control" id="duration" placeholder="Unité m ou h-m">
        </nav>
        <div class=container2>
            <div id="seatmap" class="seatmap" align="center">
            </div>
            <input type="button" id="sendbtn" class="button-36" value="Envoyer" style="margin: 0 auto; display: block;">
        </div>
    </form>

    <script type="module" src="main2.js"></script>
    <script type="module" src="darkmode.js"></script>