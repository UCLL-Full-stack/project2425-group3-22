import PoopHelper from 'utils/poopHelper';

type Props = {
    color?: string;
};

const Type2SVG: React.FC<Props> = ({ color = PoopHelper.defaultPoopColor() }: Props) => {
    const highlight = PoopHelper.lighten(color);
    const shadow = PoopHelper.darken(color);

    return (
        <svg
            viewBox="0 0 512 512"
        >
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={shadow}
                strokeOpacity="0.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 0.00 512.00 
L 512.00 512.00
L 512.00 0.00
L 0.00 0.00
L 0.00 512.00
M 155.00 86.00 
C 167.62 88.05 181.00 94.46 192.00 96.00
C 214.57 90.06 241.45 95.58 259.00 109.00
C 277.40 95.67 304.13 88.70 327.00 98.00
C 337.23 100.01 356.78 107.33 362.75 116.25 C 368.72 125.16 388.24 138.17 385.00 149.00
C 411.73 132.79 446.66 138.65 470.00 156.00
C 471.97 156.97 473.95 158.74 476.00 157.00
C 516.54 187.62 524.05 258.39 473.00 284.00
C 488.09 318.50 450.66 346.58 429.00 357.00
C 405.62 359.99 358.93 406.87 329.75 377.25 C 300.58 347.62 262.23 371.77 234.00 335.00
C 188.17 388.20 100.46 363.40 75.00 302.00
C 72.72 296.11 69.16 290.41 68.00 285.00
C 63.72 276.25 62.99 269.61 62.00 261.00
C 62.04 263.41 61.57 265.95 63.00 268.00
C 43.00 260.23 31.66 239.62 22.00 222.00
C 4.30 180.98 10.56 95.30 82.00 102.00
C 82.11 101.97 83.59 101.15 84.00 101.00
C 87.65 99.67 94.47 98.81 98.00 101.00
C 100.56 81.72 143.83 81.40 155.00 86.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={color}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 98.00 101.00 
C 98.32 101.20 98.73 101.84 99.00 102.00
C 110.89 109.03 129.21 108.92 137.00 124.00
C 148.85 114.57 161.25 105.08 176.00 101.00
C 150.71 114.35 126.99 140.14 123.00 170.00
C 77.64 185.64 55.34 239.77 68.00 285.00
C 69.16 290.41 72.72 296.11 75.00 302.00
C 96.30 339.43 137.77 353.76 178.67 343.67 C 219.58 333.59 229.38 288.38 255.00 266.00
C 255.55 289.42 244.13 309.86 231.00 328.00
C 251.06 350.62 281.84 358.70 311.00 352.00
C 320.74 373.99 350.98 383.14 373.02 376.02 C 395.07 368.91 408.46 348.95 432.00 345.00
C 445.44 333.12 471.46 307.83 460.00 282.00
C 440.62 288.07 417.95 289.56 399.00 281.00
C 471.08 307.60 538.62 203.07 470.00 156.00
C 446.66 138.65 411.73 132.79 385.00 149.00
C 382.00 150.82 378.97 154.13 375.00 154.00
C 371.56 128.60 349.95 107.26 327.00 98.00
C 304.13 88.70 277.40 95.67 259.00 109.00
C 241.45 95.58 214.57 90.06 192.00 96.00
C 187.57 97.17 182.82 99.01 178.00 100.00
C 172.50 92.17 162.93 89.15 155.00 86.00
C 143.83 81.40 100.56 81.72 98.00 101.00
M 131.00 91.00 
C 140.25 94.76 126.41 112.16 117.32 104.68 C 108.23 97.20 121.20 87.01 131.00 91.00
M 157.00 92.00 
C 167.69 94.65 165.72 108.31 153.78 105.22 C 141.84 102.14 144.03 88.79 157.00 92.00
M 195.00 121.00 
C 215.41 126.06 205.99 160.11 185.00 154.00 C 164.01 147.89 173.65 115.71 195.00 121.00
M 309.00 121.00 
C 322.71 125.33 319.93 148.99 304.78 144.22 C 289.63 139.45 293.78 116.19 309.00 121.00
M 338.00 199.00 
C 342.17 181.97 354.77 163.54 372.00 158.00
C 329.94 190.63 343.58 260.10 393.00 278.00
C 389.15 280.67 383.79 277.86 380.00 276.00
C 377.61 303.42 359.72 331.13 333.00 341.00
C 355.54 323.38 368.69 296.93 366.00 268.00
C 330.97 254.95 348.26 200.97 307.00 200.00
C 303.94 226.48 285.63 251.89 261.00 263.00
C 305.51 230.56 311.94 161.81 275.00 122.00
C 287.06 134.67 302.89 141.64 304.92 162.08 C 306.95 182.51 312.12 198.89 338.00 199.00
M 352.00 126.00 
C 362.98 129.47 362.01 148.84 349.98 145.02 C 337.94 141.21 338.72 121.80 352.00 126.00
M 250.00 149.00 
C 271.03 152.58 271.69 190.82 249.00 189.00 C 226.31 187.18 227.66 145.20 250.00 149.00
M 411.00 161.00 
C 430.62 165.86 418.00 198.51 398.78 190.22 C 379.56 181.93 390.68 155.97 411.00 161.00
M 333.00 166.00 
C 343.14 169.41 338.07 192.26 326.78 187.22 C 315.49 182.18 321.91 162.28 333.00 166.00
M 172.00 178.00 
C 211.91 183.70 225.99 241.78 183.00 242.00 C 140.01 242.22 128.24 171.75 172.00 178.00
M 482.00 193.00 
C 501.79 198.31 487.31 244.41 466.78 238.22 C 446.25 232.03 460.41 187.20 482.00 193.00
M 121.00 194.00 
C 122.54 239.95 163.52 279.19 209.00 280.00
C 159.89 293.53 109.51 243.16 121.00 194.00
M 364.00 200.00 
C 376.49 201.81 377.73 226.08 364.00 225.00 C 350.27 223.91 350.57 198.06 364.00 200.00
M 419.00 207.00 
C 440.93 211.54 425.28 247.57 404.00 238.00 C 382.72 228.44 396.42 202.32 419.00 207.00
M 323.00 228.00 
C 338.22 231.48 343.70 264.77 326.33 262.67 C 308.96 260.57 305.36 223.96 323.00 228.00
M 289.00 261.00 
C 299.75 265.53 277.21 291.00 267.33 282.67 C 257.45 274.34 277.76 256.26 289.00 261.00
M 119.00 270.00 
C 138.13 274.74 131.02 311.05 110.93 305.07 C 90.83 299.10 98.13 264.83 119.00 270.00
M 392.00 293.00 
C 404.50 296.17 393.41 326.75 380.78 321.22 C 368.15 315.69 378.90 289.68 392.00 293.00
M 317.00 301.00 
C 338.03 306.21 327.20 337.83 306.00 332.00 C 284.80 326.17 296.13 295.83 317.00 301.00
M 423.00 309.00 
C 437.77 312.38 431.21 335.79 416.00 332.00 C 400.79 328.21 407.77 305.52 423.00 309.00
M 426.00 347.00 
C 406.76 352.08 388.93 362.01 368.31 350.69 C 347.68 339.37 346.35 328.85 367.25 343.75 C 388.14 358.66 405.86 345.42 426.00 347.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={shadow}
                strokeOpacity="0.99"
                strokeWidth="0.3"
            >
                <path
                    d="
M 192.00 96.00 
C 181.00 94.46 167.62 88.05 155.00 86.00
C 162.93 89.15 172.50 92.17 178.00 100.00
C 182.82 99.01 187.57 97.17 192.00 96.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 131.00 91.00 
C 121.20 87.01 108.23 97.20 117.32 104.68 C 126.41 112.16 140.25 94.76 131.00 91.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 157.00 92.00 
C 144.03 88.79 141.84 102.14 153.78 105.22 C 165.72 108.31 167.69 94.65 157.00 92.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={shadow}
                strokeOpacity="0.99"
                strokeWidth="0.3"
            >
                <path
                    d="
M 385.00 149.00 
C 388.24 138.17 368.72 125.16 362.75 116.25 C 356.78 107.33 337.23 100.01 327.00 98.00
C 349.95 107.26 371.56 128.60 375.00 154.00
C 378.97 154.13 382.00 150.82 385.00 149.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="0.17"
                strokeWidth="0.3"
            >
                <path
                    d="
M 84.00 101.00 
C 88.23 101.42 94.21 101.44 99.00 102.00
C 98.73 101.84 98.32 101.20 98.00 101.00
C 94.47 98.81 87.65 99.67 84.00 101.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="0.98"
                strokeWidth="0.3"
            >
                <path
                    d="
M 82.00 102.00 
C 101.79 103.86 119.42 113.95 133.00 129.00
C 122.51 150.66 112.90 171.92 90.00 184.00
C 91.36 139.61 39.70 195.01 85.00 188.00
C 69.48 206.80 59.42 231.28 62.00 256.00
C 62.08 257.66 61.97 259.34 62.00 261.00
C 62.99 269.61 63.72 276.25 68.00 285.00
C 55.34 239.77 77.64 185.64 123.00 170.00
C 126.99 140.14 150.71 114.35 176.00 101.00
C 161.25 105.08 148.85 114.57 137.00 124.00
C 129.21 108.92 110.89 109.03 99.00 102.00
C 94.21 101.44 88.23 101.42 84.00 101.00
C 83.59 101.15 82.11 101.97 82.00 102.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={color}
                strokeOpacity="0.98"
                strokeWidth="0.3"
            >
                <path
                    d="
M 22.00 222.00 
C 30.08 235.61 45.49 246.53 60.00 251.00
C 59.86 252.81 60.44 255.08 62.00 256.00
C 59.42 231.28 69.48 206.80 85.00 188.00
C 39.70 195.01 91.36 139.61 90.00 184.00
C 112.90 171.92 122.51 150.66 133.00 129.00
C 119.42 113.95 101.79 103.86 82.00 102.00
C 10.56 95.30 4.30 180.98 22.00 222.00
M 89.00 121.00 
C 107.44 125.57 100.50 155.59 80.93 151.07 C 61.36 146.56 68.79 115.99 89.00 121.00
M 37.00 169.00 
C 51.27 172.83 52.21 205.75 36.33 203.67 C 20.45 201.59 20.23 164.50 37.00 169.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 89.00 121.00 
C 68.79 115.99 61.36 146.56 80.93 151.07 C 100.50 155.59 107.44 125.57 89.00 121.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 195.00 121.00 
C 173.65 115.71 164.01 147.89 185.00 154.00 C 205.99 160.11 215.41 126.06 195.00 121.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 309.00 121.00 
C 293.78 116.19 289.63 139.45 304.78 144.22 C 319.93 148.99 322.71 125.33 309.00 121.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={shadow}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 338.00 199.00 
C 312.12 198.89 306.95 182.51 304.92 162.08 C 302.89 141.64 287.06 134.67 275.00 122.00
C 311.94 161.81 305.51 230.56 261.00 263.00
C 285.63 251.89 303.94 226.48 307.00 200.00
C 348.26 200.97 330.97 254.95 366.00 268.00
C 368.69 296.93 355.54 323.38 333.00 341.00
C 359.72 331.13 377.61 303.42 380.00 276.00
C 383.79 277.86 389.15 280.67 393.00 278.00
C 343.58 260.10 329.94 190.63 372.00 158.00
C 354.77 163.54 342.17 181.97 338.00 199.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 352.00 126.00 
C 338.72 121.80 337.94 141.21 349.98 145.02 C 362.01 148.84 362.98 129.47 352.00 126.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 250.00 149.00 
C 227.66 145.20 226.31 187.18 249.00 189.00 C 271.69 190.82 271.03 152.58 250.00 149.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={shadow}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 75.00 302.00 
C 100.46 363.40 188.17 388.20 234.00 335.00
C 262.23 371.77 300.58 347.62 329.75 377.25 C 358.93 406.87 405.62 359.99 429.00 357.00
C 450.66 346.58 488.09 318.50 473.00 284.00
C 524.05 258.39 516.54 187.62 476.00 157.00
C 473.95 158.74 471.97 156.97 470.00 156.00
C 538.62 203.07 471.08 307.60 399.00 281.00
C 417.95 289.56 440.62 288.07 460.00 282.00
C 471.46 307.83 445.44 333.12 432.00 345.00
C 408.46 348.95 395.07 368.91 373.02 376.02 C 350.98 383.14 320.74 373.99 311.00 352.00
C 281.84 358.70 251.06 350.62 231.00 328.00
C 244.13 309.86 255.55 289.42 255.00 266.00
C 229.38 288.38 219.58 333.59 178.67 343.67 C 137.77 353.76 96.30 339.43 75.00 302.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 411.00 161.00 
C 390.68 155.97 379.56 181.93 398.78 190.22 C 418.00 198.51 430.62 165.86 411.00 161.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 333.00 166.00 
C 321.91 162.28 315.49 182.18 326.78 187.22 C 338.07 192.26 343.14 169.41 333.00 166.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 37.00 169.00 
C 20.23 164.50 20.45 201.59 36.33 203.67 C 52.21 205.75 51.27 172.83 37.00 169.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 172.00 178.00 
C 128.24 171.75 140.01 242.22 183.00 242.00 C 225.99 241.78 211.91 183.70 172.00 178.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 482.00 193.00 
C 460.41 187.20 446.25 232.03 466.78 238.22 C 487.31 244.41 501.79 198.31 482.00 193.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 121.00 194.00 
C 109.51 243.16 159.89 293.53 209.00 280.00
C 163.52 279.19 122.54 239.95 121.00 194.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 364.00 200.00 
C 350.57 198.06 350.27 223.91 364.00 225.00 C 377.73 226.08 376.49 201.81 364.00 200.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 419.00 207.00 
C 396.42 202.32 382.72 228.44 404.00 238.00 C 425.28 247.57 440.93 211.54 419.00 207.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={shadow}
                strokeOpacity="0.99"
                strokeWidth="0.3"
            >
                <path
                    d="
M 62.00 261.00 
C 61.97 259.34 62.08 257.66 62.00 256.00
C 60.44 255.08 59.86 252.81 60.00 251.00
C 45.49 246.53 30.08 235.61 22.00 222.00
C 31.66 239.62 43.00 260.23 63.00 268.00
C 61.57 265.95 62.04 263.41 62.00 261.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 323.00 228.00 
C 305.36 223.96 308.96 260.57 326.33 262.67 C 343.70 264.77 338.22 231.48 323.00 228.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 289.00 261.00 
C 277.76 256.26 257.45 274.34 267.33 282.67 C 277.21 291.00 299.75 265.53 289.00 261.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 119.00 270.00 
C 98.13 264.83 90.83 299.10 110.93 305.07 C 131.02 311.05 138.13 274.74 119.00 270.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 392.00 293.00 
C 378.90 289.68 368.15 315.69 380.78 321.22 C 393.41 326.75 404.50 296.17 392.00 293.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 317.00 301.00 
C 296.13 295.83 284.80 326.17 306.00 332.00 C 327.20 337.83 338.03 306.21 317.00 301.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 423.00 309.00 
C 407.77 305.52 400.79 328.21 416.00 332.00 C 431.21 335.79 437.77 312.38 423.00 309.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="1.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 426.00 347.00 
C 405.86 345.42 388.14 358.66 367.25 343.75 C 346.35 328.85 347.68 339.37 368.31 350.69 C 388.93 362.01 406.76 352.08 426.00 347.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="0.00" stroke="None">
                <path
                    d="
M 0.00 512.00 
L 512.00 512.00
L 512.00 0.00
L 0.00 0.00
L 0.00 512.00
M 155.00 86.00 
C 167.62 88.05 181.00 94.46 192.00 96.00
C 214.57 90.06 241.45 95.58 259.00 109.00
C 277.40 95.67 304.13 88.70 327.00 98.00
C 337.23 100.01 356.78 107.33 362.75 116.25 C 368.72 125.16 388.24 138.17 385.00 149.00
C 411.73 132.79 446.66 138.65 470.00 156.00
C 471.97 156.97 473.95 158.74 476.00 157.00
C 516.54 187.62 524.05 258.39 473.00 284.00
C 488.09 318.50 450.66 346.58 429.00 357.00
C 405.62 359.99 358.93 406.87 329.75 377.25 C 300.58 347.62 262.23 371.77 234.00 335.00
C 188.17 388.20 100.46 363.40 75.00 302.00
C 72.72 296.11 69.16 290.41 68.00 285.00
C 63.72 276.25 62.99 269.61 62.00 261.00
C 62.04 263.41 61.57 265.95 63.00 268.00
C 43.00 260.23 31.66 239.62 22.00 222.00
C 4.30 180.98 10.56 95.30 82.00 102.00
C 82.11 101.97 83.59 101.15 84.00 101.00
C 87.65 99.67 94.47 98.81 98.00 101.00
C 100.56 81.72 143.83 81.40 155.00 86.00 Z"
                />
            </g>
            <g fill={color} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 98.00 101.00 
C 98.32 101.20 98.73 101.84 99.00 102.00
C 110.89 109.03 129.21 108.92 137.00 124.00
C 148.85 114.57 161.25 105.08 176.00 101.00
C 150.71 114.35 126.99 140.14 123.00 170.00
C 77.64 185.64 55.34 239.77 68.00 285.00
C 69.16 290.41 72.72 296.11 75.00 302.00
C 96.30 339.43 137.77 353.76 178.67 343.67 C 219.58 333.59 229.38 288.38 255.00 266.00
C 255.55 289.42 244.13 309.86 231.00 328.00
C 251.06 350.62 281.84 358.70 311.00 352.00
C 320.74 373.99 350.98 383.14 373.02 376.02 C 395.07 368.91 408.46 348.95 432.00 345.00
C 445.44 333.12 471.46 307.83 460.00 282.00
C 440.62 288.07 417.95 289.56 399.00 281.00
C 471.08 307.60 538.62 203.07 470.00 156.00
C 446.66 138.65 411.73 132.79 385.00 149.00
C 382.00 150.82 378.97 154.13 375.00 154.00
C 371.56 128.60 349.95 107.26 327.00 98.00
C 304.13 88.70 277.40 95.67 259.00 109.00
C 241.45 95.58 214.57 90.06 192.00 96.00
C 187.57 97.17 182.82 99.01 178.00 100.00
C 172.50 92.17 162.93 89.15 155.00 86.00
C 143.83 81.40 100.56 81.72 98.00 101.00
M 131.00 91.00 
C 140.25 94.76 126.41 112.16 117.32 104.68 C 108.23 97.20 121.20 87.01 131.00 91.00
M 157.00 92.00 
C 167.69 94.65 165.72 108.31 153.78 105.22 C 141.84 102.14 144.03 88.79 157.00 92.00
M 195.00 121.00 
C 215.41 126.06 205.99 160.11 185.00 154.00 C 164.01 147.89 173.65 115.71 195.00 121.00
M 309.00 121.00 
C 322.71 125.33 319.93 148.99 304.78 144.22 C 289.63 139.45 293.78 116.19 309.00 121.00
M 338.00 199.00 
C 342.17 181.97 354.77 163.54 372.00 158.00
C 329.94 190.63 343.58 260.10 393.00 278.00
C 389.15 280.67 383.79 277.86 380.00 276.00
C 377.61 303.42 359.72 331.13 333.00 341.00
C 355.54 323.38 368.69 296.93 366.00 268.00
C 330.97 254.95 348.26 200.97 307.00 200.00
C 303.94 226.48 285.63 251.89 261.00 263.00
C 305.51 230.56 311.94 161.81 275.00 122.00
C 287.06 134.67 302.89 141.64 304.92 162.08 C 306.95 182.51 312.12 198.89 338.00 199.00
M 352.00 126.00 
C 362.98 129.47 362.01 148.84 349.98 145.02 C 337.94 141.21 338.72 121.80 352.00 126.00
M 250.00 149.00 
C 271.03 152.58 271.69 190.82 249.00 189.00 C 226.31 187.18 227.66 145.20 250.00 149.00
M 411.00 161.00 
C 430.62 165.86 418.00 198.51 398.78 190.22 C 379.56 181.93 390.68 155.97 411.00 161.00
M 333.00 166.00 
C 343.14 169.41 338.07 192.26 326.78 187.22 C 315.49 182.18 321.91 162.28 333.00 166.00
M 172.00 178.00 
C 211.91 183.70 225.99 241.78 183.00 242.00 C 140.01 242.22 128.24 171.75 172.00 178.00
M 482.00 193.00 
C 501.79 198.31 487.31 244.41 466.78 238.22 C 446.25 232.03 460.41 187.20 482.00 193.00
M 121.00 194.00 
C 122.54 239.95 163.52 279.19 209.00 280.00
C 159.89 293.53 109.51 243.16 121.00 194.00
M 364.00 200.00 
C 376.49 201.81 377.73 226.08 364.00 225.00 C 350.27 223.91 350.57 198.06 364.00 200.00
M 419.00 207.00 
C 440.93 211.54 425.28 247.57 404.00 238.00 C 382.72 228.44 396.42 202.32 419.00 207.00
M 323.00 228.00 
C 338.22 231.48 343.70 264.77 326.33 262.67 C 308.96 260.57 305.36 223.96 323.00 228.00
M 289.00 261.00 
C 299.75 265.53 277.21 291.00 267.33 282.67 C 257.45 274.34 277.76 256.26 289.00 261.00
M 119.00 270.00 
C 138.13 274.74 131.02 311.05 110.93 305.07 C 90.83 299.10 98.13 264.83 119.00 270.00
M 392.00 293.00 
C 404.50 296.17 393.41 326.75 380.78 321.22 C 368.15 315.69 378.90 289.68 392.00 293.00
M 317.00 301.00 
C 338.03 306.21 327.20 337.83 306.00 332.00 C 284.80 326.17 296.13 295.83 317.00 301.00
M 423.00 309.00 
C 437.77 312.38 431.21 335.79 416.00 332.00 C 400.79 328.21 407.77 305.52 423.00 309.00
M 426.00 347.00 
C 406.76 352.08 388.93 362.01 368.31 350.69 C 347.68 339.37 346.35 328.85 367.25 343.75 C 388.14 358.66 405.86 345.42 426.00 347.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="0.99" stroke="None">
                <path
                    d="
M 192.00 96.00 
C 181.00 94.46 167.62 88.05 155.00 86.00
C 162.93 89.15 172.50 92.17 178.00 100.00
C 182.82 99.01 187.57 97.17 192.00 96.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 131.00 91.00 
C 121.20 87.01 108.23 97.20 117.32 104.68 C 126.41 112.16 140.25 94.76 131.00 91.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 157.00 92.00 
C 144.03 88.79 141.84 102.14 153.78 105.22 C 165.72 108.31 167.69 94.65 157.00 92.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="0.99" stroke="None">
                <path
                    d="
M 385.00 149.00 
C 388.24 138.17 368.72 125.16 362.75 116.25 C 356.78 107.33 337.23 100.01 327.00 98.00
C 349.95 107.26 371.56 128.60 375.00 154.00
C 378.97 154.13 382.00 150.82 385.00 149.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="0.17" stroke="None">
                <path
                    d="
M 84.00 101.00 
C 88.23 101.42 94.21 101.44 99.00 102.00
C 98.73 101.84 98.32 101.20 98.00 101.00
C 94.47 98.81 87.65 99.67 84.00 101.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="0.98" stroke="None">
                <path
                    d="
M 82.00 102.00 
C 101.79 103.86 119.42 113.95 133.00 129.00
C 122.51 150.66 112.90 171.92 90.00 184.00
C 91.36 139.61 39.70 195.01 85.00 188.00
C 69.48 206.80 59.42 231.28 62.00 256.00
C 62.08 257.66 61.97 259.34 62.00 261.00
C 62.99 269.61 63.72 276.25 68.00 285.00
C 55.34 239.77 77.64 185.64 123.00 170.00
C 126.99 140.14 150.71 114.35 176.00 101.00
C 161.25 105.08 148.85 114.57 137.00 124.00
C 129.21 108.92 110.89 109.03 99.00 102.00
C 94.21 101.44 88.23 101.42 84.00 101.00
C 83.59 101.15 82.11 101.97 82.00 102.00 Z"
                />
            </g>
            <g fill={color} fillOpacity="0.98" stroke="None">
                <path
                    d="
M 22.00 222.00 
C 30.08 235.61 45.49 246.53 60.00 251.00
C 59.86 252.81 60.44 255.08 62.00 256.00
C 59.42 231.28 69.48 206.80 85.00 188.00
C 39.70 195.01 91.36 139.61 90.00 184.00
C 112.90 171.92 122.51 150.66 133.00 129.00
C 119.42 113.95 101.79 103.86 82.00 102.00
C 10.56 95.30 4.30 180.98 22.00 222.00
M 89.00 121.00 
C 107.44 125.57 100.50 155.59 80.93 151.07 C 61.36 146.56 68.79 115.99 89.00 121.00
M 37.00 169.00 
C 51.27 172.83 52.21 205.75 36.33 203.67 C 20.45 201.59 20.23 164.50 37.00 169.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 89.00 121.00 
C 68.79 115.99 61.36 146.56 80.93 151.07 C 100.50 155.59 107.44 125.57 89.00 121.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 195.00 121.00 
C 173.65 115.71 164.01 147.89 185.00 154.00 C 205.99 160.11 215.41 126.06 195.00 121.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 309.00 121.00 
C 293.78 116.19 289.63 139.45 304.78 144.22 C 319.93 148.99 322.71 125.33 309.00 121.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 338.00 199.00 
C 312.12 198.89 306.95 182.51 304.92 162.08 C 302.89 141.64 287.06 134.67 275.00 122.00
C 311.94 161.81 305.51 230.56 261.00 263.00
C 285.63 251.89 303.94 226.48 307.00 200.00
C 348.26 200.97 330.97 254.95 366.00 268.00
C 368.69 296.93 355.54 323.38 333.00 341.00
C 359.72 331.13 377.61 303.42 380.00 276.00
C 383.79 277.86 389.15 280.67 393.00 278.00
C 343.58 260.10 329.94 190.63 372.00 158.00
C 354.77 163.54 342.17 181.97 338.00 199.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 352.00 126.00 
C 338.72 121.80 337.94 141.21 349.98 145.02 C 362.01 148.84 362.98 129.47 352.00 126.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 250.00 149.00 
C 227.66 145.20 226.31 187.18 249.00 189.00 C 271.69 190.82 271.03 152.58 250.00 149.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 75.00 302.00 
C 100.46 363.40 188.17 388.20 234.00 335.00
C 262.23 371.77 300.58 347.62 329.75 377.25 C 358.93 406.87 405.62 359.99 429.00 357.00
C 450.66 346.58 488.09 318.50 473.00 284.00
C 524.05 258.39 516.54 187.62 476.00 157.00
C 473.95 158.74 471.97 156.97 470.00 156.00
C 538.62 203.07 471.08 307.60 399.00 281.00
C 417.95 289.56 440.62 288.07 460.00 282.00
C 471.46 307.83 445.44 333.12 432.00 345.00
C 408.46 348.95 395.07 368.91 373.02 376.02 C 350.98 383.14 320.74 373.99 311.00 352.00
C 281.84 358.70 251.06 350.62 231.00 328.00
C 244.13 309.86 255.55 289.42 255.00 266.00
C 229.38 288.38 219.58 333.59 178.67 343.67 C 137.77 353.76 96.30 339.43 75.00 302.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 411.00 161.00 
C 390.68 155.97 379.56 181.93 398.78 190.22 C 418.00 198.51 430.62 165.86 411.00 161.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 333.00 166.00 
C 321.91 162.28 315.49 182.18 326.78 187.22 C 338.07 192.26 343.14 169.41 333.00 166.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 37.00 169.00 
C 20.23 164.50 20.45 201.59 36.33 203.67 C 52.21 205.75 51.27 172.83 37.00 169.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 172.00 178.00 
C 128.24 171.75 140.01 242.22 183.00 242.00 C 225.99 241.78 211.91 183.70 172.00 178.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 482.00 193.00 
C 460.41 187.20 446.25 232.03 466.78 238.22 C 487.31 244.41 501.79 198.31 482.00 193.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 121.00 194.00 
C 109.51 243.16 159.89 293.53 209.00 280.00
C 163.52 279.19 122.54 239.95 121.00 194.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 364.00 200.00 
C 350.57 198.06 350.27 223.91 364.00 225.00 C 377.73 226.08 376.49 201.81 364.00 200.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 419.00 207.00 
C 396.42 202.32 382.72 228.44 404.00 238.00 C 425.28 247.57 440.93 211.54 419.00 207.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="0.99" stroke="None">
                <path
                    d="
M 62.00 261.00 
C 61.97 259.34 62.08 257.66 62.00 256.00
C 60.44 255.08 59.86 252.81 60.00 251.00
C 45.49 246.53 30.08 235.61 22.00 222.00
C 31.66 239.62 43.00 260.23 63.00 268.00
C 61.57 265.95 62.04 263.41 62.00 261.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 323.00 228.00 
C 305.36 223.96 308.96 260.57 326.33 262.67 C 343.70 264.77 338.22 231.48 323.00 228.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 289.00 261.00 
C 277.76 256.26 257.45 274.34 267.33 282.67 C 277.21 291.00 299.75 265.53 289.00 261.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 119.00 270.00 
C 98.13 264.83 90.83 299.10 110.93 305.07 C 131.02 311.05 138.13 274.74 119.00 270.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 392.00 293.00 
C 378.90 289.68 368.15 315.69 380.78 321.22 C 393.41 326.75 404.50 296.17 392.00 293.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 317.00 301.00 
C 296.13 295.83 284.80 326.17 306.00 332.00 C 327.20 337.83 338.03 306.21 317.00 301.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 423.00 309.00 
C 407.77 305.52 400.79 328.21 416.00 332.00 C 431.21 335.79 437.77 312.38 423.00 309.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 426.00 347.00 
C 405.86 345.42 388.14 358.66 367.25 343.75 C 346.35 328.85 347.68 339.37 368.31 350.69 C 388.93 362.01 406.76 352.08 426.00 347.00 Z"
                />
            </g>
        </svg>
    );
};

export default Type2SVG;
