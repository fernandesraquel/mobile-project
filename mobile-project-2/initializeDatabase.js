import { createTable } from './src/data/database';

// Função para inicializar o banco de dados
export const initializeDatabase = async () => {
  try {
    await createTable();
    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
  }
};
