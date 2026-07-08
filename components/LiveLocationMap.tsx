'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Create home marker icon
const createHomeIcon = () => {
  return L.divIcon({
    html: `<div style="background: white; width: 40px; height: 40px; border-radius: 12px; border: 3px solid #2563EB; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: '',
  });
};

// Create current position marker
const createPositionIcon = (isInside: boolean) => {
  const color = isInside ? '#2563EB' : '#EF4444';
  const shadow = isInside ? 'rgba(37, 99, 235, 0.4)' : 'rgba(239, 68, 68, 0.4)';

  return L.divIcon({
    html: `<div style="position: relative; width: 30px; height: 30px;">
      <div style="position: absolute; width: 50px; height: 50px; background: ${color}33; border-radius: 50%; top: -25px; left: -25px;"></div>
      <div style="position: absolute; width: 30px; height: 30px; background: ${color}; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 12px ${shadow}; top: 0; left: 0; display: flex; align-items: center; justify-content: center;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    className: '',
  });
};

interface MapProps {
  center: [number, number];
  currentPosition: [number, number];
  safeZoneRadius: number;
  isInsideZone: boolean;
  address?: string;
}

export default function LiveLocationMap({
  center,
  currentPosition,
  safeZoneRadius,
  isInsideZone,
  address = 'Jl. Sukarno No.70'
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize map
  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map
    const map = L.map(mapRef.current, {
      center: center,
      zoom: 17,
      zoomControl: false,
      attributionControl: false,
    });

    // Add tile layer with HTTPS
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Add safe zone circle
    L.circle(center, {
      radius: safeZoneRadius,
      color: '#3B82F6',
      fillColor: '#3B82F6',
      fillOpacity: 0.1,
      weight: 2,
      dashArray: '10, 10',
    }).addTo(map);

    // Add home marker
    const homeMarker = L.marker(center, { icon: createHomeIcon() }).addTo(map);
    homeMarker.bindPopup(`
      <div style="text-align: center; padding: 8px;">
        <strong style="color: #2563EB;">Home (Safe Zone)</strong><br/>
        <span style="font-size: 14px; color: #6B7280;">${address}</span>
      </div>
    `);

    // Add current position marker
    const posMarker = L.marker(currentPosition, { icon: createPositionIcon(isInsideZone) }).addTo(map);
    posMarker.bindPopup(`
      <div style="text-align: center; padding: 8px;">
        <strong style="color: ${isInsideZone ? '#2563EB' : '#EF4444'};">Current Position</strong><br/>
        <span style="font-size: 14px; color: #6B7280;">
          ${isInsideZone ? 'Inside Safe Zone' : 'Outside Safe Zone'}
        </span>
      </div>
    `);

    // Fit bounds to show both markers
    const bounds = L.latLngBounds([center, currentPosition]);
    map.fitBounds(bounds, { padding: [50, 50] });

    // Fix for tiles not loading
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    mapInstanceRef.current = map;
  }, [center, currentPosition, safeZoneRadius, isInsideZone, address]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !mapInstanceRef.current) {
      initMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMounted, initMap]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) {
    return (
      <div style={{
        height: '384px',
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
        borderRadius: '0 0 12px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '3px solid #3B82F6',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 12px'
          }}></div>
          <p style={{ color: '#3B82F6', fontSize: '14px', fontWeight: 500 }}>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .leaflet-container {
          width: 100%;
          height: 384px;
          background: #f8fafc;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        .leaflet-popup-content {
          margin: 12px 16px !important;
          font-family: inherit !important;
        }
        .leaflet-popup-tip {
          box-shadow: none !important;
        }
      `}</style>
      <div ref={mapRef} style={{ width: '100%', height: '384px' }}></div>

      {/* Legend Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: '12px',
        padding: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB',
        zIndex: 1000,
      }}>
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Legend</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: isInsideZone ? '#2563EB' : '#EF4444',
            }}></div>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Current Location</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'rgba(59, 130, 246, 0.3)',
              border: '1px solid #3B82F6',
              borderRadius: '50%',
            }}></div>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Safe Zone ({safeZoneRadius}m)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'white',
              border: '2px solid #2563EB',
              borderRadius: '3px',
            }}></div>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Home Base</span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        padding: '6px 12px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 500,
        zIndex: 1000,
        background: isInsideZone ? '#F0FDF4' : '#FEF2F2',
        color: isInsideZone ? '#15803D' : '#B91C1C',
        border: `1px solid ${isInsideZone ? '#BBF7D0' : '#FECACA'}`,
      }}>
        {isInsideZone ? 'Inside Safe Zone' : 'Outside Safe Zone'}
      </div>
    </div>
  );
}
