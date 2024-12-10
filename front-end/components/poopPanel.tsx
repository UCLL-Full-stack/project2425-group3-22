import { poopItem } from '@types';
import styles from '@styles/poopPanel.module.css';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rate from 'rc-rate';
import EditPoopActionMenu from './ActionMenus/editPoopActionMenu';

type Props = {
    poop: poopItem;
};

const PoopPanel: React.FC<Props> = ({ poop }: Props) => {
    const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const firstLetter = poop.user.username.charAt(0).toUpperCase();

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN ?? '';

        if (!mapboxgl.accessToken) {
            console.error('Mapbox access token not set');
            return;
        }

        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/landeriscool/cltul3bhu00fr01p7h0e70gbc',
                center: [poop.longitude, poop.latitude],
                zoom: 10,
                attributionControl: false,
            });

            new mapboxgl.Marker({
                color: getComputedStyle(document.documentElement).getPropertyValue(
                    '--accent-secondary'
                ),
            })
                .setLngLat([poop.longitude, poop.latitude])
                .addTo(map);

            return () => map.remove();
        }
    }, []);

    const handleOptionsClick = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        setPopupPosition({ x: clientX, y: clientY });
        setShowPopup(true);
    };

    return (
        <div className={styles.poopItem}>
            <div className={styles.nameContainer}>
                <div className={styles.userIcon}>{firstLetter}</div>
                <div>
                    <p>{poop.user.username}</p>
                    <p>
                        {new Date(poop.dateTime).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </div>
                <button className={styles.optionsButton} onClick={handleOptionsClick}>
                    <FontAwesomeIcon icon="ellipsis-vertical" />
                </button>
            </div>
            <h2>{poop.title}</h2>
            <p>size: {poop.size}</p>
            <p>colorID: {poop.colorID}</p>
            <p>type: {poop.type}</p>
            <Rate
                count={5}
                value={poop.rating}
                allowHalf={true}
                disabled={true}
                className={styles.rating}
            />
            {poop.latitude && poop.longitude && (
                <div ref={mapContainerRef} className={styles.map}></div>
            )}
            {showPopup && popupPosition && (
                <EditPoopActionMenu popupPosition={popupPosition} setShowPopup={setShowPopup} poopID={poop.poopID} />
            )}
        </div>
    );
};

export default PoopPanel;
