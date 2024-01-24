<?php
session_start();
if (isset($_SESSION["user"])) {
    header("location: user.php"); 
}
if (isset($_POST["submit"]) && ($_POST["submit"] == "Sign up")) {
    $email = $_POST["email"];
    $password = $_POST["password"];
    $repeatpassword = $_POST["repeatpassword"];
    $role = "user";
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $errors = array();
    if (empty($email) || empty($password) || empty($repeatpassword)) {
        array_push($errors, "All fields are required");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        array_push($errors, "Email is not valid");
    }
    if (strlen($password) < 8) {
        array_push($errors, "Password must be at least 8 characters long");
    }
    if ($password !== $repeatpassword) {
        array_push($errors, "Password does not match");
    }
    require_once("connection.php");
    $query = "SELECT * FROM user where email='$email'";
    if (mysqli_num_rows(mysqli_query($con, $query))) {
        die("Email already exists");
    }
    ;

    if (count($errors) > 0) {
        foreach ($errors as $error) {
            echo "" . $error . "<br>";
        }
    } else {
        $req = "INSERT INTO user(email, password, role) VALUES(?,?,?)";
        $init = mysqli_stmt_init($con);
        $prep = mysqli_stmt_prepare($init, $req);
        if ($prep) {
            mysqli_stmt_bind_param($init, "sss", $email, $password_hash, $role);
            mysqli_stmt_execute($init);
            echo "user registered successfully";
            sleep(2);
            session_start();
            $_SESSION["user"] = $email;
            header("Location: user.php");
        } else {
            die("Error2");
        }
    }
}
if (isset($_POST["submit"]) && ($_POST["submit"] == "Sign in")) {
    $email = $_POST["email"];
    $password = $_POST["password"];
    require_once("connection.php");
    $sql = "SELECT * FROM user where email='$email'";
    $result = mysqli_query($con, $sql);
    $user = mysqli_fetch_array($result, MYSQLI_ASSOC);
    if ($user) {
        if (password_verify($password, $user["password"])) {
            session_start();
            $_SESSION["user"] = $email;
            $sql2 = "select role from user where email='$email'";
            $result2 = mysqli_query($con, $sql2);
            $rolee = mysqli_fetch_array($result2, MYSQLI_ASSOC);
            if ($rolee && $rolee['role'] === 'admin') {
                header("location: user.html");
            } elseif ($rolee && $rolee["role"] === "user") {
                header("location: user.php");
            } else {
                echo "Password does not match";
                die();
            }
        }
    } else {
        echo "Email does not match";
    }
}
