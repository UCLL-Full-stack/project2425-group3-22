import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@styles/Home.module.css';
import { poopItem } from '@types';
import PoopPanel from './poopPanel';

type Props = {
    isLoading: boolean;
    error: any;
    poops: poopItem[];
};

const PoopContainer: React.FC<Props> = ({isLoading, error, poops}: Props) => {
    return (
        <div className={styles.poopContainer}>
            {isLoading ? (
                <p>Loading ...</p>
            ) : error ? (
                <p>An unexpected error occurred.</p>
            ) : poops && poops.length === 0 ? (
                <p>No poops found.</p>
            ) : (
                poops?.map((poop: poopItem) => <PoopPanel key={poop.poopID} poop={poop} />)
            )}
        </div>
    );
};

export default PoopContainer;
