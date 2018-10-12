export default class GPSutils {


    static degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
    }
    
    static getDifferenceBetweenGPSCoordinates = (userLatitude, userLongitude, shopLatitude, shopLongitude) => {
        const earthRadiusKm = 6371;

        const dLat = GPSutils.degreesToRadians(shopLatitude - userLatitude);
        const dLon = GPSutils.degreesToRadians(shopLongitude - userLongitude);

        const lat1 = GPSutils.degreesToRadians(userLatitude);
        const lat2 = GPSutils.degreesToRadians(shopLatitude);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInMeters = earthRadiusKm * c * 1000;
        return distanceInMeters;
    }

}

