import PoopService from '@services/poopService';
import styles from '@styles/Admin.module.css';
import { poopItem, userItem } from '@types';

type Props = {
    user: number;
    poops: poopItem[];
};

const AdminPoopByUserIDOverview: React.FC<Props> = ({ user, poops }: Props) => {
    const deletePoop = async (poopID: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this poop?');

        if (!isConfirmed) {
            return;
        }

        const response = await PoopService.deletePoop(poopID);

        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to delete poop');
        }
    };

    if (poops.length == 0) {
        return <p className={styles.notFound}>No poops found</p>;
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>PoopID</th>
                    <th>Title</th>
                    <th>Datetime</th>
                    <th>Type</th>
                    <th>ColorID</th>
                    <th>Size</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                {poops.map((poop: poopItem) => (
                    <tr key={poop.poopID}>
                        <td>{poop.poopID}</td>
                        <td>{poop.title}</td>
                        <td>{new Date(poop.dateTime).toLocaleString()}</td>
                        <td>{poop.type}</td>
                        <td>{poop.colorID}</td>
                        <td>{poop.size}</td>
                        <td>{poop.latitude}</td>
                        <td>{poop.longitude}</td>
                        <td>
                            <button
                                className={styles.deleteButton}
                                onClick={() => deletePoop(poop.poopID)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AdminPoopByUserIDOverview;
