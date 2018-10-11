class ShopUtils {

    constructor(shops) {
        this.shops = shops;
    }

    degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
    }

    getDifferenceBetweenGPSCoordinates = (userLatitude, userLongitude, shopLatitude, shopLongitude) => {
        const earthRadiusKm = 6371;

        const dLat = this.degreesToRadians(shopLatitude - userLatitude);
        const dLon = this.degreesToRadians(shopLongitude - userLongitude);

        const lat1 = this.degreesToRadians(userLatitude);
        const lat2 = this.degreesToRadians(shopLatitude);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInMeters = earthRadiusKm * c * 1000;
        return distanceInMeters;
    }

    /**
     * Return distance to shop in meters
     */
    getDistanceToShop = (shopID, position) => {
        const shop = this.shops.filter(shop => shop.id === shopID)[0];
        if (shop === undefined) {
            return 'x';
        }
        return this.getDifferenceBetweenGPSCoordinates(position.lat, position.lng, shop.location["degrees-latitude"], shop.location["degrees-longitude"]);
    }

    getShopByID = (shopID) => {
        const shops = this.shops.filter(shop => shop.id === shopID);
        if (shops.length === 1) {
            return shops[0];
        }
        return undefined;
    }

    getDistanceToShopByShop = (shop, position) => {
        return this.getDifferenceBetweenGPSCoordinates(position.lat, position.lng, shop.location["degrees-latitude"], shop.location["degrees-longitude"]);
    }
}

export default ShopUtils