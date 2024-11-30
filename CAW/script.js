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

function addReview() {
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  if (name && comment && selectedRating > 0) {
    const review = { name, comment, rating: selectedRating };
    reviews.push(review);
    displayReviews();
    clearForm();
  } else {
    alert("Por favor, preencha todos os campos e selecione uma nota.");
  }
}

let selectedRating = 0; // Inicialização da variável para o formulário de avaliação

// Seleção de estrelas no formulário de avaliação
document.querySelectorAll(".review-form .star").forEach(star => {
  star.addEventListener("click", function() {
    selectedRating = parseInt(this.getAttribute("data-value"));
    updateStarSelection(selectedRating);
  });
});

function updateStarSelection(rating) {
  document.querySelectorAll(".review-form .star").forEach((star, index) => {
    if (index < rating) {
      star.classList.add("selected");
    } else {
      star.classList.remove("selected");
    }
  });
}

function displayReviews() {
  const reviewsContainer = document.getElementById("avaliacao");
  reviewsContainer.innerHTML = "";

  reviews.forEach(review => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");

    // Cria as estrelas preenchidas de acordo com a nota
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < review.rating) {
        stars += '<span class="star selected">★</span>'; // Estrela preenchida
      } else {
        stars += '<span class="star">★</span>'; // Estrela vazia
      }
    }

    reviewElement.innerHTML = `
      <h3>${review.name} <span class="rating">${stars}</span></h3>
      <p>${review.comment}</p>
    `;

    reviewsContainer.appendChild(reviewElement);
  });
}
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
  selectedRating = 0;
  updateStarSelection(0); 
}
