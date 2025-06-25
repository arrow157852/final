import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <div>
            <nav className={styles.navbar}>
                <Link to="/">Lista de Lutadores</Link>
                <Link to="/cadastro">Cadastrar Novo</Link>
            </nav>
        </div>
    );
}

export default Navbar;