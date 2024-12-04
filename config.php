<?php
try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=avaliacoes;charset=utf8mb4",
        "root",
        "",
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch(PDOException $e) {
    error_log($e->getMessage());
    die('Erro na conexão com o banco de dados');
}
?> 