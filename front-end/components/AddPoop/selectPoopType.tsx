import styles from '@styles/addPoop.module.css';
import Type1SVG from '../PoopTypes/type1SVG';
import Type2SVG from '../PoopTypes/type2SVG';
import Type3SVG from '../PoopTypes/type3SVG';
import Type4SVG from '../PoopTypes/type4SVG';
import Type5SVG from '../PoopTypes/type5SVG';
import Type6SVG from '../PoopTypes/type6SVG';
import Type7SVG from '../PoopTypes/type7SVG';
import UnknownSVG from '../PoopTypes/unknownSVG';
import { useTranslation } from 'next-i18next';

type Props = {
    selectedPoopType: number;
    poopTypeChanged: (selectedType: number) => void;
};



const SelectPoopType: React.FC<Props> = ({ selectedPoopType, poopTypeChanged }: Props) => {
    const { t } = useTranslation();

    const poopTypes = [
        { id: 1, label: t('pooptypes.type1'), description: t('pooptypes.type1description'), SVG: Type1SVG },
        { id: 2, label: t('pooptypes.type2'), description: t('pooptypes.type2description'), SVG: Type2SVG },
        { id: 3, label: t('pooptypes.type3'), description: t('pooptypes.type3description'), SVG: Type3SVG },
        { id: 4, label: t('pooptypes.type4'), description: t('pooptypes.type4description'), SVG: Type4SVG },
        { id: 5, label: t('pooptypes.type5'), description: t('pooptypes.type5description'), SVG: Type5SVG },
        { id: 6, label: t('pooptypes.type6'), description: t('pooptypes.type6description'), SVG: Type6SVG },
        { id: 7, label: t('pooptypes.type7'), description: t('pooptypes.type7description'), SVG: Type7SVG },
        { id: 0, label: t('pooptypes.unknown'), description: '', SVG: UnknownSVG },
    ];

    return (
        <div className={styles.poopTypesContainer}>
            {poopTypes.map(({ id, label, description, SVG }) => (
                <div
                    key={id}
                    className={`${styles.poopType} ${selectedPoopType == id ? styles.selected : ''}`}
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
