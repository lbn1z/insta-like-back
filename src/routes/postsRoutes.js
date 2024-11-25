import express from "express"; // Importa o módulo Express para criar a aplicação web
import multer from "multer"; // Importa o módulo Multer para upload de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções controladoras de posts
import cors from "cors"; // Importa o módulo CORS para configuração de compartilhamento de recursos de origem cruzada

// Configurações para CORS (opcional, ajuste conforme sua necessidade)
const corsOption = {
  origin: "http://localhost:8000", // Define a origem permitida para requisições CORS
  optionsSuccessStatus: 200, // Código de status para respostas bem-sucedidas de opções CORS
};

// Configurações para armazenamento de arquivos (ajuste conforme a necessidade)
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // Função para definir o diretório de destino dos uploads
    cb(null, "uploads/"); // Define o diretório "uploads" para salvar os arquivos
  },
  filename: function (req, file, cb) { // Função para definir o nome do arquivo
    cb(null, file.originalname); // Utiliza o nome original do arquivo
  },
});

// Instância do middleware Multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Aplica o middleware express.json() para parsear requisições JSON
  app.use(express.json()); 

  // Aplica o middleware CORS com as configurações definidas em corsOption (opcional)
  app.use(cors(corsOption));

  // Rotas da API para posts
  app.get("/posts", listarPosts); // Rota GET para listar todos os posts
  app.post("/posts", postarNovoPost); // Rota POST para criar um novo post
  app.post("/upload", upload.single("imagem"), uploadImagem); // Rota POST para upload de imagem e criação de post
  app.put("/upload/:id", atualizarNovoPost); // Rota PUT para atualizar um post existente

  // ... (adicione outras rotas necessárias)
};

// Exporta a função routes para ser utilizada em outro arquivo
export default routes;