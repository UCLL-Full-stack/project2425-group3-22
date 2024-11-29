import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddPoopButton: React.FC = () => {
    return (
        <Link href="/add" className={`addPoopButton`}>
            <FontAwesomeIcon icon="plus" />
        </Link>
    );
};

export default AddPoopButton;
