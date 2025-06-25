import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../communs/formFigther/formFigther'; 
import PersonagemService from '../../../services/PersonagemService';
import styles from './cadastro.module.css'; // Crie este CSS se desejar

function FighterForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [initialData, setInitialData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            PersonagemService.buscarPorId(id)
                .then(response => {
                    setInitialData(response.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Falha ao buscar dados para edição:", err);
                    setError("Não foi possível carregar os dados do lutador.");
                    setIsLoading(false);
                });
        }
    }, [id]);

    const handleSubmit = async (personagemData) => {
        try {
            if (id) {
                await PersonagemService.atualizar(id, personagemData);
                navigate('/', { state: { message: 'Personagem atualizado com sucesso!' } });
            } else {
                await PersonagemService.criar(personagemData);
                navigate('/', { state: { message: 'Personagem criado com sucesso!' } });
            }
        } catch (err) {
            console.error("Falha ao salvar o personagem:", err);
            setError("Não foi possível salvar o personagem. Verifique o console para mais detalhes.");
        }
    };
    
    if (isLoading) {
        return <p>Carregando...</p>;
    }
    
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className={styles.container}>
            <Form 
                onSubmit={handleSubmit} 
                initialData={initialData} 
            />
        </div>
    );
}

export default FighterForm;