import { User } from './user';
import { Achievement } from './achievement';

export class UserAchievement {
    private user: User;
    private achievement: Achievement;

    constructor(userAchievement: { user: User; achievement: Achievement }) {
        this.user = userAchievement.user;
        this.achievement = userAchievement.achievement;
    }
}
