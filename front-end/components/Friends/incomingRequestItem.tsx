type Props = {
    user: { userID: number; username: string };
};

const IncomingRequestItem: React.FC<Props> = ({ user }: Props) => {
    return (
        <div>
            {user.username}
            <button>Accept</button>
            <button>Deny</button>
        </div>
    );
};

export default IncomingRequestItem;
