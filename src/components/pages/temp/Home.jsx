import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; 
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
    
    const [personagens, setPersonagens] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        api.get('/personagens')
            .then(response => {
                setPersonagens(response.data);
                setLoading(false);
            })
            .catch(error => {
                
                console.error("Erro ao buscar personagens!", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
       
        api.delete(`/personagens/${id}`)
            .then(() => {
                
                setPersonagens(personagens.filter(p => p._id !== id));
            })
            .catch(error => {
               
                console.error("Erro ao excluir personagem!", error);
            });
    };

    if (loading) {
        
        return <p>Carregando personagens...</p>;
    }

    return (
        <div className={styles.listContainer}>
            
            <h1>Personagens Cadastrados</h1>
            <div className={styles.fightersGrid}>
                
                {personagens.map(personagem => (
                    <div key={personagem._id} className={styles.fighterCard}>
                        
                        <img src={personagem.imageUrl} alt={personagem.name} className={styles.fighterImage} />
                        <h2>{personagem.name}</h2>
                        <p>{personagem.style}</p>
                        <div className={styles.actions}>
                            <Link to={`/editar/${personagem._id}`} className={styles.editButton}>Editar</Link>
                            <button onClick={() => handleDelete(personagem._id)} className={styles.deleteButton}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;