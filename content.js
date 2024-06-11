function getQuestions() {
  // Selecciona todas las preguntas del formulario
  return document.querySelectorAll('.Qr7Oae');  // Selector basado en la estructura HTML proporcionada
}

function selectFirstAnswer(question) {
  // Selecciona todas las opciones de respuesta dentro de la pregunta
  const options = question.querySelectorAll('.docssharedWizToggleLabeledContainer');
  console.log(`Found ${options.length} options for the question`);

  if (options.length > 0) {
    // Imprime todas las opciones en el log
    options.forEach((option, index) => {
      const optionTextElement = option.querySelector('.aDTYNe.snByac.OvPDhc.OIC90c');
      const optionText = optionTextElement ? optionTextElement.textContent : 'No label text found';
      console.log(`Option ${index}: ${optionText}`);
    });

    // Selecciona la primera opción
    console.log(`Selecting first option`);
    const optionLabel = options[0].querySelector('.Od2TWd');
    if (optionLabel) {
      optionLabel.click();
      console.log(`First option clicked`);
    } else {
      console.error('Option element not found for clicking');
    }
  } else {
    console.log("No options found for this question");
  }
}

function fillFormWithFirstAnswers() {
  const questions = getQuestions();
  console.log(`Found ${questions.length} questions`);
  
  questions.forEach((question, index) => {
    const questionTextElement = question.querySelector('.M7eMe');
    const questionText = questionTextElement ? questionTextElement.textContent : 'No question text found';
    console.log(`Processing question ${index + 1}: ${questionText}`);
    selectFirstAnswer(question);
  });
}

fillFormWithFirstAnswers();