function extractQuestionsFromForm() {
  const questions = getQuestions();
  const listaPreguntas = [];

  questions.forEach((question, index) => {
    const questionTextElement = question.querySelector('.M7eMe');
    const questionText = questionTextElement ? questionTextElement.textContent : 'No question text found';

    const options = question.querySelectorAll('.docssharedWizToggleLabeledContainer');
    const opciones = [];

    options.forEach((option, index) => {
      const optionTextElement = option.querySelector('.aDTYNe.snByac.OvPDhc.OIC90c');
      const optionText = optionTextElement ? optionTextElement.textContent : 'No label text found';
      opciones.push(optionText);
    });

    const respuestaCorrectaIndex = 0; // Por defecto seleccionamos la primera opción como respuesta correcta
    listaPreguntas.push({
      pregunta: questionText,
      opciones: opciones,
      respuestaCorrecta: respuestaCorrectaIndex
    });
  });

  return listaPreguntas;
}

function printQuestionsWithOptions(listaPreguntas) {
  listaPreguntas.forEach((pregunta, index) => {
    console.log(`Pregunta ${index + 1}: ${pregunta.pregunta}`);
    console.log("Opciones:");
    pregunta.opciones.forEach((opcion, indice) => {
      console.log(`${indice + 1}. ${opcion}`);
    });
    console.log("Respuesta correcta:", pregunta.opciones[pregunta.respuestaCorrecta]);
    console.log("------------------");
  });
  console.log(listaPreguntas);
}

function getQuestions() {
  // Selecciona todas las preguntas del formulario
  return document.querySelectorAll('.Qr7Oae');  // Selector basado en la estructura HTML proporcionada
}
const listaPreguntas = extractQuestionsFromForm();
printQuestionsWithOptions(listaPreguntas);
