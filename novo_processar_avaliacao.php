<?php
// Habilitar exibição de erros para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir arquivo de configuração do banco de dados
require_once 'config.php';

// Verificar se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obter dados do formulário
    $nome = $_POST['name'] ?? '';
    $comentario = $_POST['comment'] ?? '';
    $nota = $_POST['rating'] ?? 0;

    // Validar os dados
    if (empty($nome) || empty($comentario) || empty($nota)) {
        echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios.']);
        exit;
    }

    // Preparar e executar a query SQL
    try {
        $stmt = $pdo->prepare("INSERT INTO avaliacoes (nome, comentario, nota) VALUES (?, ?, ?)");
        $resultado = $stmt->execute([$nome, $comentario, $nota]);

        // Verificar se a inserção foi bem-sucedida
        if ($resultado) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao inserir no banco de dados']);
        }
    } catch (PDOException $e) {
        // Log do erro real
        error_log($e->getMessage());
        // Retornar mensagem genérica para o usuário
        echo json_encode(['success' => false, 'message' => 'Erro ao processar avaliação']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
}
?> 