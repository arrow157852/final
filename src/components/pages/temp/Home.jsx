import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
    const [fighters, setFighters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/fighters')
            .then(response => {
                setFighters(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar lutadores!", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        api.delete(`/fighters/${id}`)
            .then(() => {
                setFighters(fighters.filter(fighter => fighter._id !== id));
            })
            .catch(error => console.error("Erro ao excluir lutador!", error));
    };

    if (loading) {
        return <p>Carregando lutadores...</p>;
    }

    return (
        <div className={styles.listContainer}>
            <h1>Lutadores Cadastrados</h1>
            <div className={styles.fightersGrid}>
                {fighters.map(fighter => (
                    <div key={fighter._id} className={styles.fighterCard}>
                        <img src={fighter.imageUrl} alt={fighter.name} className={styles.fighterImage} />
                        <h2>{fighter.name}</h2>
                        <p>{fighter.style}</p>
                        <div className={styles.actions}>
                            <Link to={`/editar/${fighter._id}`} className={styles.editButton}>Editar</Link>
                            <button onClick={() => handleDelete(fighter._id)} className={styles.deleteButton}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;