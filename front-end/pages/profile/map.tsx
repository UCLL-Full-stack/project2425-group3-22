import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MainNavigation from '@components/mainNavigation';
import ProfileService from '@services/profileService';
import { poopItem } from '@types';

const Map: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [poops, setPoops] = useState<poopItem[]>([]);

    useEffect(() => {
        const fetchProfilePoopsData = async () => {
            try {
                const response = await ProfileService.getProfileMap();

                if (!response.ok) {
                    throw new Error('Failed to fetch map data');
                }

                const result = await response.json();
                console.log(result);
                setPoops(result);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        fetchProfilePoopsData();
    }, []);

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
                center: poops.length ? [poops[0].longitude, poops[0].latitude] : [0, 0],
                zoom: 4,
                attributionControl: false,
            });

            map.on('load', () => {
                poops.forEach((poop: any) => {
                    new mapboxgl.Marker({ color: 'brown' })
                        .setLngLat([poop.longitude, poop.latitude])
                        .addTo(map);
                });
            });

            return () => map.remove();
        }
    }, [poops]);

    return (
        <>
            <Head>
                <title>Map</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <div ref={mapContainerRef} style={{ flex: 1 }}></div>
            </main>
        </>
    );
};

export default Map;
