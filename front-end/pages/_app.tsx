import "@styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import 'mapbox-gl/dist/mapbox-gl.css'; 

// font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleUp, faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleUp, faPlus, faEllipsisV);

export default function App({ Component, pageProps }: AppProps) {

    return <Component {...pageProps} />;
}
