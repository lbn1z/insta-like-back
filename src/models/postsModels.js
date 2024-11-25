import 'dotenv/config'; // Importando o módulo dotenv para carregar as variáveis de ambiente
import { ObjectId } from "mongodb"; // Importando o objeto ObjectId do MongoDB para manipulação de IDs
import conectarAoBanco from "../config/dbConfig.js"; // Importando a função para conectar ao banco de dados

// Conectando ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função para obter todos os posts
export async function getTodosPosts() {
  const db = conexao.db("imersao"); // Selecionando o banco de dados "imersao"
  const colecao = db.collection("posts"); // Selecionando a coleção "posts"
  return colecao.find().toArray(); // Encontrando todos os documentos e retornando como um array
}

// Função para criar um novo post
export async function criarPost(novoPost) {
  const db = conexao.db("imersao"); // Selecionando o banco de dados "imersao"
  const colecao = db.collection("posts"); // Selecionando a coleção "posts"
  return colecao.insertOne(novoPost); // Inserindo um novo documento na coleção
}

// Função para atualizar um post existente
export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao"); // Selecionando o banco de dados "imersao"
  const colecao = db.collection("posts"); // Selecionando a coleção "posts"
  const objID = ObjectId.createFromHexString(id); // Convertendo o ID de string hexadecimal para ObjectId do MongoDB
  return colecao.updateOne({ _id: new ObjectId(objID)}, {$set: novoPost}); // Filtrando o documento pelo ID e Atualizando os campos do documento com os novos valores
 
}