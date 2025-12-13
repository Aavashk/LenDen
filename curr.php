<?php
session_start();

// Database connection
$host = "sql12.freesqldatabase.com";
$dbUsername = "sql12811741";
$dbPassword = "TaIZVcxv5i"; // Fill your password
$dbName = "sql12811741";

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("<script>alert('Database connection failed: ".$conn->connect_error."');</script>");
}

// Handle signup form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $phonenumber = trim($_POST['phone']); // match your HTML input name
    $password = $_POST['password'];

    // Validate basic fields
    if (empty($username) || empty($email) || empty($phonenumber) || empty($password)) {
        echo "<script>alert('Please fill all fields');</script>";
        exit();
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Check if email already exists
    $checkStmt = $conn->prepare("SELECT email FROM lenden WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        echo "<script>alert('This email is already registered! Please login.');</script>";
        $checkStmt->close();
        exit();
    }
    $checkStmt->close();

    // Insert new user
    $insertStmt = $conn->prepare("INSERT INTO lenden (username, email, phonenumber, password) VALUES (?, ?, ?, ?)");
    $insertStmt->bind_param("ssss", $username, $email, $phonenumber, $hashedPassword);

    if ($insertStmt->execute()) {
        echo "<script>alert('Signup successful!'); window.location='login.html';</script>";
    } else {
        echo "<script>alert('Error: ".$insertStmt->error."');</script>";
    }

    $insertStmt->close();
}

$conn->close();
?>
