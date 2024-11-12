
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
const avaliacao = [];

function addReview() {
  
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  const rating = document.getElementById("rating").value;

  
  if (name && comment && rating) {
   
    const review = { name, comment, rating };
    reviews.push(review);
    
 
    displayReviews();
    
   
    clearForm();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

function displayReviews() {
 
  const reviewsContainer = document.getElementById("postagem");
  reviewsContainer.innerHTML = "";


  reviews.forEach(review => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");

    reviewElement.innerHTML = `
      <h3>${review.name} <span class="rating">(${review.rating}⭐)</span></h3>
      <p>${review.comment}</p>
    `;

    reviewsContainer.appendChild(reviewElement);
  });
}

function clearForm() {
  
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
  document.getElementById("rating").value = "5";
}







const estrelas = [];
let selecionaNota = 0; 


document.querySelectorAll(".star").forEach(star => {
  star.addEventListener("click", function() {
    selectedRating = this.getAttribute("data-value");
    updateStarSelection(selectedRating);
  });
});

function updateStarSelection(rating) {
  document.querySelectorAll(".star").forEach(star => {
    star.classList.remove("selected");
  });

 
  for (let i = 0; i < rating; i++) {
    document.querySelectorAll(".star")[i].classList.add("selected");
  }
}

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

function displayReviews() {
  const reviewsContainer = document.getElementById("reviews");
  reviewsContainer.innerHTML = "";

  reviews.forEach(review => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");

    reviewElement.innerHTML = `
      <h3>${review.name} <span class="rating">(${review.rating}⭐)</span></h3>
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