type Props = {
    user: { userID: number; username: string };
};

const OutgoingRequestItem: React.FC<Props> = ({ user }: Props) => {
    return (
        <div>
            {user.username}
            <button>Cancel</button>
        </div>
    );
};

export default OutgoingRequestItem;
