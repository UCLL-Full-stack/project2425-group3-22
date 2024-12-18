import ProfileSidebar from '@components/profile/profileSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MainNavigation from '@components/mainNavigation';
import ProfileService from '@services/profileService';
import { poopItem } from '@types';
import Helper from 'utils/helper';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Map: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation(); 

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [poops, setPoops] = useState<poopItem[]>([]);
    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        setIsValidated(Helper.authorizeUser(router));
    }, [router]);

    useEffect(() => {
        const fetchProfilePoopsData = async () => {
            try {
                const response = await ProfileService.getProfileMap();

                if (!response.ok) {
                    throw new Error('Failed to fetch map data');
                }

                const result = await response.json();
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
                    new mapboxgl.Marker({
                        color: getComputedStyle(document.documentElement).getPropertyValue(
                            '--accent-secondary'
                        ),
                    })
                        .setLngLat([poop.longitude, poop.latitude])
                        .addTo(map);
                });
            });

            return () => map.remove();
        }
    }, [poops]);

    if (!isValidated) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{t("title.profile-map")}</title>
            </Head>
            <MainNavigation />
            <main>
                <ProfileSidebar />
                <div ref={mapContainerRef} style={{ flex: 1 }}></div>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Map;
