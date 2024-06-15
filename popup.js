document.getElementById('fillForm').addEventListener('click', () => {
  const claveApi = document.getElementById('apiKey').value;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
      }

      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: ejecutarScript,
          args: [claveApi]
      }, (results) => {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
          } else {
              console.log('Script ejecutado correctamente.', results);
          }
      });
  });
});

/**
 * Función principal que se ejecutará en la pestaña activa.
 * @param {string} claveApi - La clave de API de OpenAI.
 */
function ejecutarScript(claveApi) {
  window.CLAVE_API_OPENAI = claveApi || '';

  /**
   * Envía preguntas a la API de OpenAI y selecciona las respuestas correctas.
   * @param {Array} listaPreguntas - Lista de preguntas extraídas del formulario.
   */
  async function enviarYSeleccionarRespuestas(listaPreguntas) {
      const claveApi = window.CLAVE_API_OPENAI;
      if (claveApi !== '') {
          const prompt = generarPrompt(listaPreguntas);

          const respuesta = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
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
          });

          const datos = await respuesta.json();
          const respuestas = datos.choices[0].text.trim().split('\n').map(linea => parseInt(linea.trim().split('.')[0]) - 1);

          respuestas.forEach((respuesta, indice) => {
              listaPreguntas[indice].respuestaCorrecta = respuesta;
          });
      } else {
          listaPreguntas.forEach(pregunta => {
              pregunta.respuestaCorrecta = 0;
          });
      }

      console.log("Preguntas contestadas: ", listaPreguntas);
      marcarRespuestaCorrectaEnFormulario(listaPreguntas);
  }

  /**
   * Función principal que extrae preguntas y procesa respuestas.
   */
  function principal() {
      const listaPreguntas = extraerPreguntasDelFormulario();
      enviarYSeleccionarRespuestas(listaPreguntas);
  }

  principal();
}
