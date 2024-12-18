import { darken, desaturate, lighten, mix } from 'polished';

export default class PoopHelper {
    static defaultPoopColor = (): string => {
        return '#B4846B';
    };

    static lighten = (color: string): string => {
        return mix(0.15, '#606060', lighten(0.15, color));
    };

    static darken = (color: string): string => {
        return darken(0.1, color);
    };

    static calculatePoopSizePercentage = (poopSize: number): string => {
        return (poopSize * 0.8 + 20) + '%';
    }
}
