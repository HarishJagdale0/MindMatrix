<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

session_start();
if (!isset($_SESSION["students"])) {
    $_SESSION["students"] = [];
}

$method = $_SERVER["REQUEST_METHOD"];
$path = explode("/", trim($_SERVER["REQUEST_URI"], "/"));
$students = &$_SESSION["students"];

if ($path[0] !== "students") exit;

if ($method === "GET") {
    echo json_encode($students);
}

if ($method === "POST") {
    $students[] = json_decode(file_get_contents("php://input"), true);
    echo "Student Added";
}

if ($method === "PUT") {
    $index = $path[1];
    $students[$index] = json_decode(file_get_contents("php://input"), true);
    echo "Student Updated";
}

if ($method === "DELETE") {
    array_splice($students, $path[1], 1);
    echo "Student Deleted";
}
