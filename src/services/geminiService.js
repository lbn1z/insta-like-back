import { GoogleGenerativeAI } from "@google/generative-ai";

// Importa a biblioteca do Google Generative AI para interagir com os modelos de linguagem.
// A classe GoogleGenerativeAI é usada para criar instâncias de modelos e gerar texto.

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Cria uma nova instância do cliente Google Generative AI, utilizando a chave API armazenada na variável de ambiente GEMINI_API_KEY.
// Essa chave é necessária para autenticar as requisições à API.

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Seleciona o modelo de linguagem "gemini-1.5-flash" para gerar as descrições.
// Esse modelo é conhecido por sua capacidade de gerar texto de alta qualidade e coerente.

export default async function gerarDescricaoComGemini(imageBuffer) {
  // Função assíncrona que gera uma descrição textual para uma imagem fornecida.
  //
  // Parâmetros:
  //  - imageBuffer: Um buffer de imagem que contém os dados da imagem a ser descrita.

  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem";
  // Define o prompt que será enviado para o modelo de linguagem.
  // O prompt instrui o modelo a gerar uma descrição em português brasileiro para a imagem.

  try {
    // Tenta executar o código dentro do bloco try.
    // Se ocorrer algum erro, o bloco catch será executado.

    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Converte a imagem para o formato base64.
        mimeType: "image/png", // Define o tipo MIME da imagem (neste caso, PNG).
      },
    };
    // Cria um objeto que representa a imagem, incluindo os dados em base64 e o tipo MIME.
    // Esse objeto será enviado para o modelo como parte da entrada.

    const res = await model.generateContent([prompt, image]);
    // Envia o prompt e a imagem para o modelo de linguagem e aguarda a resposta.
    // O método generateContent retorna um objeto que contém o texto gerado.

    return res.response.text() || "Alt-text não disponível.";
    // Retorna o texto gerado pela inteligência artificial.
    // Se ocorrer algum erro durante a geração do texto, retorna uma mensagem padrão.
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante a execução da função.
    console.error("Erro ao obter alt-text:", erro.message, erro);
    // Imprime uma mensagem de erro no console, incluindo a mensagem de erro original.
    throw new Error("Erro ao obter o alt-text do Gemini.");
    // Lança uma nova exceção para indicar que ocorreu um erro durante a geração do alt-text.
  }
}