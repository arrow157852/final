import api from './api'; // Seu arquivo de configuração do Axios

const PersonagemService = {
    criar: (data) => {
        // Envia o objeto 'data' como JSON
        return api.post('/personagens', data);
    },

    buscarTodos: () => {
        return api.get('/personagens');
    },

    buscarPorId: (id) => {
        return api.get(`/personagens/${id}`);
    },

    atualizar: (id, data) => {
        // Envia o objeto 'data' como JSON para a rota de atualização
        return api.put(`/personagens/${id}`, data);
    },

    deletar: (id) => {
        return api.delete(`/personagens/${id}`);
    }
};

export default PersonagemService;