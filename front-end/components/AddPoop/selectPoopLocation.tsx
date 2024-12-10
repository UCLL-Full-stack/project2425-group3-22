import styles from '@styles/addPoop.module.css';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

type Props = {
    selectedPoopLocation: { lat: number; lng: number } | null;
    poopLocationChanged: (location: { lat: number; lng: number } | null) => void;
};

const SelectPoopLocation: React.FC<Props> = ({ selectedPoopLocation, poopLocationChanged }: Props) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);


    // Initialize the map
    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN ?? '';

        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/landeriscool/cltul3bhu00fr01p7h0e70gbc',
                center: [selectedPoopLocation?.lng ?? 4.7025, selectedPoopLocation?.lat ?? 50.8791], // Set default position if needed (Leuven)
                zoom: 10,
                attributionControl: false,
            });

            mapRef.current.on('click', (e) => {
                const { lng, lat } = e.lngLat;
                
                if (!markerRef.current) {
                    // Create marker
                    markerRef.current = new mapboxgl.Marker({
                        color: getComputedStyle(document.documentElement).getPropertyValue(
                            '--accent-secondary'
                        ),
                    })
                        .setLngLat([lng, lat])
                        .addTo(mapRef.current!);
                } else {
                    // Update existing marker position
                    markerRef.current.setLngLat([lng, lat]);
                }

                poopLocationChanged({ lat, lng });

                mapRef.current?.flyTo({ center: [lng, lat] });
            });
        }
    }, [selectedPoopLocation]);

    return (
        <div className={styles.poopMapContainer}>
            <div ref={mapContainerRef} className={styles.map}></div>
        </div>
    );
};

export default SelectPoopLocation;
