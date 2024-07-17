<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database configuration
$host = 'localhost';
$db   = 'threedprintingquotes';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

// Data Source Name
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Handling the form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $description = $_POST['description'];
    $link = $_POST['link'] ?? '';
    $noSupports = isset($_POST['noSupports']) ? 1 : 0;
    $material = $_POST['material'] ?? '';
    $priority = $_POST['priority'] ?? '';

    // Handle file upload
    $uploadDir = 'uploads/';
    $filePath = null;
    if (!empty($_FILES['files']['name'][0])) {
        $fileName = basename($_FILES['files']['name'][0]);
        $filePath = $uploadDir . time() . '-' . $fileName;

        if (!move_uploaded_file($_FILES['files']['tmp_name'][0], $filePath)) {
            echo 'File upload failed';
            exit;
        }
    }

    // Prepare and execute SQL statement
    $sql = "INSERT INTO quotes (name, email, phone, description, file_path, link, noSupports, material, priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$name, $email, $phone, $description, $filePath, $link, $noSupports, $material, $priority]);

    echo 'Quote request submitted successfully';
} else {
    echo 'Invalid request method';
}
?>
