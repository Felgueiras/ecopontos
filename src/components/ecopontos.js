import { EPS } from "./EPS";


export const getEcopontoByKey = (key) => {
    let ret = ""
    ecopontos.forEach(ecoponto => {
        if (ecoponto.ref === key) {
            ret = ecoponto;
        }
    });
    return ret;
}

export const ecopontos = [
    {
        name: 'Ecoponto 1',
        entity: 'ERSUC',
        ref: 'a',
        services: new EPS(true, false),
        location: {
            lat: 40.5739914,
            lng: -8.445852799999999
        }
    },
    {
        name: 'Ecoponto 2',
        entity: 'ERSUC',
        ref: 'b',
        services: new EPS(true, false, true),
        location: {
            lat: 40.5739914,
            lng: -8.445852799999999
        }
    }
];


