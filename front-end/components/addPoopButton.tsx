import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@styles/AddPoopButton.module.css';

const AddPoopButton: React.FC = () => {
    return (
        <Link href="/add" className={styles.addPoopButton}>
            <FontAwesomeIcon icon="plus" />
        </Link>
    );
};

export default AddPoopButton;
