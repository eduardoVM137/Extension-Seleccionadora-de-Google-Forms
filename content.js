/**
 * Envía las preguntas a la API de OpenAI y recibe las respuestas.
 * @param {Array} listaPreguntas - Lista de preguntas extraídas del formulario.
 * @returns {Promise<Array>} - Lista de preguntas con las respuestas correctas seleccionadas.
 */
function enviarYRecibirPromt(listaPreguntas) {
  const claveApi = window.CLAVE_API_OPENAI;
  if (claveApi !== '') {
      const prompt = generarPrompt(listaPreguntas);

      return fetch('https://api.openai.com/v1/engines/davinci/completions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${claveApi}`
          },
          body: JSON.stringify({
              prompt: prompt,
              max_tokens: 100,
              n: 1,
              stop: null,
              temperature: 0.7
          })
      })
      .then(respuesta => respuesta.json())
      .then(datos => {
          const respuestas = datos.choices[0].text.trim().split('\n').map(linea => parseInt(linea.trim().split('.')[0]) - 1);
          respuestas.forEach((respuesta, indice) => {
              listaPreguntas[indice].respuestaCorrecta = respuesta;
          });
          return listaPreguntas;
      });
  } else {
      listaPreguntas.forEach(pregunta => {
          pregunta.respuestaCorrecta = 0;
      });
      return Promise.resolve(listaPreguntas);
  }
}

/**
 * Marca las respuestas correctas en el formulario.
 * @param {Array} listaPreguntas - Lista de preguntas con las respuestas correctas seleccionadas.
 */
function marcarRespuestaCorrectaEnFormulario(listaPreguntas) {
  listaPreguntas.forEach((pregunta, indice) => {
      const elementoPregunta = obtenerPreguntas()[indice];
      const opciones = elementoPregunta.querySelectorAll('.docssharedWizToggleLabeledContainer');

      if (opciones.length > 0) {
          const indiceOpcionCorrecta = pregunta.respuestaCorrecta;
          const etiquetaOpcion = opciones[indiceOpcionCorrecta].querySelector('.Od2TWd');
          if (etiquetaOpcion) {
              etiquetaOpcion.click();
              console.log(`Opción ${indiceOpcionCorrecta + 1} seleccionada para la pregunta ${indice + 1}`);
          } else {
              console.error(`No se encontró el elemento de la opción para la pregunta ${indice + 1}`);
          }
      } else {
          console.log(`No se encontraron opciones para la pregunta ${indice + 1}`);
      }
  });
}

/**
 * Extrae las preguntas del formulario.
 * @returns {Array} - Lista de preguntas extraídas del formulario.
 */
function extraerPreguntasDelFormulario() {
  const preguntas = obtenerPreguntas();
  const listaPreguntas = [];

  preguntas.forEach((pregunta, indice) => {
      const elementoTextoPregunta = pregunta.querySelector('.M7eMe');
      const textoPregunta = elementoTextoPregunta ? elementoTextoPregunta.textContent.trim() : 'No se encontró texto de la pregunta';

      const opciones = pregunta.querySelectorAll('.docssharedWizToggleLabeledContainer');
      const textosOpciones = [];

      opciones.forEach((opcion, indice) => {
          const elementoTextoOpcion = opcion.querySelector('.aDTYNe.snByac.OvPDhc.OIC90c');
          const textoOpcion = elementoTextoOpcion ? elementoTextoOpcion.textContent.trim() : 'No se encontró el texto de la opción';
          textosOpciones.push(textoOpcion);
      });

      listaPreguntas.push({
          pregunta: textoPregunta,
          opciones: textosOpciones,
          respuestaCorrecta: 0
      });
  });

  return listaPreguntas;
}

/**
 * Genera el prompt para enviar a la API de OpenAI.
 * @param {Array} listaPreguntas - Lista de preguntas extraídas del formulario.
 * @returns {string} - El prompt generado.
 */
function generarPrompt(listaPreguntas){
  let prompt = "Please provide the index (starting from 0) of the correct answer for each question:\n";
  listaPreguntas.forEach((item, indice) => {
      prompt += `\n${indice + 1}. Pregunta: ${item.pregunta}\nOpciones: ${item.opciones.join(', ')}\n`;
  });

  console.log(prompt);
  return prompt;
}

/**
 * Obtiene los elementos de las preguntas del formulario.
 * @returns {NodeList} - Lista de elementos de preguntas.
 */
function obtenerPreguntas() {
  return document.querySelectorAll('.geS5n'); 
}
