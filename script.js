document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del DOM
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn'); // Botón de pantalla completa
    const presentationContainer = document.querySelector('.presentation-container'); // Contenedor a expandir
    const currentSlideNum = document.getElementById('currentSlideNum');
    const totalSlidesNum = document.getElementById('totalSlidesNum');

    // Inicializar variables
    let currentSlide = 0;
    const totalSlides = slides.length;

    totalSlidesNum.textContent = totalSlides;

    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[index].classList.add('active');
        currentSlideNum.textContent = index + 1;
    }

    // Función para ir a la siguiente diapositiva
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Función para ir a la diapositiva anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // --- NUEVA FUNCIÓN: Pantalla Completa ---
    function toggleFullScreen() {
      // Si no hay ningún elemento en pantalla completa, la activamos
      if (!document.fullscreenElement) {
        presentationContainer.requestFullscreen().catch(err => {
          alert(`Error al intentar activar el modo de pantalla completa: ${err.message}`);
        });
      } else {
        // Si ya estamos en pantalla completa, la desactivamos
        document.exitFullscreen();
      }
    }

    // --- Event Listeners ---
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    fullscreenBtn.addEventListener('click', toggleFullScreen); // Añadimos el evento al nuevo botón

    // Navegación con el teclado
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextSlide();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key.toLowerCase() === 'f') { // Atajo de teclado: 'F' para pantalla completa
            toggleFullScreen();
        }
    });

    // Mostrar la primera diapositiva al cargar la página
    showSlide(currentSlide);
});