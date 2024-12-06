import { useState } from 'react';
import styles from '@styles/addPoop.module.css';
import { colorMap } from '@types';

const SelectPoopColor: React.FC = () => {
    const [selectedPoopColorID, setSelectedPoopColorID] = useState<number | null>(null);

    const handlePoopColorClicked = (colorID: number) => {
        setSelectedPoopColorID(colorID);
    };

    const colorIDs = Object.keys(colorMap).map(Number);

    return (
        <div className={styles.poopColorsContainer}>
            {colorIDs.map((colorID) => (
                <div
                    key={colorID}
                    className={`${styles.poopColor} ${
                        selectedPoopColorID === colorID ? styles.selected : ''
                    }`}
                    style={{ backgroundColor: colorMap[colorID] }}
                    onClick={() => handlePoopColorClicked(colorID)}
                ></div>
            ))}
        </div>
    );
};

export default SelectPoopColor;
