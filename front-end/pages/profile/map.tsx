import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MainNavigation from '@components/mainNavigation';

const Map: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN ?? '';

        if (!mapboxgl.accessToken) {
            console.error('Mapbox access token not set');
            return;
        }

        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/landeriscool/cltul3bhu00fr01p7h0e70gbc',
                center: [45, 45],
                zoom: 4,
                attributionControl: false,
            });

            map.on('load', () => {
                new mapboxgl.Marker({ color: 'brown' })
                    .setLngLat([45, 45])
                    .addTo(map);
            });

            return () => map.remove();
        }
    }, []);

    return (
        <>
            <Head>
                <title>Map</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <div ref={mapContainerRef} style={{ width: '100%', height: '100vh'}}></div>
            </main>
        </>
    );
};

export default Map;
