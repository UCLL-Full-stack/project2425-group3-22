import PoopHelper from 'utils/poopHelper';

type Props = {
    color?: string;
};

const Type3SVG: React.FC<Props> = ({ color = PoopHelper.defaultPoopColor() }: Props) => {
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
M 308.00 128.00 
C 312.65 129.87 316.71 132.21 322.00 132.00
C 342.75 131.17 358.44 128.95 378.00 137.00
C 393.73 139.93 410.33 148.51 421.00 161.00
C 439.11 179.11 458.83 200.40 445.00 228.00
C 456.37 230.69 468.25 237.16 475.00 247.00
C 495.97 267.17 505.99 289.63 477.75 309.75 C 449.52 329.87 419.00 315.39 388.00 324.00 C 356.99 332.61 319.46 318.95 290.32 317.68 C 261.19 316.41 228.03 332.49 203.00 308.00
C 166.10 339.93 110.11 331.40 75.00 302.00
C 58.48 295.52 48.28 281.02 40.00 266.00
C 13.58 218.09 40.06 132.31 106.00 149.00
C 130.74 116.64 165.34 127.71 198.07 126.93 C 230.81 126.15 274.82 108.79 308.00 128.00
M 355.00 128.00 
C 352.90 130.08 348.85 128.50 346.00 129.00
C 348.10 126.92 352.15 128.50 355.00 128.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="0.82"
                strokeWidth="0.3"
            >
                <path
                    d="
M 40.00 266.00 
C 29.01 233.55 32.42 211.09 48.75 178.75 C 65.09 146.42 98.02 164.52 122.25 145.25 C 146.47 125.98 180.37 132.89 210.07 131.07 C 239.77 129.26 277.22 120.47 308.00 128.00
C 274.82 108.79 230.81 126.15 198.07 126.93 C 165.34 127.71 130.74 116.64 106.00 149.00
C 40.06 132.31 13.58 218.09 40.00 266.00 Z"
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
M 40.00 266.00 
C 48.28 281.02 58.48 295.52 75.00 302.00
C 98.81 311.35 136.33 335.05 163.07 313.07 C 189.82 291.10 213.90 318.42 246.00 313.00 C 278.10 307.58 308.37 316.56 342.00 316.00 C 375.63 315.44 410.17 311.24 442.22 309.22 C 474.27 307.20 492.12 271.95 475.00 247.00
C 468.25 237.16 456.37 230.69 445.00 228.00
C 439.75 226.76 434.39 225.82 429.00 225.00
C 440.67 204.84 437.42 177.77 421.00 161.00
C 410.33 148.51 393.73 139.93 378.00 137.00
C 358.63 133.40 335.50 139.34 322.00 132.00
C 316.71 132.21 312.65 129.87 308.00 128.00
C 277.22 120.47 239.77 129.26 210.07 131.07 C 180.37 132.89 146.47 125.98 122.25 145.25 C 98.02 164.52 65.09 146.42 48.75 178.75 C 32.42 211.09 29.01 233.55 40.00 266.00
M 280.00 137.00 
C 293.63 138.70 302.77 153.62 286.93 155.07 C 271.09 156.52 262.21 134.78 280.00 137.00
M 200.00 140.00 
C 187.71 148.35 177.52 161.49 178.00 177.00
C 194.47 164.40 216.38 158.07 237.00 162.00
C 214.32 162.89 160.41 175.93 189.00 206.00
C 160.96 192.67 169.96 144.76 200.00 140.00
M 373.00 165.00 
C 361.48 155.43 343.61 155.65 332.00 165.00
C 337.99 147.30 367.11 146.91 373.00 165.00
M 114.00 158.00 
C 108.33 172.65 113.53 191.45 128.00 199.00
C 107.99 202.42 96.35 168.15 114.00 158.00
M 150.00 158.00 
C 160.53 161.14 155.44 181.57 144.00 177.00 C 132.56 172.43 138.87 154.68 150.00 158.00
M 408.00 160.00 
C 417.33 162.51 416.30 178.38 406.33 175.67 C 396.36 172.96 397.74 157.25 408.00 160.00
M 83.00 176.00 
C 93.84 180.06 82.05 205.20 71.33 199.67 C 60.61 194.14 71.59 171.73 83.00 176.00
M 365.00 187.00 
C 359.21 206.11 339.67 219.56 320.00 221.00
C 325.71 249.49 315.48 281.11 291.00 298.00
C 324.41 266.99 323.85 209.01 289.00 180.00
C 306.19 182.92 307.87 211.32 323.00 212.00 C 338.13 212.68 354.27 196.66 365.00 187.00
M 255.00 189.00 
C 264.80 192.84 253.00 218.19 243.33 212.67 C 233.66 207.15 245.58 185.31 255.00 189.00
M 394.00 213.00 
C 411.06 217.23 396.90 245.57 380.33 236.67 C 363.76 227.77 376.51 208.67 394.00 213.00
M 63.00 216.00 
C 69.02 260.00 117.04 289.81 159.00 280.00
C 116.00 300.30 60.99 261.31 63.00 216.00
M 201.00 219.00 
C 174.39 232.68 168.80 269.51 187.00 292.00
C 157.71 275.45 168.53 224.28 201.00 219.00
M 335.00 250.00 
C 359.06 281.74 413.31 269.42 422.00 231.00
C 428.11 278.23 351.04 295.19 335.00 250.00
M 294.00 233.00 
C 305.16 234.79 304.39 259.52 292.33 257.67 C 280.26 255.81 281.57 231.01 294.00 233.00
M 119.00 237.00 
C 131.25 238.31 128.56 259.26 116.00 257.00 C 103.44 254.74 106.62 235.68 119.00 237.00
M 456.00 288.00 
C 457.09 272.80 446.04 255.86 429.00 257.00
C 445.75 248.19 463.82 272.32 456.00 288.00
M 196.00 265.00 
C 207.02 266.60 211.72 287.46 199.33 287.67 C 186.93 287.87 183.23 263.15 196.00 265.00
M 266.00 266.00 
C 263.94 282.04 239.50 286.49 231.00 273.00
C 242.89 278.47 256.89 275.52 266.00 266.00
M 346.00 291.00 
C 363.15 293.78 354.33 309.86 337.33 305.67 C 320.33 301.48 329.63 288.34 346.00 291.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="0.00"
                strokeWidth="0.3"
            >
                <path
                    d="
M 355.00 128.00 
C 352.15 128.50 348.10 126.92 346.00 129.00
C 348.85 128.50 352.90 130.08 355.00 128.00 Z"
                />
            </g>
            <g
                fill="None"
                fillOpacity="0.0"
                stroke={highlight}
                strokeOpacity="0.74"
                strokeWidth="0.3"
            >
                <path
                    d="
M 322.00 132.00 
C 335.50 139.34 358.63 133.40 378.00 137.00
C 358.44 128.95 342.75 131.17 322.00 132.00 Z"
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
M 280.00 137.00 
C 262.21 134.78 271.09 156.52 286.93 155.07 C 302.77 153.62 293.63 138.70 280.00 137.00 Z"
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
M 200.00 140.00 
C 169.96 144.76 160.96 192.67 189.00 206.00
C 160.41 175.93 214.32 162.89 237.00 162.00
C 216.38 158.07 194.47 164.40 178.00 177.00
C 177.52 161.49 187.71 148.35 200.00 140.00 Z"
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
M 373.00 165.00 
C 367.11 146.91 337.99 147.30 332.00 165.00
C 343.61 155.65 361.48 155.43 373.00 165.00 Z"
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
M 114.00 158.00 
C 96.35 168.15 107.99 202.42 128.00 199.00
C 113.53 191.45 108.33 172.65 114.00 158.00 Z"
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
M 150.00 158.00 
C 138.87 154.68 132.56 172.43 144.00 177.00 C 155.44 181.57 160.53 161.14 150.00 158.00 Z"
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
M 408.00 160.00 
C 397.74 157.25 396.36 172.96 406.33 175.67 C 416.30 178.38 417.33 162.51 408.00 160.00 Z"
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
M 445.00 228.00 
C 458.83 200.40 439.11 179.11 421.00 161.00
C 437.42 177.77 440.67 204.84 429.00 225.00
C 434.39 225.82 439.75 226.76 445.00 228.00 Z"
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
M 83.00 176.00 
C 71.59 171.73 60.61 194.14 71.33 199.67 C 82.05 205.20 93.84 180.06 83.00 176.00 Z"
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
M 365.00 187.00 
C 354.27 196.66 338.13 212.68 323.00 212.00 C 307.87 211.32 306.19 182.92 289.00 180.00
C 323.85 209.01 324.41 266.99 291.00 298.00
C 315.48 281.11 325.71 249.49 320.00 221.00
C 339.67 219.56 359.21 206.11 365.00 187.00 Z"
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
M 255.00 189.00 
C 245.58 185.31 233.66 207.15 243.33 212.67 C 253.00 218.19 264.80 192.84 255.00 189.00 Z"
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
M 394.00 213.00 
C 376.51 208.67 363.76 227.77 380.33 236.67 C 396.90 245.57 411.06 217.23 394.00 213.00 Z"
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
M 63.00 216.00 
C 60.99 261.31 116.00 300.30 159.00 280.00
C 117.04 289.81 69.02 260.00 63.00 216.00 Z"
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
M 201.00 219.00 
C 168.53 224.28 157.71 275.45 187.00 292.00
C 168.80 269.51 174.39 232.68 201.00 219.00 Z"
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
M 335.00 250.00 
C 351.04 295.19 428.11 278.23 422.00 231.00
C 413.31 269.42 359.06 281.74 335.00 250.00 Z"
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
M 294.00 233.00 
C 281.57 231.01 280.26 255.81 292.33 257.67 C 304.39 259.52 305.16 234.79 294.00 233.00 Z"
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
M 119.00 237.00 
C 106.62 235.68 103.44 254.74 116.00 257.00 C 128.56 259.26 131.25 238.31 119.00 237.00 Z"
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
M 75.00 302.00 
C 110.11 331.40 166.10 339.93 203.00 308.00
C 228.03 332.49 261.19 316.41 290.32 317.68 C 319.46 318.95 356.99 332.61 388.00 324.00 C 419.00 315.39 449.52 329.87 477.75 309.75 C 505.99 289.63 495.97 267.17 475.00 247.00
C 492.12 271.95 474.27 307.20 442.22 309.22 C 410.17 311.24 375.63 315.44 342.00 316.00 C 308.37 316.56 278.10 307.58 246.00 313.00 C 213.90 318.42 189.82 291.10 163.07 313.07 C 136.33 335.05 98.81 311.35 75.00 302.00 Z"
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
M 456.00 288.00 
C 463.82 272.32 445.75 248.19 429.00 257.00
C 446.04 255.86 457.09 272.80 456.00 288.00 Z"
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
M 196.00 265.00 
C 183.23 263.15 186.93 287.87 199.33 287.67 C 211.72 287.46 207.02 266.60 196.00 265.00 Z"
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
M 266.00 266.00 
C 256.89 275.52 242.89 278.47 231.00 273.00
C 239.50 286.49 263.94 282.04 266.00 266.00 Z"
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
M 346.00 291.00 
C 329.63 288.34 320.33 301.48 337.33 305.67 C 354.33 309.86 363.15 293.78 346.00 291.00 Z"
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
M 308.00 128.00 
C 312.65 129.87 316.71 132.21 322.00 132.00
C 342.75 131.17 358.44 128.95 378.00 137.00
C 393.73 139.93 410.33 148.51 421.00 161.00
C 439.11 179.11 458.83 200.40 445.00 228.00
C 456.37 230.69 468.25 237.16 475.00 247.00
C 495.97 267.17 505.99 289.63 477.75 309.75 C 449.52 329.87 419.00 315.39 388.00 324.00 C 356.99 332.61 319.46 318.95 290.32 317.68 C 261.19 316.41 228.03 332.49 203.00 308.00
C 166.10 339.93 110.11 331.40 75.00 302.00
C 58.48 295.52 48.28 281.02 40.00 266.00
C 13.58 218.09 40.06 132.31 106.00 149.00
C 130.74 116.64 165.34 127.71 198.07 126.93 C 230.81 126.15 274.82 108.79 308.00 128.00
M 355.00 128.00 
C 352.90 130.08 348.85 128.50 346.00 129.00
C 348.10 126.92 352.15 128.50 355.00 128.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="0.82" stroke="None">
                <path
                    d="
M 40.00 266.00 
C 29.01 233.55 32.42 211.09 48.75 178.75 C 65.09 146.42 98.02 164.52 122.25 145.25 C 146.47 125.98 180.37 132.89 210.07 131.07 C 239.77 129.26 277.22 120.47 308.00 128.00
C 274.82 108.79 230.81 126.15 198.07 126.93 C 165.34 127.71 130.74 116.64 106.00 149.00
C 40.06 132.31 13.58 218.09 40.00 266.00 Z"
                />
            </g>
            <g fill={color} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 40.00 266.00 
C 48.28 281.02 58.48 295.52 75.00 302.00
C 98.81 311.35 136.33 335.05 163.07 313.07 C 189.82 291.10 213.90 318.42 246.00 313.00 C 278.10 307.58 308.37 316.56 342.00 316.00 C 375.63 315.44 410.17 311.24 442.22 309.22 C 474.27 307.20 492.12 271.95 475.00 247.00
C 468.25 237.16 456.37 230.69 445.00 228.00
C 439.75 226.76 434.39 225.82 429.00 225.00
C 440.67 204.84 437.42 177.77 421.00 161.00
C 410.33 148.51 393.73 139.93 378.00 137.00
C 358.63 133.40 335.50 139.34 322.00 132.00
C 316.71 132.21 312.65 129.87 308.00 128.00
C 277.22 120.47 239.77 129.26 210.07 131.07 C 180.37 132.89 146.47 125.98 122.25 145.25 C 98.02 164.52 65.09 146.42 48.75 178.75 C 32.42 211.09 29.01 233.55 40.00 266.00
M 280.00 137.00 
C 293.63 138.70 302.77 153.62 286.93 155.07 C 271.09 156.52 262.21 134.78 280.00 137.00
M 200.00 140.00 
C 187.71 148.35 177.52 161.49 178.00 177.00
C 194.47 164.40 216.38 158.07 237.00 162.00
C 214.32 162.89 160.41 175.93 189.00 206.00
C 160.96 192.67 169.96 144.76 200.00 140.00
M 373.00 165.00 
C 361.48 155.43 343.61 155.65 332.00 165.00
C 337.99 147.30 367.11 146.91 373.00 165.00
M 114.00 158.00 
C 108.33 172.65 113.53 191.45 128.00 199.00
C 107.99 202.42 96.35 168.15 114.00 158.00
M 150.00 158.00 
C 160.53 161.14 155.44 181.57 144.00 177.00 C 132.56 172.43 138.87 154.68 150.00 158.00
M 408.00 160.00 
C 417.33 162.51 416.30 178.38 406.33 175.67 C 396.36 172.96 397.74 157.25 408.00 160.00
M 83.00 176.00 
C 93.84 180.06 82.05 205.20 71.33 199.67 C 60.61 194.14 71.59 171.73 83.00 176.00
M 365.00 187.00 
C 359.21 206.11 339.67 219.56 320.00 221.00
C 325.71 249.49 315.48 281.11 291.00 298.00
C 324.41 266.99 323.85 209.01 289.00 180.00
C 306.19 182.92 307.87 211.32 323.00 212.00 C 338.13 212.68 354.27 196.66 365.00 187.00
M 255.00 189.00 
C 264.80 192.84 253.00 218.19 243.33 212.67 C 233.66 207.15 245.58 185.31 255.00 189.00
M 394.00 213.00 
C 411.06 217.23 396.90 245.57 380.33 236.67 C 363.76 227.77 376.51 208.67 394.00 213.00
M 63.00 216.00 
C 69.02 260.00 117.04 289.81 159.00 280.00
C 116.00 300.30 60.99 261.31 63.00 216.00
M 201.00 219.00 
C 174.39 232.68 168.80 269.51 187.00 292.00
C 157.71 275.45 168.53 224.28 201.00 219.00
M 335.00 250.00 
C 359.06 281.74 413.31 269.42 422.00 231.00
C 428.11 278.23 351.04 295.19 335.00 250.00
M 294.00 233.00 
C 305.16 234.79 304.39 259.52 292.33 257.67 C 280.26 255.81 281.57 231.01 294.00 233.00
M 119.00 237.00 
C 131.25 238.31 128.56 259.26 116.00 257.00 C 103.44 254.74 106.62 235.68 119.00 237.00
M 456.00 288.00 
C 457.09 272.80 446.04 255.86 429.00 257.00
C 445.75 248.19 463.82 272.32 456.00 288.00
M 196.00 265.00 
C 207.02 266.60 211.72 287.46 199.33 287.67 C 186.93 287.87 183.23 263.15 196.00 265.00
M 266.00 266.00 
C 263.94 282.04 239.50 286.49 231.00 273.00
C 242.89 278.47 256.89 275.52 266.00 266.00
M 346.00 291.00 
C 363.15 293.78 354.33 309.86 337.33 305.67 C 320.33 301.48 329.63 288.34 346.00 291.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="0.00" stroke="None">
                <path
                    d="
M 355.00 128.00 
C 352.15 128.50 348.10 126.92 346.00 129.00
C 348.85 128.50 352.90 130.08 355.00 128.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="0.74" stroke="None">
                <path
                    d="
M 322.00 132.00 
C 335.50 139.34 358.63 133.40 378.00 137.00
C 358.44 128.95 342.75 131.17 322.00 132.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 280.00 137.00 
C 262.21 134.78 271.09 156.52 286.93 155.07 C 302.77 153.62 293.63 138.70 280.00 137.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 200.00 140.00 
C 169.96 144.76 160.96 192.67 189.00 206.00
C 160.41 175.93 214.32 162.89 237.00 162.00
C 216.38 158.07 194.47 164.40 178.00 177.00
C 177.52 161.49 187.71 148.35 200.00 140.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 373.00 165.00 
C 367.11 146.91 337.99 147.30 332.00 165.00
C 343.61 155.65 361.48 155.43 373.00 165.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 114.00 158.00 
C 96.35 168.15 107.99 202.42 128.00 199.00
C 113.53 191.45 108.33 172.65 114.00 158.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 150.00 158.00 
C 138.87 154.68 132.56 172.43 144.00 177.00 C 155.44 181.57 160.53 161.14 150.00 158.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 408.00 160.00 
C 397.74 157.25 396.36 172.96 406.33 175.67 C 416.30 178.38 417.33 162.51 408.00 160.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 445.00 228.00 
C 458.83 200.40 439.11 179.11 421.00 161.00
C 437.42 177.77 440.67 204.84 429.00 225.00
C 434.39 225.82 439.75 226.76 445.00 228.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 83.00 176.00 
C 71.59 171.73 60.61 194.14 71.33 199.67 C 82.05 205.20 93.84 180.06 83.00 176.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 365.00 187.00 
C 354.27 196.66 338.13 212.68 323.00 212.00 C 307.87 211.32 306.19 182.92 289.00 180.00
C 323.85 209.01 324.41 266.99 291.00 298.00
C 315.48 281.11 325.71 249.49 320.00 221.00
C 339.67 219.56 359.21 206.11 365.00 187.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 255.00 189.00 
C 245.58 185.31 233.66 207.15 243.33 212.67 C 253.00 218.19 264.80 192.84 255.00 189.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 394.00 213.00 
C 376.51 208.67 363.76 227.77 380.33 236.67 C 396.90 245.57 411.06 217.23 394.00 213.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 63.00 216.00 
C 60.99 261.31 116.00 300.30 159.00 280.00
C 117.04 289.81 69.02 260.00 63.00 216.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 201.00 219.00 
C 168.53 224.28 157.71 275.45 187.00 292.00
C 168.80 269.51 174.39 232.68 201.00 219.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 335.00 250.00 
C 351.04 295.19 428.11 278.23 422.00 231.00
C 413.31 269.42 359.06 281.74 335.00 250.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 294.00 233.00 
C 281.57 231.01 280.26 255.81 292.33 257.67 C 304.39 259.52 305.16 234.79 294.00 233.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 119.00 237.00 
C 106.62 235.68 103.44 254.74 116.00 257.00 C 128.56 259.26 131.25 238.31 119.00 237.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="0.99" stroke="None">
                <path
                    d="
M 75.00 302.00 
C 110.11 331.40 166.10 339.93 203.00 308.00
C 228.03 332.49 261.19 316.41 290.32 317.68 C 319.46 318.95 356.99 332.61 388.00 324.00 C 419.00 315.39 449.52 329.87 477.75 309.75 C 505.99 289.63 495.97 267.17 475.00 247.00
C 492.12 271.95 474.27 307.20 442.22 309.22 C 410.17 311.24 375.63 315.44 342.00 316.00 C 308.37 316.56 278.10 307.58 246.00 313.00 C 213.90 318.42 189.82 291.10 163.07 313.07 C 136.33 335.05 98.81 311.35 75.00 302.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 456.00 288.00 
C 463.82 272.32 445.75 248.19 429.00 257.00
C 446.04 255.86 457.09 272.80 456.00 288.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 196.00 265.00 
C 183.23 263.15 186.93 287.87 199.33 287.67 C 211.72 287.46 207.02 266.60 196.00 265.00 Z"
                />
            </g>
            <g fill={shadow} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 266.00 266.00 
C 256.89 275.52 242.89 278.47 231.00 273.00
C 239.50 286.49 263.94 282.04 266.00 266.00 Z"
                />
            </g>
            <g fill={highlight} fillOpacity="1.00" stroke="None">
                <path
                    d="
M 346.00 291.00 
C 329.63 288.34 320.33 301.48 337.33 305.67 C 354.33 309.86 363.15 293.78 346.00 291.00 Z"
                />
            </g>
        </svg>
    );
};

export default Type3SVG;
