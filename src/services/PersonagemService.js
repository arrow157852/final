
import api from './api';

class PersonagemService {
  // Listar todos os personagens
  static async listar() {
    const response = await api.get('/personagens');
    return response.data;
  }

  // Buscar personagem por ID
  static async buscarPorId(id) {
    const response = await api.get(`/personagens/${id}`);
    return response.data;
  }

  // Criar personagem
  static async criar(dados) {
    const response = await api.post('/personagens', dados);
    return response.data;
  }

  // Atualizar personagem
  static async atualizar(id, dados) {
    const response = await api.put(`/personagens/${id}`, dados);
    return response.data;
  }

  // Deletar personagem
  static async deletar(id) {
    const response = await api.delete(`/personagens/${id}`);
    return response.data;
  }
}

export default PersonagemService;
