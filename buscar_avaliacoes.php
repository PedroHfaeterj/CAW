<?php
// Habilitar exibição de erros para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir arquivo de configuração do banco de dados
require_once 'config.php';

// Consultar as avaliações
$stmt = $pdo->query("SELECT nome, comentario, nota, data_criacao FROM avaliacoes ORDER BY data_criacao DESC");
$avaliacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Retornar as avaliações como JSON
header('Content-Type: application/json');
echo json_encode($avaliacoes);
?> 