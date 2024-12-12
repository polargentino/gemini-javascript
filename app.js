const API_KEY = "AIzaSyDHa2meK2nWqF9N3uh5EZDfBJhTsg6c_YY"; // Reemplaza con tu clave de API válida

// Función para obtener la respuesta de Gemini
async function getCompletion(prompt) {
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + API_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  return await res.json();
}

// Obtener elementos del DOM
const prompt = document.querySelector("#prompt");
const button = document.querySelector("#generate");
const output = document.querySelector("#output");

button.addEventListener("click", async () => {
  if (!prompt.value) return;

  output.innerHTML = "Generando respuesta...";

  try {
    // Llamada a la función para obtener la respuesta
    const response = await getCompletion(prompt.value);

    if (response.candidates && response.candidates.length > 0) {
      // Extraemos la respuesta del primer candidato
      output.innerHTML = response.candidates[0].content.parts[0].text;
    } else {
      output.innerHTML = "No se obtuvo respuesta válida.";
    }
  } catch (error) {
    output.innerHTML = "Ocurrió un error al conectarse a la API.";
    console.error(error);
  }
});

