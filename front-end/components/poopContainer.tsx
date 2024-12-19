import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@styles/Home.module.css';
import { poopItem } from '@types';
import PoopPanel from './poopPanel';
import { useTranslation } from 'react-i18next';

type Props = {
    isLoading: boolean;
    error: any;
    poops: poopItem[];
};

const PoopContainer: React.FC<Props> = ({isLoading, error, poops}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.poopContainer}>
            {isLoading ? (
                <p>{t('loading')}</p>
            ) : error ? (
                <p>{t('unexpectedError')}</p>
            ) : poops && poops.length === 0 ? (
                <p>{t('home.noPoopsFound')}</p>
            ) : (
                poops?.map((poop: poopItem) => <PoopPanel key={poop.poopID} poop={poop} />)
            )}
        </div>
    );
};

export default PoopContainer;
