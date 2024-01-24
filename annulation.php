<?php
session_start();
require("connection.php");


if (!isset($_SESSION["user"])) {

    header("Location: login.php");
    exit();
}
$loggedinemail = $_SESSION["user"];
$sql1 = "SELECT * FROM e1seat where email='$loggedinemail'";
$result1 = mysqli_query($con, $sql1);
$user1 = mysqli_fetch_array($result1, MYSQLI_ASSOC);
if ($user1) {
    $req = "DELETE FROM e1seat WHERE email = ?";
    $init = mysqli_stmt_init($con);
    if ($init) {
        $prep = mysqli_stmt_prepare($init, $req);

        if ($prep) {
            mysqli_stmt_bind_param($init, "s", $loggedinemail);
            mysqli_stmt_execute($init);
            echo json_encode(["status" => "SUCCESSFULLY DELETED"]);
            mysqli_stmt_close($init);
            mysqli_close($con);
        } else {
            echo json_encode(["status" => "Error preparing statement"]);
        }
    } else {
        echo json_encode(["status" => "Error initializing statement"]);
    }
}
else{
    echo json_encode(["status" => "No seat to delete"]);
}
