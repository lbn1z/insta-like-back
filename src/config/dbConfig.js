import { MongoClient } from 'mongodb';

// **Função para conectar ao banco de dados MongoDB**
// Essa função estabelece uma conexão com um banco de dados MongoDB utilizando a biblioteca MongoDB Node.js driver.
// Retorna um cliente MongoDB que pode ser usado para realizar operações no banco de dados.
export default async function conectarAoBanco(stringConexao) {
  let mongoClient;

  // Bloco try-catch para lidar com possíveis erros durante a conexão
  try {
    // Cria um novo cliente MongoDB usando a string de conexão fornecida.
    mongoClient = new MongoClient(stringConexao);
    console.log('Conectando ao cluster do banco de dados...');

    // Estabelece a conexão com o banco de dados.
    await mongoClient.connect();
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    // Retorna o cliente MongoDB para uso posterior.
    return mongoClient;
  } catch (erro) {
    // Imprime uma mensagem de erro no console e encerra o processo.
    console.error('Falha na conexão com o banco!', erro);
    process.exit();
  }
}