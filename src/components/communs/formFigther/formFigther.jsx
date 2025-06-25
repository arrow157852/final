import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./formFigther.module.css";
import Button from "../button/button";

// O componente agora recebe 'initialData' como propriedade
const FormFigther = ({ onSubmit, initialData }) => {
  const [personagem, setPersonagem] = useState({
    nome: "",
    tipoDeLuta: "",
    poderSpecial: "",

  });
  const [file, setFile] = useState(null); // Estado para o arquivo da imagem
  const [preview, setPreview] = useState(null); // Estado para o preview da imagem

  // Efeito para preencher o formulário quando 'initialData' for recebido
  useEffect(() => {
    if (initialData) {
      setPersonagem({
        nome: initialData.nome || "",
        tipoDeLuta: initialData.tipoDeLuta || "",
        poderSpecial: initialData.poderSpecial || "",
      });
      
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", personagem.nome);
    formData.append("tipoDeLuta", personagem.tipoDeLuta);
    formData.append("poderSpecial", personagem.poderSpecial);
    
    if (file) {
      formData.append("imagem", file);
    }
    onSubmit(formData);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>{initialData ? "Editar Personagem" : "Cadastrar Personagem"}</h1>

        {/* Área de Drag and Drop */}
        <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}>
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" className={styles.previewImage} />
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
          placeholder="tipo de luta  do Personagem"
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
        
        <Button name={initialData ? "Salvar Alterações" : "Cadastrar"} type="submit" />
      </form>
    </div>
  );
};

export default FormFigther;