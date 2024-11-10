import { poopItem } from '@types';
import Link from 'next/link';
import styles from '@styles/poopPanel.module.css';
import { useRouter } from 'next/router';

type Props = {
    poop: poopItem;
};

const PoopPanel: React.FC<Props> = ({ poop }: Props) => {
    const username = 'Lander Dirix'; // TODO get hardcoded username from backend
    const firstLetter = username.charAt(0).toUpperCase();

    return (
        <div className={styles.poopItem}>
            <div className={styles.nameContainer}>
                <div className={styles.userIcon}>{firstLetter}</div>
                <div>
                    <p>{username}</p>
                    <p>
                        {new Date(poop.dateTime).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </div>
            </div>
            <h2>{poop.title}</h2>

            <p>rating: {poop.rating}</p>
            <p>size: {poop.size}</p>
            <p>colorID: {poop.colorID}</p>
            <p>type: {poop.type}</p>
        </div>
    );
};

export default PoopPanel;
