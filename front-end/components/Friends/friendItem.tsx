type Props = {
    user: { userID: number; username: string };
};

const FriendItem: React.FC<Props> = ({ user }: Props) => {
    return (
        <div>
            {user.username}
            <button>Remove</button>
        </div>
    );
};

export default FriendItem;
