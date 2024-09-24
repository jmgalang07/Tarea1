const bodyElement = document.getElementById("main");

// Creo el título de la tarea
const titleElement = document.createElement("h1");
titleElement.innerText = "Mi cumpleaños (19/12/2024)";
bodyElement.append(titleElement); //Lo añado al body

// Creo el elemento de la cuenta atrás
const pantallaCuentaAtras = document.createElement("div");
pantallaCuentaAtras.id = "cuentaAtras"; 
bodyElement.append(pantallaCuentaAtras); //Lo añado al body

// Creo el input para seleccionar la fecha
const entradaFecha = document.createElement("input");
entradaFecha.id = "entradaFecha";
entradaFecha.name = "entradaFecha";
entradaFecha.type = "date"; // El tipo debe ser 'date'
bodyElement.append(entradaFecha); //Lo añado al body

// Establezco la fecha objetivo por defecto
let fechaObjetivo = new Date("2024-12-20T00:00:00"); // Mi cumpleaños

// Detecto cuando el usuario cambia la fecha en el input
entradaFecha.addEventListener("change", () => {
  if (entradaFecha.value) {
    fechaObjetivo = new Date(entradaFecha.value);
  }
});

// Función para actualizar el contador
function actualizarCuentaAtras() {
  const ahora = new Date();
  const tiempoRestante = fechaObjetivo - ahora;

  // Si el tiempo se agota, detener el contador
  if (tiempoRestante <= 0) {
    pantallaCuentaAtras.classList.add("rojo")
    pantallaCuentaAtras.innerHTML = "0 meses, 0 días, 0 horas, 0 minutos, 0 segundos";
    return;
  }

  // Calculo meses, días, horas, minutos y segundos restantes
  const meses = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24 * 30));
  const dias = Math.floor(
    (tiempoRestante % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  const horas = Math.floor(
    (tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

  // Actualizo la pantalla con el tiempo restante
  pantallaCuentaAtras.innerHTML = `
                ${meses} meses, 
                ${dias} días, 
                ${horas} horas, 
                ${minutos} minutos, 
                ${segundos} segundos
            `;

  // Limpiar clases anteriores
  pantallaCuentaAtras.classList.remove("verde", "naranja", "rojo");

  // Cambio el color del contador según el tiempo restante
  const unMes = 1000 * 60 * 60 * 24 * 30;
  const dosSemanas = 1000 * 60 * 60 * 24 * 14;
  const unaSemana = 1000 * 60 * 60 * 24 * 7;

  if (tiempoRestante > unMes) {
    pantallaCuentaAtras.classList.add("verde"); // Más de un mes
  } else if (tiempoRestante <= unMes && tiempoRestante > dosSemanas) {
    pantallaCuentaAtras.classList.add("naranja"); // Entre dos semanas y un mes
  } else if (tiempoRestante <= dosSemanas && tiempoRestante > unaSemana) {
    pantallaCuentaAtras.classList.add("naranja"); // Entre una semana y dos semanas
  } else if (tiempoRestante <= unaSemana) {
    pantallaCuentaAtras.classList.add("rojo"); // Menos de una semana
  }
}

// Establezco un contador que actualiza la cuenta atrás cada segundo
let counter = setInterval(() => {
  actualizarCuentaAtras();
}, 1000);