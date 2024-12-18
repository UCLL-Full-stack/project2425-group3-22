import { achievementItem } from '@types';
import styles from '@styles/AchievementOverview.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
    achievement: achievementItem;
};

const AchievementItem: React.FC<Props> = ({ achievement }: Props) => {
    const router = useRouter();
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            setLanguage(url.includes('/nl') ? 'nl' : 'en');
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <div className={styles.achievement}>
            {achievement.achievedLevel >= 0 && achievement.achievedLevel <= 3 && (
                <img
                    className={styles.achievementIcon}
                    src={`/achievementLevels/achievementLevel${achievement.achievedLevel}.png`}
                    alt={`Achievement level ${achievement.achievedLevel} icon`}
                />
            )}
            <h3>{achievement.name}</h3>
            {language === 'en' ? (
                <p className={styles.description}>{achievement.description.english}</p>
            ) : (
                <p className={styles.description}>{achievement.description.nederlands}</p>
            )}
            <div className={styles.spacer} />
            <p className={styles.nextLevel}>{achievement.nextLevel}</p>
        </div>
    );
};

/*
achievedAt: Date,
    achievedLevel: number,
    achievementID: number,
    achievementCode: string,
    description: {english: string, nederlands: string},
    name: string,
    nextLevel: string
*/

export default AchievementItem;
