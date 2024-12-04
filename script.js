//aba inicial--------------------------------------------------------------------------------------------
let currentIndex = 0;

function showImage(index) {
  const images = document.querySelectorAll('.carousel-images img');
  const totalImages = images.length;

  // Garantir que o índice seja cíclico
  if (index >= totalImages) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalImages - 1;
  } else {
    currentIndex = index;
  }

  // Move o contêiner para mostrar apenas uma imagem de cada vez
  document.querySelector('.carousel-images').style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextImage() {
  showImage(currentIndex + 1);
}

function prevImage() {
  showImage(currentIndex - 1);
}

// Passa para a próxima imagem automaticamente a cada 3 segundos
setInterval(() => {
  nextImage();
}, 3000);






//aba de avaliações--------------------------------------------------------------------------------------
const reviews = [];

// Variáveis globais
let selectedRating = 0;

// Inicialização quando o documento carrega
document.addEventListener('DOMContentLoaded', function() {
    // Carregar avaliações existentes
    loadReviews();

    // Configurar os eventos das estrelas
    setupStarRating();

    // Configurar o formulário
    const form = document.getElementById('avaliacaoForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitReview(this);
        });
    }
});

// Configurar o sistema de avaliação por estrelas
function setupStarRating() {
    const stars = document.querySelectorAll('.star-rating input');
    stars.forEach(star => {
        star.addEventListener('change', function() {
            selectedRating = parseInt(this.value);
            updateStarSelection(selectedRating);
        });
    });
}

// Atualizar a seleção visual das estrelas
function updateStarSelection(rating) {
    const stars = document.querySelectorAll('.star-rating label');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Enviar a avaliação
function submitReview(form) {
    const name = form.querySelector('#name').value.trim();
    const comment = form.querySelector('#comment').value.trim();
    const rating = selectedRating;

    // Validação
    if (!name || !comment || rating < 1 || rating > 5) {
        alert('Por favor, preencha todos os campos e selecione uma avaliação (1-5 estrelas).');
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('comment', comment);
    formData.append('rating', rating);

    fetch('novo_processar_avaliacao.php', { // Atualize para o novo arquivo PHP
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na rede');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            clearForm(form);
            loadReviews();
            alert('Avaliação enviada com sucesso!');
        } else {
            throw new Error(data.message || 'Erro ao enviar avaliação');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar avaliação. Por favor, tente novamente.');
    });
}


// Limpar o formulário
function clearForm(form) {
    form.reset();
    selectedRating = 0;
    updateStarSelection(0);
}

// Carregar avaliações existentes
function loadReviews() {
    const reviewsContainer = document.getElementById("avaliacao");
    if (!reviewsContainer) return;

    fetch('buscar_avaliacoes.php')
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error('Erro ao carregar avaliações');
            }
            return response.json();
        })
        .then(reviews => {
            console.log('Avaliações:', reviews);
            reviewsContainer.innerHTML = "";

            if (reviews.length === 0) {
                reviewsContainer.innerHTML = "<p>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>";
                return;
            }

            // Ordenar avaliações da mais recente para a mais antiga
            reviews.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));

            reviews.forEach(review => {
                const reviewElement = document.createElement("div");
                reviewElement.classList.add("review");
                
                // Criar as estrelas
                const stars = '★'.repeat(review.nota) + '☆'.repeat(5 - review.nota);
                
                // Formatar a data
                const data = new Date(review.data_criacao).toLocaleDateString('pt-BR');
                
                reviewElement.innerHTML = `
                    <h3 class="review-name">${review.nome}</h3>
                    <div class="rating">${stars}</div>
                    <p>${review.comentario}</p>
                    <small>Data: ${data}</small>
                `;
                
                reviewsContainer.appendChild(reviewElement);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            reviewsContainer.innerHTML = "<p>Erro ao carregar avaliações. Por favor, tente novamente mais tarde.</p>";
        });
}

// Função para limpar todas as avaliações (opcional, pode ser útil para testes)
function clearAllReviews() {
    localStorage.removeItem('reviews');
    loadReviews();
}
