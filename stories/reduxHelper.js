import { ecopontos } from "../src/components/ecopontos";

const today = new Date();

const eco = [
    {
        lat: "-8.442374726502189",
        lng: "40.577189499853596",
        propriedad: "ERSUC",
        vidrao: "sim",
        papelao: "sim",
        embalao: "sim",
        lixo_geral: "",
        oleao: "",
        pilhao: "",
        dep_roupa: "",
    }
]

export const initialState = {
    ecopontos: eco,
    userLocation: { lat: 40, lng: 10 }
};