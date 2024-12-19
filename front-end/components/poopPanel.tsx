import { colorMap, poopItem } from '@types';
import styles from '@styles/poopPanel.module.css';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rate from 'rc-rate';
import EditPoopActionMenu from './ActionMenus/editPoopActionMenu';
import Type1SVG from './PoopTypes/type1SVG';
import Type2SVG from './PoopTypes/type2SVG';
import Type3SVG from './PoopTypes/type3SVG';
import Type4SVG from './PoopTypes/type4SVG';
import Type5SVG from './PoopTypes/type5SVG';
import Type6SVG from './PoopTypes/type6SVG';
import Type7SVG from './PoopTypes/type7SVG';
import PoopSVG from './PoopTypes/poopSVG';
import PoopHelper from 'utils/poopHelper';

type Props = {
    poop: poopItem;
};

const PoopPanel: React.FC<Props> = ({ poop }: Props) => {
    const [actionMenuPosition, setActionMenuPosition] = useState<{ x: number; y: number } | null>(
        null
    );
    const [showActionMenu, setShowActionMenu] = useState(false);

    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    let TypeSVG;
    switch (poop.type) {
        case 1:
            TypeSVG = Type1SVG;
            break;
        case 2:
            TypeSVG = Type2SVG;
            break;
        case 3:
            TypeSVG = Type3SVG;
            break;
        case 4:
            TypeSVG = Type4SVG;
            break;
        case 5:
            TypeSVG = Type5SVG;
            break;
        case 6:
            TypeSVG = Type6SVG;
            break;
        case 7:
            TypeSVG = Type7SVG;
            break;
        default:
            TypeSVG = PoopSVG;
    }

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
        setActionMenuPosition({ x: clientX, y: clientY });
        setShowActionMenu(true);
    };

    return (
        <div className={styles.poopItem}>
            <div className={styles.nameContainer}>
                <div className={styles.userIcon}>{poop.user.username?.charAt(0).toUpperCase() || '?'}</div>
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
            <div className={styles.mainDataContainer}>
                <Rate
                    count={5}
                    value={poop.rating}
                    allowHalf={true}
                    disabled={true}
                    className={styles.rating}
                />
                <div className={styles.svgContainer}>
                    <div style={{ width: PoopHelper.calculatePoopSizePercentage(poop.size) }}>
                        <TypeSVG color={poop.colorID ? colorMap[poop.colorID] : undefined} />
                    </div>
                </div>
            </div>
            {poop.latitude && poop.longitude && (
                <div ref={mapContainerRef} className={styles.map}></div>
            )}
            {showActionMenu && actionMenuPosition && (
                <EditPoopActionMenu
                    position={actionMenuPosition}
                    setShowActionMenu={setShowActionMenu}
                    poopID={poop.poopID}
                    userID={poop.user.userID}
                    isOwner={poop.isOwner}
                />
            )}
        </div>
    );
};

export default PoopPanel;
