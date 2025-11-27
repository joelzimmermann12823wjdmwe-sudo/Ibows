<?php
header('Content-Type: application/json');

// Pfad zur SQLite-Datenbank-Datei (muss relativ zum Script-Pfad sein)
$dbPath = __DIR__ . '/../news.sqlite';
$pdo = new PDO('sqlite:' . $dbPath);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$method = $_SERVER['REQUEST_METHOD'];

// Handle GET Request (Read)
if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM news_artikel ORDER BY datum DESC');
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($news);
    exit;
}

// Rudimentärer POST-Handler für zukünftige Admin-Funktionen
if ($method === 'POST') {
    http_response_code(501); // Not Implemented yet
    echo json_encode(["error" => "Die POST-Methode ist für das Erstellen von Artikeln vorgesehen, aber noch nicht vollständig implementiert."]);
    exit;
}

http_response_code(405);
echo json_encode(["error" => "Methode nicht erlaubt."]);
?>
