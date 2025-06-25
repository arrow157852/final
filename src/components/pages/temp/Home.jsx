import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PersonagemService from '../../../services/PersonagemService';
import styles from './Home.module.css';

const Home = () => {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    const fetchPersonagens = async () => {
      try {
        setLoading(true);
        const data = await PersonagemService.listar();
        setPersonagens(data);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os personagens. O servidor está rodando?");
        console.error("Erro ao buscar personagens:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonagens();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Tem certeza que deseja excluir este personagem?");
    if (isConfirmed) {
      try {
        await PersonagemService.deletar(id);
        setPersonagens(personagens.filter((p) => p.id !== id));
      } catch (err) {
        setError("Erro ao deletar o personagem.");
        console.error("Erro ao deletar personagem:", err);
      }
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'VT323, monospace', color: 'var(--cor-texto)' }}>Carregando...</p>;
  }

  return (
    <div className={styles.formContainer}>
      {/* Título da página, agora posicionado corretamente */}
      <h1 className={styles.page_title}>Personagens do Jogo</h1>

      {/* Container principal com a borda, contendo a lógica de listagem */}
      <div className={styles.form}>
        {message && <p className={styles.success_message}>{message}</p>}
        {error && <p className={styles.error_message}>{error}</p>}

        {personagens.length === 0 && !loading ? (
          <p>
            Nenhum personagem cadastrado ainda. <Link to="/cadastro" className={styles.link_cadastro}>Crie o primeiro!</Link>
          </p>
        ) : (
          <div className={styles.personagens_container}>
            {personagens.map((personagem) => (
              <div key={personagem.id} className={styles.personagem_card}>
                {personagem.imagem && (
                  <img
                    src={`data:${personagem.imagem.contentType};base64,${personagem.imagem.data}`}
                    alt={personagem.nome}
                    className={styles.personagem_imagem}
                  />
                )}
                <h2>{personagem.nome}</h2>
                <p>
                  <strong>Tipo de Luta:</strong> {personagem.tipo_luta}
                </p>
                <p>
                  <strong>Especial:</strong> {personagem.especial}
                </p>
                <p>
                  <strong>Idade:</strong> {personagem.idade}
                </p>
                <div className={styles.personagem_actions}>
                  <Link to={`/editar/${personagem.id}`} className={styles.button}>Editar</Link>
                  <button onClick={() => handleDelete(personagem.id)} className={styles.button}>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;