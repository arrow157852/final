import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api'; 
import styles from './formFigther.module.css';

function FormFigther() {
    
    const [personagemData, setPersonagemData] = useState({ name: '', style: '', imageUrl: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            
            api.get(`/personagens/${id}`)
                .then(response => setPersonagemData(response.data))
                .catch(error => console.error("Erro ao buscar dados do personagem!", error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonagemData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'put' : 'post';
        
        const url = id ? `/personagens/${id}` : '/personagens';

        api[method](url, personagemData)
            .then(() => navigate('/'))
            .catch(error => console.error("Erro ao salvar personagem!", error));
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                <h1>{id ? 'Editar Personagem' : 'Cadastrar Personagem'}</h1>
                <input name="name" value={personagemData.name} onChange={handleChange} placeholder="Nome do Personagem" required />
                <input name="style" value={personagemData.style} onChange={handleChange} placeholder="Estilo de Luta" required />
                <input name="imageUrl" value={personagemData.imageUrl} onChange={handleChange} placeholder="URL da Imagem" required />
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default FormFigther;