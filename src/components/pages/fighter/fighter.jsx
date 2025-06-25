import { useNavigate } from 'react-router-dom';
import Form from '../../communs/formFigther/formFigther'; // Seu import já está correto
import PersonagemService from '../../../services/PersonagemService'; // Ajuste o caminho se necessário
import styles from './Fighter.module.css'; // Opcional: para estilização da página

function Fighter() {
   
    const navigate = useNavigate();

  
    const handleCreateFighter = async (formData) => {
        try {
            // Chama o serviço que se comunica com o seu backend para criar o personagem
            await PersonagemService.createPersonagem(formData);
            
            // Se a criação for bem-sucedida, redireciona o usuário para a lista de personagens
            // e envia uma mensagem de sucesso que pode ser exibida na outra página.
            navigate('/personagens', { state: { message: 'Personagem criado com sucesso!' } });

        } catch (error) {
            // Em caso de erro na comunicação com a API, exibe no console.
            console.error("Falha ao criar o personagem:", error);
            // Você poderia adicionar um alerta para o usuário aqui, por exemplo:
            // alert("Não foi possível criar o personagem. Tente novamente.");
        }
    };

    return (
        <div className={styles.fighterContainer}>
            {/* AQUI ESTÁ A CORREÇÃO PRINCIPAL:
              Nós passamos a função 'handleCreateFighter' para a propriedade (prop) 'onSubmit' do formulário.
              Agora o componente Form sabe exatamente o que fazer quando o botão de "Cadastrar" for clicado.
            */}
            <Form onSubmit={handleCreateFighter} />
        </div>
    );
}

export default Fighter;