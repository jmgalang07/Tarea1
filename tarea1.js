const bodyElement = document.getElementById("main");

// Creo el título de la tarea
const titleElement = document.createElement("h1");
titleElement.innerText = "My birthday (19/12/2024)";
bodyElement.append(titleElement); //Lo añado al body

// Creo un elemento div para la pantallaCuentaAtrás
const screenCountDown = document.createElement("div");
screenCountDown.id = "cuentaAtras";
bodyElement.append(screenCountDown); //Lo añado al body

// Creo el input para seleccionar la fecha (entradaFecha)
const entryDate = document.createElement("input");
entryDate.id = "entryDate";
entryDate.name = "entryDate";
entryDate.type = "date"; // El tipo tiene que ser 'date'
bodyElement.append(entryDate); //Lo añado al body

// Establezco la fechaObjetivo por defecto
let targetdate = new Date("2024-12-20T00:00:00"); // Mi cumpleaños

// Detecto cuando el usuario cambia la fecha en el input
entryDate.addEventListener("change", () => {
  if (entryDate.value) {
    targetdate = new Date(entryDate.value);
  }
});

// Función para actualizar el contador
function actualizarCuentaAtras() {
  const now = new Date();
  const timeRemaining = targetdate - now;

  // Si el tiempo se agota, poner fondo en rojo con el tiempo a 0 (tiempoRestante)
  if (timeRemaining <= 0) {
    screenCountDown.classList.add("red");
    screenCountDown.innerHTML =
      "  ¡¡FELICIDADES!!  ";
    return;
  }

  // Calculo meses, días, horas, minutos y segundos restantes
  const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Actualizo la pantalla con el tiempo restante
  screenCountDown.innerHTML = `
                ${months} meses, 
                ${days} días, 
                ${hours} horas, 
                ${minutes} minutos, 
                ${seconds} segundos
            `;

  // Limpio las clases anteriores de los colores
  screenCountDown.classList.remove("green", "orange", "red");

  // Cambio el color del contador según el tiempo restante
  const unMes = 1000 * 60 * 60 * 24 * 30; //Calculo de un mes
  const dosSemanas = 1000 * 60 * 60 * 24 * 14; //Calculo de dos semanas
  const unaSemana = 1000 * 60 * 60 * 24 * 7; //Calculo de una semana

  if (timeRemaining > unMes) {
    screenCountDown.classList.add("green"); // Más de un mes
  } else if (timeRemaining <= unMes && timeRemaining > dosSemanas) {
    screenCountDown.classList.add("orange"); // Entre dos semanas y un mes
  } else if (timeRemaining <= dosSemanas && timeRemaining > unaSemana) {
    screenCountDown.classList.add("orange"); // Entre una semana y dos semanas
  } else if (timeRemaining <= unaSemana) {
    screenCountDown.classList.add("red"); // Menos de una semana
  }
}

  // Establezco un contador que actualiza la cuenta atrás cada segundo
  let counter = setInterval(() => {
    actualizarCuentaAtras();
  }, 1000);
