import axios from 'axios';

// Valores adaptados da sua imagem do painel do Cloudinary
const UPLOAD_PRESET = 'personagens_unsigned';
const CLOUD_NAME = 'dyutsu2tf';

const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/**
 * Faz o upload de um arquivo para o Cloudinary
 * @param {File} file - O arquivo de imagem a ser enviado
 * @returns {Promise<string>} - A URL segura da imagem enviada
 */
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await axios.post(API_URL, formData);
        return response.data.secure_url; // Retorna a URL segura da imagem
    } catch (error) {
        console.error('Erro ao fazer upload para o Cloudinary:', error);
        throw new Error('Falha no upload da imagem.');
    }
};