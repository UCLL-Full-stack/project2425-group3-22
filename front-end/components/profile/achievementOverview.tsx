import { achievementItem } from '@types';
import AchievementItem from './achievementItem';
import styles from '@styles/AchievementOverview.module.css';

type Props = {
    Achievements: any[];
};

const AchievementOverview: React.FC<Props> = ({ Achievements }: Props) => {
    return (
        <div className={styles.achievementsContainer}>
            {Achievements.map((achievement: achievementItem) => (
                <AchievementItem key={achievement.achievementID} achievement={achievement} />
            ))}
        </div>
    );
};

export default AchievementOverview;
