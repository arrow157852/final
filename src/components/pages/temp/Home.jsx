import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PersonagemService from '../../../services/PersonagemService';
import styles from './Home.module.css';

function Home() {
    const [personagens, setPersonagens] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        const fetchPersonagens = async () => {
            try {
                const response = await PersonagemService.buscarTodos();
                setPersonagens(response.data);
            } catch (err) {
                console.error("Erro ao buscar personagens:", err);
                setError("Não foi possível carregar os personagens.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPersonagens();
    }, []);
    
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este personagem?')) {
            try {
                await PersonagemService.deletar(id);
                setPersonagens(personagens.filter(p => p.id !== id));
            } catch (err) {
                alert("Não foi possível deletar o personagem.");
            }
        }
    };

    if (isLoading) return <p>Carregando personagens...</p>;
    if (error) return <p className={styles.error_message}>{error}</p>;

    return (
        <div className={styles.formContainer}>
            {message && <div className={styles.success_message}>{message}</div>}
            <h1 className={styles.page_title}>Personagens</h1>
            <div className={styles.personagens_container}>
                {personagens.length > 0 ? (
                    personagens.map(personagem => (
                        <div key={personagem.id} className={styles.personagem_card}>
                            <img 
                                src={personagem.imagem || 'https://via.placeholder.com/250'} 
                                alt={personagem.name} // <-- MUDANÇA AQUI
                                className={styles.personagem_imagem} 
                            />
                            {/* --- MUDANÇAS ABAIXO para usar os novos nomes --- */}
                            <h2>{personagem.name}</h2>
                            <p><strong>Tipo:</strong> {personagem.tipo}</p>
                            <p><strong>Especial:</strong> {personagem.especial}</p>
                            
                            <div className={styles.personagem_actions}>
                                <Link to={`/editar/${personagem.id}`} className={styles.button}>Editar</Link>
                                <button onClick={() => handleDelete(personagem.id)} className={styles.button}>Deletar</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
                        <p>Nenhum personagem cadastrado.</p>
                        <p>
                            <Link to="/cadastro" className={styles.link_cadastro}>Cadastre o primeiro!</Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;