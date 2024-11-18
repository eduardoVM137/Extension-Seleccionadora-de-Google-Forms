
# **Auto Google Forms Filler**

Esta extensión para Microsoft Edge permite completar automáticamente las respuestas correctas en un formulario de Google Forms utilizando un archivo JSON proporcionado por ChatGPT.

---

## **Características**

- Selecciona automáticamente las respuestas correctas en formularios de Google Forms.
- Recibe un JSON con las preguntas y las respuestas correctas para procesar el formulario.
- Funciona tanto con opciones de selección única como con casillas de verificación.

---

## **Requisitos**

- **Microsoft Edge** (versión basada en Chromium).
- Archivo JSON con el formato esperado de preguntas y respuestas.

---

## **Instalación**

1. Clona este repositorio o descarga los archivos como un archivo ZIP.
2. Ve a `edge://extensions/` en Microsoft Edge.
3. Activa el "Modo desarrollador" en la parte superior derecha.
4. Haz clic en **"Cargar extensión descomprimida"**.
5. Selecciona la carpeta donde están los archivos de esta extensión.
6. La extensión aparecerá en la barra de extensiones del navegador.

---

## **Uso**

1. Abre un formulario de Google Forms.
2. Haz clic en el icono de la extensión en la barra de herramientas.
3. La extensión procesará automáticamente el formulario y seleccionará las respuestas correctas.

---

## **Formato del JSON**

El archivo JSON debe tener el siguiente formato de ejemplo:

```json
{
  "¿Cuál es la capital de Francia?": "París",
  "¿Cuál es 2 + 2?": "4",
  "¿Qué color tiene el cielo?": "Azul"
}
```

### **Descripción**
- **Clave:** Texto exacto de la pregunta en el formulario.
- **Valor:** Respuesta correcta correspondiente.

---

## **Estructura del Proyecto**

- **`manifest.json`**: Archivo de configuración de la extensión.
- **`background.js`**: Script que gestiona el comportamiento de la extensión en segundo plano.
- **`content.js`**: Script que interactúa con el contenido del formulario de Google Forms.
- **`popup.html`**: Interfaz gráfica de la extensión.
- **`popup.js`**: Lógica para iniciar el script desde el popup.

---

## **Contribuciones**

Si deseas contribuir a este proyecto:

1. Realiza un fork del repositorio.
2. Crea una nueva rama para tus cambios:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza los cambios necesarios y súbelos a tu fork:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
4. Crea un Pull Request en este repositorio.

---

## **Licencia**

Este proyecto está licenciado bajo la Licencia MIT.

---

## **Contacto**

Creador: **Eduardo VM**  
GitHub: [@eduardoVM137](https://github.com/eduardoVM137)
