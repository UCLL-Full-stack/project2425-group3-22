import "@styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import 'mapbox-gl/dist/mapbox-gl.css'; 
import 'rc-rate/assets/index.css';
import 'rc-slider/assets/index.css';

// font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleUp, faAngleDown, faPlus, faEllipsisV, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleUp, faAngleDown, faAngleLeft, faAngleRight, faPlus, faEllipsisV);

export default function App({ Component, pageProps }: AppProps) {

    return <Component {...pageProps} />;
}
