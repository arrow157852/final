import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormFigther from "../../../communs/formFigther/formFigther";

// O componente se chama 'Home', como solicitado, mas tem a lógica do formulário.
const Home = () => {
  const { id } = useParams(); // Pega o ID da URL, se existir
  const navigate = useNavigate();
  const [personagemData, setPersonagemData] = useState(null); // Estado para guardar os dados do personagem
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  const isEditing = Boolean(id); // Verifica se está em modo de edição

  useEffect(() => {
    // Se estiver editando, busca os dados do personagem na API
    if (isEditing) {
      const fetchPersonagem = async () => {
        try {
          const response = await fetch(`http://localhost:5000`+`/personagens/${id}`);
          if (!response.ok) {
            throw new Error('Personagem não encontrado');
          }
          const data = await response.json();
          setPersonagemData(data); // Armazena os dados no estado
        } catch (error) {
          console.error("Erro ao buscar dados do personagem:", error);
          // Redireciona para a home se o personagem não for encontrado
          navigate("/");
        } finally {
          setIsLoading(false);
        }
      };
      fetchPersonagem();
    } else {
      // Se não estiver editando (modo de cadastro), não precisa carregar dados
      setIsLoading(false);
    }
  }, [id, isEditing, navigate]);

  const handleFormSubmit = async (formData) => {
    const url = isEditing
      ? `http://localhost:5000/personagens/${id}`
      : "http://localhost:5000/personagens";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        body: formData, // O corpo já é um FormData, não precisa de headers
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar o personagem");
      }
      
      console.log("Personagem salvo com sucesso!");
      navigate("/"); // Redireciona para a página principal após o sucesso
    } catch (error) {
      console.error("Erro ao submeter formulário:", error);
    }
  };
  
  // Mostra um indicador de carregamento enquanto busca os dados
  if (isLoading) {
    // Você pode criar um componente de loading mais estiloso depois
    return <div>Carregando informações do lutador...</div>;
  }

  // Renderiza o componente de formulário, passando os dados e a função de submit
  return (
    <FormFigther
      onSubmit={handleFormSubmit}
      initialData={isEditing ? personagemData : null}
    />
  );
};

export default Home;