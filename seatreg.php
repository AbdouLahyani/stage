<?php
require("connection.php");

// Read JSON input from the request
$data = json_decode(file_get_contents("php://input"), true);

// Start the session
session_start();
$loggedinemail = $_SESSION["user"];

// Check if the user has already booked a seat
$query = "SELECT * FROM e1seat WHERE email = '$loggedinemail'";
if (mysqli_num_rows(mysqli_query($con, $query))) {
    die("You already booked a seat");
}

// Check if 'v1', 'time', and 'duration' are set in the received data
if (isset($data['v1']) && isset($data['time']) && isset($data['duration'])) {
    // Extract data from the request
    $v1 = $data['v1'];
    $time = $data['time'];
    $duration = $data['duration'];

    // Set the initial status
    $status = "Occupé";

    // Insert the seat reservation into the database
    $req = "INSERT INTO e1seat(seat_number, status, email, reservation_time, duration) VALUES(?,?,?,?,?)";
    $init = mysqli_stmt_init($con);
    $prep = mysqli_stmt_prepare($init, $req);

    if ($prep) {
        mysqli_stmt_bind_param($init, "isssi", $v1, $status, $loggedinemail, $time, $duration);
        mysqli_stmt_execute($init);
        echo "Seat registered successfully, ";

        // Schedule a task to reset the seat after the specified duration
        $resetTime = date('Y-m-d H:i:s', strtotime("+$duration minutes", strtotime($time)));
        $resetQuery = "UPDATE e1seat SET status='Disponible' WHERE seat_number=? AND reservation_time=?";
        $resetInit = mysqli_stmt_init($con);
        $resetPrep = mysqli_stmt_prepare($resetInit, $resetQuery);

        if ($resetPrep) {
            mysqli_stmt_bind_param($resetInit, "is", $v1, $resetTime);
            mysqli_stmt_execute($resetInit);
            echo "Seat will be reset at: $resetTime";
        } else {
            echo "Error scheduling seat reset";
        }
    } else {
        die("Seat not registered");
    }
} else {
    echo "Error: Incomplete data received";
}
?>
