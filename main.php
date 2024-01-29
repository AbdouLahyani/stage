<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="main.css">
    <script src="jquery-2.1.4.js"></script>
</head>

<body>
    <div id="blur">
        <div id="container1">
            <img src="https://seekvectorlogo.net/wp-content/uploads/2022/10/linedata-vector-logo-2022.png"
                alt="linedatalogo">
        </div>
    </div>
    <div id="popup" class="form-box active">
        <h1 id="title">Sign up</h1>
        <div id="errormessages"></div>
        <form action="registration.php" method="POST" id="form">
            <div class="input-group">
                <div class="input-field" id="email">
                    <i class="fa-solid fa-envelope"></i>
                    <input class="input" type="text" name="email" placeholder="Email">
                </div>
                <div class="input-field" id="password">
                    <i class="fa-solid fa-lock"></i>
                    <input class="input" type="password" name="password" placeholder="Password">
                </div>
                <div class="input-field" id="repeatpassword">
                    <i class="fa-solid fa-lock"></i>
                    <input class="input" type="password" name="repeatpassword" placeholder="Repeat Password">
                </div>
                <input type="button" class="btn btn-outline-danger" id="closebtn" onclick="toggle()" value="Close">
                <div class="btn-field">
                    <input id="signupbtn" class="show" type="submit" name="submit" value="Sign up">
                    <input id="signinbtn" class="hide" type="submit" name="submit" value="Sign in">
                </div>
            </div>
        </form>
        <p id="paragraph">Want to <input id="swapbutton" type="button" value="sign in"></p>

    </div>
    <script src="https://unpkg.com/vue@3"></script>
    <script src="main.js"></script>
    <script src="https://kit.fontawesome.com/ef12284078.js" crossorigin="anonymous"></script>
</body>


</html>