import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./formFigther.module.css";
import Button from "../button/button";
import { uploadImage } from "../../../services/cloudinary";

const FormFigther = ({ onSubmit, initialData }) => {
  // --- MUDANÇA AQUI: Nomes das variáveis no estado ---
  const [personagem, setPersonagem] = useState({
    name: "",
    tipo: "",
    especial: "",
    imagem: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      // --- MUDANÇA AQUI: Usando os novos nomes para popular o formulário ---
      setPersonagem({
        name: initialData.name || "",
        tipo: initialData.tipo || "",
        especial: initialData.especial || "",
        imagem: initialData.imagem || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonagem({ ...personagem, [name]: value });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await uploadImage(file);
        setPersonagem(prevState => ({ ...prevState, imagem: url }));
      } catch (error) {
        alert("Falha ao enviar a imagem.");
      } finally {
        setIsUploading(false);
      }
    }
  }, []);

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPersonagem(prevState => ({ ...prevState, imagem: "" }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    disabled: isUploading,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isUploading) return;
    setIsSubmitting(true);
    try {
      await onSubmit(personagem);
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>{initialData ? "Editar Personagem" : "Cadastrar Personagem"}</h1>

        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} />
          {isUploading ? <p>Enviando imagem...</p> : 
           personagem.imagem ? (
            <div>
              <img src={personagem.imagem} alt="Preview" className={styles.previewImage} />
              <button type="button" onClick={handleRemoveImage}>remover</button>
            </div>
          ) : (
            <p>Arraste uma imagem ou clique para selecionar</p>
          )}
        </div>

        {/* --- MUDANÇA AQUI: 'name' e 'value' dos inputs --- */}
        <input type="text" name="name" value={personagem.name} onChange={handleChange} placeholder="Nome do Personagem" required />
        <input type="text" name="tipo" value={personagem.tipo} onChange={handleChange} placeholder="Tipo de luta" required />
        <input type="text" name="especial" value={personagem.especial} onChange={handleChange} placeholder="Poder Especial" required />
        
        <Button 
          name={isSubmitting ? "Salvando..." : (initialData ? "Salvar Alterações" : "Cadastrar")} 
          type="submit"
          disabled={isSubmitting || isUploading}
        />
      </form>
    </div>
  );
};

export default FormFigther;