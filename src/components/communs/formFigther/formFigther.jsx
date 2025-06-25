import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./formFigther.module.css";
import Button from "../button/button";

const FormFigther = ({ onSubmit, initialData }) => {
  const [personagem, setPersonagem] = useState({
    nome: "",
    tipoDeLuta: "",
    poderSpecial: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  
  // NOVO: Estado para controlar o carregamento durante o envio
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setPersonagem({
        nome: initialData.nome || "",
        tipoDeLuta: initialData.tipoDeLuta || "",
        poderSpecial: initialData.poderSpecial || "",
      });
      
      // Se houver uma imagem inicial (URL do servidor), define a pré-visualização
      if (initialData.imagem) {
        setPreview(initialData.imagem);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonagem({ ...personagem, [name]: value });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, []);
  
  // NOVO: Função para remover a imagem selecionada
  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Impede que o clique acione a seleção de arquivo
    setFile(null);
    setPreview(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Impede envios múltiplos

    // Ativa o estado de carregamento
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("nome", personagem.nome);
    formData.append("tipoDeLuta", personagem.tipoDeLuta);
    formData.append("poderSpecial", personagem.poderSpecial);
    
    // Anexa o arquivo de imagem apenas se um NOVO arquivo foi selecionado
    if (file) {
      formData.append("imagem", file);
    }
    
    try {
        await onSubmit(formData); // Chama a função de envio que veio da página pai
    } catch (error) {
        console.error("Erro no envio do formulário:", error);
    } finally {
        // Desativa o estado de carregamento, mesmo se houver erro
        setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>{initialData ? "Editar Personagem" : "Cadastrar Personagem"}</h1>

        {/* Área de Drag and Drop */}
        <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}>
          <input {...getInputProps()} />
          {preview ? (
            <div className={styles.previewContainer}>
              <img src={preview} alt="Preview" className={styles.previewImage} />
              {/* NOVO: Botão para remover a imagem */}
              <button type="button" onClick={handleRemoveImage} className={styles.removeImageButton}>
                remover
              </button>
            </div>
          ) : (
            <p>Arraste uma imagem para cá ou clique para selecionar</p>
          )}
        </div>

        <input
          type="text"
          name="nome"
          value={personagem.nome}
          onChange={handleChange}
          placeholder="Nome do Personagem"
          required
        />
        <input
          type="text"
          name="tipoDeLuta"
          value={personagem.tipoDeLuta}
          onChange={handleChange}
          placeholder="Tipo de luta do Personagem"
          required
        />
        <input
          type="text"
          name="poderSpecial"
          value={personagem.poderSpecial}
          onChange={handleChange}
          placeholder="Poder do Personagem"
          required
        />
        
        {/* BOTÃO ATUALIZADO:
            - O texto muda para "Enviando..." durante o carregamento.
            - O botão fica desabilitado durante o carregamento.
         */}
        <Button 
          name={isSubmitting ? "Enviando..." : (initialData ? "Salvar Alterações" : "Cadastrar")} 
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default FormFigther;