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
import { useEffect, useRef, useState } from 'react';
import PoopHelper from 'utils/poopHelper';
import { useTranslation } from 'next-i18next';

type Props = {
    selectedPoopType: number;
    selectedPoopColorID: number | null;
    selectedPoopLocation: { lat: number; lng: number } | null;
    selectedPoopTitle: string;
    onTitleChange: (title: string) => void;
    selectedPoopRating: number;
    onRatingChange: (rating: number) => void;
    selectedPoopSize: number;
    onSizeChange: (size: number) => void;
    onSave: () => void;
};

const SelectPoopData: React.FC<Props> = ({
    selectedPoopType,
    selectedPoopColorID,
    selectedPoopLocation,
    selectedPoopTitle,
    onTitleChange,
    selectedPoopRating,
    onRatingChange,
    selectedPoopSize,
    onSizeChange,
    onSave,
}: Props) => {
    const svgRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

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

    useEffect(() => {
        if (svgRef.current) {
            svgRef.current.style.width = PoopHelper.calculatePoopSizePercentage(selectedPoopSize);
        }
    }, [selectedPoopSize]);

    return (
        <div className={styles.poopDataContainer}>
            <div className={styles.poopDataMainContainer}>
                <form>
                    <label htmlFor="title">{t('add.title')}</label>
                    <input
                        name="title"
                        type="text"
                        value={selectedPoopTitle}
                        onChange={(e) => onTitleChange(e.target.value)}
                    />

                    <label>{t('add.rating')}</label>
                    <Rate
                        count={5}
                        allowHalf={true}
                        className={styles.rating}
                        onChange={onRatingChange}
                        value={selectedPoopRating}
                    />

                    <label>{t('add.size')}</label>
                    <Slider
                        min={0}
                        max={100}
                        className={styles.sizeSlider}
                        trackStyle={{ backgroundColor: 'var(--accent)' }}
                        handleStyle={{
                            backgroundColor: 'var(--accent)',
                            borderColor: 'var(--accent)',
                        }}
                        defaultValue={selectedPoopSize}
                        onChange={(value) => {
                            if (typeof value === 'number') {
                                // check that the slider doesn't return an array (for range sliders)
                                onSizeChange(value);
                            }
                        }}
                    />
                </form>
                <div>
                    <p className={styles.exampleText}>{t('add.example')}:</p>
                    <div className={styles.svgContainer}>
                        <div ref={svgRef}>
                            <TypeSVG
                                color={
                                    selectedPoopColorID ? colorMap[selectedPoopColorID] : undefined
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={onSave} className={styles.saveButton}>
                {t('add.save')}
            </button>
        </div>
    );
};

export default SelectPoopData;
