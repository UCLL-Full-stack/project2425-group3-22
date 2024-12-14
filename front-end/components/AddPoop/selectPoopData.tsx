import styles from '@styles/addPoop.module.css';
import Type1SVG from '../PoopTypes/type1SVG';
import Type2SVG from '../PoopTypes/type2SVG';
import Type3SVG from '../PoopTypes/type3SVG';
import Type4SVG from '../PoopTypes/type4SVG';
import Type5SVG from '../PoopTypes/type5SVG';
import Type6SVG from '../PoopTypes/type6SVG';
import Type7SVG from '../PoopTypes/type7SVG';
import PoopSVG from '../PoopTypes/poopSVG';
import { colorMap } from '@types';
import Rate from 'rc-rate';
import Slider from 'rc-slider';
import { useState } from 'react';

type Props = {
    selectedPoopType: number | null;
    selectedPoopColorID: number | null;
    selectedPoopLocation: { lat: number; lng: number } | null;
};

const SelectPoopData: React.FC<Props> = ({
    selectedPoopType,
    selectedPoopColorID,
    selectedPoopLocation,
}: Props) => {
    const [title, setTitle] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [size, setSize] = useState<number>(50);

    let TypeSVG;

    switch (selectedPoopType) {
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

    const saveHandler = () => {
        console.log(`new poop added 
            type: ${selectedPoopType}
            colorID: ${selectedPoopColorID}
            latitute: ${selectedPoopLocation?.lat}
            longitude: ${selectedPoopLocation?.lng}
            title: ${title}
            rating: ${rating}
            size: ${size}
            date: ${new Date().toString()}`);
    };

    return (
        <div className={styles.poopDataContainer}>
            <label htmlFor="title">Title</label>
            <input
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label>Rating</label>
            <Rate count={5} allowHalf={true} className={styles.rating} onChange={setRating} value={rating} />

            <label>Slider</label>
            <Slider min={0} max={100} defaultValue={size} onChange={(value) => {
                    if (typeof value === 'number') { // check that the slider doesn't return an array (for range sliders)
                        setSize(value);
                    }
                }} />

            <p>type: {selectedPoopType ?? 'null'}</p>
            <p>color: {selectedPoopColorID ?? 'null'}</p>
            <p>
                location:{' '}
                {selectedPoopLocation?.lat && selectedPoopLocation?.lng
                    ? `${selectedPoopLocation.lat} ${selectedPoopLocation.lng}`
                    : 'null'}
            </p>
            <div className={styles.svgContainer}>
                <TypeSVG color={selectedPoopColorID ? colorMap[selectedPoopColorID] : undefined} />
            </div>
            <button onClick={saveHandler}>Save</button>
        </div>
    );
};

export default SelectPoopData;
