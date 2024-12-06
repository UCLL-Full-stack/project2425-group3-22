import { useState } from 'react';
import styles from '@styles/addPoop.module.css';
import Type1SVG from './PoopTypes/type1SVG';
import Type2SVG from './PoopTypes/type2SVG';
import Type3SVG from './PoopTypes/type3SVG';
import Type4SVG from './PoopTypes/type4SVG';
import Type5SVG from './PoopTypes/type5SVG';
import Type6SVG from './PoopTypes/type6SVG';
import Type7SVG from './PoopTypes/type7SVG';
import UnknownSVG from './PoopTypes/unknownSVG';

const SelectPoopType: React.FC = () => {
    const [selectedPoopType, setSelectedPoopType] = useState<number | null>(null);

    const handlePoopTypeClicked = (index: number) => {
        console.log(index);
        setSelectedPoopType(index);
    };

    return (
        <div className={styles.poopTypesContainer}>
            <div
                className={`${styles.poopType} ${selectedPoopType == 1 ? styles.selected : ''}`}
                onClick={() => handlePoopTypeClicked(1)}
            >
                <div className={styles.SVGContainer}>
                    <Type1SVG />
                </div>
                <div className={styles.textContainer}>
                    <h2>Type 1</h2>
                    <p>Separate hard lumps</p>
                </div>
            </div>
            <div
                className={`${styles.poopType} ${selectedPoopType == 2 ? styles.selected : ''}`}
                onClick={() => handlePoopTypeClicked(2)}
            >
                <div className={styles.SVGContainer}>
                    <Type2SVG />
                </div>
                <div className={styles.textContainer}>
                    <h2>Type 2</h2>
                    <p>Lumpy and sausage like</p>
                </div>
            </div>
            <div
                className={`${styles.poopType} ${selectedPoopType == 3 ? styles.selected : ''}`}
                onClick={() => handlePoopTypeClicked(3)}
            >
                <div className={styles.SVGContainer}>
                    <Type3SVG />
                </div>
                <div className={styles.textContainer}>
                    <h2>Type 3</h2>
                    <p>A sausage shape with cracks in the surface</p>
                </div>
            </div>
            <div
                className={`${styles.poopType} ${selectedPoopType == 4 ? styles.selected : ''}`}
                onClick={() => handlePoopTypeClicked(4)}
            >
                <div className={styles.SVGContainer}>
                    <Type4SVG />
                </div>
                <div className={styles.textContainer}>
                    <h2>Type 4</h2>
                    <p>Like a smooth, soft sausage or snake</p>
                </div>
            </div>
            <div
                className={`${styles.poopType} ${selectedPoopType == 5 ? styles.selected : ''}`}
                onClick={() => handlePoopTypeClicked(5)}
            >
                <div className={styles.SVGContainer}>
                    <Type5SVG />
                </div>
                <div className={styles.textContainer}>
                    <h2>Type 5</h2>
                    <p>Soft blobs with clear cut edges</p>
                </div>
            </div>
            <div
                className={`${styles.poopType} ${selectedPoopType == 6 ? styles.selected : ''}`}
                onClick={() => handlePoopTypeClicked(6)}
            >
                <div className={styles.SVGContainer}>
                    <Type6SVG />
                </div>
                <div className={styles.textContainer}>
                    <h2>Type 6</h2>
                    <p>Mushy consistency with ragged edges</p>
                </div>
            </div>
            <div
                className={`${styles.poopType} ${selectedPoopType == 7 ? styles.selected : ''}`}
                onClick={() => handlePoopTypeClicked(7)}
            >
                <div className={styles.SVGContainer}>
                    <Type7SVG />
                </div>
                <div className={styles.textContainer}>
                    <h2>Type 7</h2>
                    <p>Liquid consistency with no solid pieces</p>
                </div>
            </div>
            <div
                className={`${styles.poopType} ${selectedPoopType == 0 ? styles.selected : ''}`}
                onClick={() => handlePoopTypeClicked(0)}
            >
                <div className={styles.SVGContainer}>
                    <UnknownSVG />
                </div>
                <div className={styles.textContainer}>
                    <h2>Unknown</h2>
                </div>
            </div>
        </div>
    );
};

export default SelectPoopType;
