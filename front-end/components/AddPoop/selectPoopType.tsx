import { useState } from 'react';
import styles from '@styles/addPoop.module.css';
import Type1SVG from '../PoopTypes/type1SVG';
import Type2SVG from '../PoopTypes/type2SVG';
import Type3SVG from '../PoopTypes/type3SVG';
import Type4SVG from '../PoopTypes/type4SVG';
import Type5SVG from '../PoopTypes/type5SVG';
import Type6SVG from '../PoopTypes/type6SVG';
import Type7SVG from '../PoopTypes/type7SVG';
import UnknownSVG from '../PoopTypes/unknownSVG';

type Props = {
    selectedPoopType: number | null;
    poopTypeChanged: (selectedType: number) => void;
};

const poopTypes = [
    { id: 1, label: 'Type 1', description: 'Separate hard lumps', SVG: Type1SVG },
    { id: 2, label: 'Type 2', description: 'Lumpy and sausage like', SVG: Type2SVG },
    { id: 3, label: 'Type 3', description: 'A sausage shape with cracks in the surface', SVG: Type3SVG },
    { id: 4, label: 'Type 4', description: 'Like a smooth, soft sausage or snake', SVG: Type4SVG },
    { id: 5, label: 'Type 5', description: 'Soft blobs with clear cut edges', SVG: Type5SVG },
    { id: 6, label: 'Type 6', description: 'Mushy consistency with ragged edges', SVG: Type6SVG },
    { id: 7, label: 'Type 7', description: 'Liquid consistency with no solid pieces', SVG: Type7SVG },
    { id: 0, label: 'Unknown', description: '', SVG: UnknownSVG },
];

const SelectPoopType: React.FC<Props> = ({ selectedPoopType, poopTypeChanged }: Props) => {
    return (
        <div className={styles.poopTypesContainer}>
            {poopTypes.map(({ id, label, description, SVG }) => (
                <div
                    key={id}
                    className={`${styles.poopType} ${selectedPoopType === id ? styles.selected : ''}`}
                    onClick={() => poopTypeChanged(id)}
                >
                    <div className={styles.SVGContainer}>
                        <SVG />
                    </div>
                    <div className={styles.textContainer}>
                        <h2>{label}</h2>
                        {description && <p>{description}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectPoopType;
