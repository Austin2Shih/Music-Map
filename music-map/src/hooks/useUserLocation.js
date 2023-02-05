import { useState, useEffect } from "react";

const useUserLocation = () => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const geo = navigator.geolocation
        if (geo) {
            geo.getCurrentPosition((position) => {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            });
        } else {
            setError("Geolocation not working!")
        }
    }, [])

    return {position, error}
}

export default useUserLocation