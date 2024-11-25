// Importa funções para manipulação de posts do modelo
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModels.js";
// Importa módulo para manipulação de arquivos
import fs from "fs";
// Importa função para gerar descrições usando o modelo Gemini
import gerarDescricaoComGemini from "../services/geminiService.js"

// Lista todos os posts existentes
export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados
  const posts = await getTodosPosts();
  // Retorna os posts em formato JSON com status 200 (sucesso)
  res.status(200).json(posts);
};

// Cria um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição
  const novoPost = req.body;
  try {
    // Cria o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Retorna o post criado em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch(erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);
    // Retorna uma mensagem de erro em formato JSON com status 500 (erro interno do servidor)
    res.status(500).json({"Erro":"Falha na requisição"})
  } 
}

// Faz o upload de uma imagem e cria um novo post
export async function uploadImagem(req, res) {
  // Cria um novo objeto de post com os dados da imagem
  const novoPost = {
    descricao: "", // Descrição será gerada posteriormente
    imgUrl: req.file.originalname, // Nome original do arquivo
    alt: "" // Texto alternativo para a imagem
  }
  try {
    // Cria o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Renomeia o arquivo para incluir o ID do post e salva no diretório "uploads"
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
    fs.renameSync(req.file.path, imagemAtualizada)
    // Retorna o post criado em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch(erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);
    // Retorna uma mensagem de erro em formato JSON com status 500 (erro interno do servidor)
    res.status(500).json({"Erro":"Falha na requisição"});
  } 
}

// Atualiza um post existente com uma nova imagem e descrição gerada pelo Gemini
export async function atualizarNovoPost(req, res) {
  // Obtém o ID do post a ser atualizado dos parâmetros da requisição
  const id  = req.params.id;
  // Constrói a URL completa da imagem
  const urlImagem = `http://localhost:3000/${id}.png`

  try {
    // Lê o conteúdo da imagem como um buffer
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    // Gera uma descrição para a imagem usando o modelo Gemini
    const descricao =  await gerarDescricaoComGemini(imgBuffer)

    // Cria um objeto com os dados atualizados do post
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }

    // Atualiza o post no banco de dados
    const postCriado = await atualizarPost(id, post);
    // Retorna o post atualizado em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch(erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);
    // Retorna uma mensagem de erro em formato JSON com status 500 (erro interno do servidor)
    res.status(500).json({"Erro":"Falha na requisição"});
  } 
}