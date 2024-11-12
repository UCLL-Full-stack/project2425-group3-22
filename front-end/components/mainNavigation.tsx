import { poopItem } from '@types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@styles/MainNavigation.module.css';


type Props = {
    isAdmin: boolean;
};

const MainNavigation: React.FC<Props> = ({ isAdmin }: Props) => {
    const router = useRouter();
    const username = 'Lander Dirix';
    const firstLetter = username.charAt(0).toUpperCase();

    return (
        <div className={styles.mainNavigation}>
            <Link className={styles.logo} href="/">Poopedia</Link>
        </div>
    );
};

export default MainNavigation;
