import styles from '@styles/addPoop.module.css';
import { colorMap } from '@types';

type Props = {
    selectedPoopColorID: number | null;
    poopColorChanged: (selectedColor: number) => void;
};

const SelectPoopColor: React.FC<Props> = ({ selectedPoopColorID, poopColorChanged }: Props) => {
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
                    onClick={() => poopColorChanged(colorID)}
                ></div>
            ))}
        </div>
    );
};

export default SelectPoopColor;
