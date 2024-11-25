import express from "express";
// Importa o framework Express.js para criar a aplicação web.

import routes from "./src/routes/postsRoutes.js";
// Importa as rotas definidas no arquivo postsRoutes.js. Essas rotas definem as diferentes 
// URLs que a aplicação pode atender e as ações a serem realizadas para cada URL.

const app = express();
// Cria uma nova instância do aplicativo Express.js. Essa instância será usada para definir as rotas,
// middleware e outras configurações da aplicação.

app.use(express.static("uploads"));
// Configura o diretório "uploads" como um diretório estático. Isso significa que os arquivos 
// dentro desse diretório podem ser acessados diretamente pelo navegador, por exemplo,
// se você tiver imagens ou outros arquivos que deseja servir diretamente.

routes(app);
// Chama a função `routes` que foi importada, passando a instância do aplicativo Express como parâmetro. 
// Essa função provavelmente adiciona as rotas definidas em postsRoutes.js ao aplicativo.

app.listen(3000, () => {
  console.log("Servidor iniciado");
});
// Inicia o servidor Express na porta 3000. Quando o servidor estiver ouvindo nessa porta,
// a mensagem "Servidor iniciado" será exibida no console.