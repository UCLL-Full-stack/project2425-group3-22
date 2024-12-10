import styles from '@styles/addPoop.module.css';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

type Props = {};

const SelectPoopLocation: React.FC<Props> = ({}: Props) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);

    // Set default position
    const [position, setPosition] = useState({
        lat: 50.8791,
        lng: 4.7025,
    });

    // Initialize the map
    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN ?? '';

        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/landeriscool/cltul3bhu00fr01p7h0e70gbc',
                center: [position.lng, position.lat],
                zoom: 10,
            });

            markerRef.current = new mapboxgl.Marker({
                color: getComputedStyle(document.documentElement).getPropertyValue(
                    '--accent-secondary'
                ),
            })
                .setLngLat([position.lng, position.lat])
                .addTo(mapRef.current);

            mapRef.current.on('click', (e) => {
                const { lng, lat } = e.lngLat;
                setPosition({ lat, lng });

                // Update marker position
                markerRef.current?.setLngLat([lng, lat]);
                mapRef.current?.flyTo({ center: [lng, lat] });
            });
        }
    }, [position]);

    // Set the marker and location when the position changes
    useEffect(() => {
        if (mapRef.current && position) {
            mapRef.current.flyTo({ center: [position.lng, position.lat] });
            markerRef.current?.setLngLat([position.lng, position.lat]);
        }
    }, [position]);

    return (
        <div className={styles.poopMapContainer}>
            <div ref={mapContainerRef} className={styles.map}></div>
        </div>
    );
};

export default SelectPoopLocation;
