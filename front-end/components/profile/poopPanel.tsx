import { poopItem } from '@types';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
    poop: poopItem;
};

const PoopPanel: React.FC<Props> = ({ poop }: Props) => {
    const router = useRouter();

    return (
        <div>
            <h1>{poop.title}</h1>
            <p>
                datetime:{' '}
                {new Date(poop.dateTime).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </p>
            <p>rating: {poop.rating}</p>
            <p>size: {poop.size}</p>
            <p>colorID: {poop.colorID}</p>
            <p>type: {poop.type}</p>
        </div>
    );
};

export default PoopPanel;
