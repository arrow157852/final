import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

// Componente reutilizável para o upload
function ImageUploader({ onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Função chamada quando o arquivo é solto na área
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);
    // Usando o nome do seu preset
    formData.append('upload_preset', 'personagens_unsigned');

    try {
      // Fazendo a requisição POST diretamente para a API do Cloudinary com o seu cloud name
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dyutsu2tf/image/upload',
        formData
      );

      // Extrai a URL segura da resposta do Cloudinary
      const imageUrl = response.data.secure_url;

      // Chama a função do componente pai para atualizar o estado do formulário
      onUploadSuccess(imageUrl);
      
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.jpg'] },
    multiple: false,
  });

  const dropzoneStyle = {
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '10px',
    backgroundColor: isDragActive ? '#f0f0f0' : '#fafafa'
  };

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isUploading ? (
        <p>Enviando imagem...</p>
      ) : preview ? (
        <img src={preview} alt="Pré-visualização" style={{ maxWidth: '100%', maxHeight: '200px' }} />
      ) : isDragActive ? (
        <p>Solte a imagem aqui...</p>
      ) : (
        <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
      )}
    </div>
  );
}

export default ImageUploader;