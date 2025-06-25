import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';
import styles from './formFigther.module.css';

function FormFigther() {
    const [fighterData, setFighterData] = useState({ name: '', style: '', imageUrl: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            api.get(`/fighters/${id}`)
                .then(response => setFighterData(response.data))
                .catch(error => console.error("Erro ao buscar dados do lutador!", error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFighterData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id ? `/fighters/${id}` : '/fighters';

        api[method](url, fighterData)
            .then(() => navigate('/'))
            .catch(error => console.error("Erro ao salvar lutador!", error));
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>{id ? 'Editar Lutador' : 'Cadastrar Lutador'}</h1>
                <input name="name" value={fighterData.name} onChange={handleChange} placeholder="Nome do Lutador" required />
                <input name="style" value={fighterData.style} onChange={handleChange} placeholder="Estilo de Luta" required />
                <input name="imageUrl" value={fighterData.imageUrl} onChange={handleChange} placeholder="URL da Imagem" required />
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default FormFigther;