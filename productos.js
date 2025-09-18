// Cambio de secciones
const buttons = document.querySelectorAll(".sidebar-btn");
const sections = document.querySelectorAll(".contenido-section");

buttons.forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();

    // Quitar activo de todos
    buttons.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    // Ocultar todas las secciones
    sections.forEach(sec => sec.classList.add("d-none"));

    // Mostrar la seleccionada
    const sectionId = this.getAttribute("data-section");
    document.getElementById(sectionId).classList.remove("d-none");
  });
});
