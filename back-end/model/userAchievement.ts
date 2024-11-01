import { User } from './user';
import { Achievement } from './achievement';

//TODO: add validation
export class UserAchievement {
    private user: User;
    private achievement: Achievement;

    constructor(userAchievement: { user: User; achievement: Achievement }) {
        this.user = userAchievement.user;
        this.achievement = userAchievement.achievement;
    }

    getUser(): User | undefined {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }

    getAchievement(): Achievement | undefined {
        return this.achievement;
    }

    setAchievement(achievement: Achievement) {
        this.achievement = achievement;
    }
}
