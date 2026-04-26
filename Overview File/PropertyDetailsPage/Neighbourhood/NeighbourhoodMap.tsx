import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import * as React from 'react';

type NeighbourhoodMapProps = {
    mapCenter: {
        lat: number;
        lng: number;
    };
};

const NeighbourhoodMap = ({ mapCenter }: NeighbourhoodMapProps) => {
    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}
        >
            <GoogleMap
                mapContainerStyle={{}}
                center={mapCenter}
                zoom={15}
                options={{
                    mapTypeControl: false,
                }}
            >
                <Marker position={mapCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

export default React.memo(NeighbourhoodMap);
