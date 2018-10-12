// icons
import battery from '../img/services/battery.jpg';
import clothes from '../img/services/clothes.jpg';
import glass from '../img/services/glass.jpg';
import oil from '../img/services/oil.jpg';
import paper from '../img/services/paper.jpg';
import plastic from '../img/services/plastic.jpg';
import trash from '../img/services/trash.jpg';

export class EcoServices {

    static issues = [
        'Vandalizado',
        'Cheio',
        'Localização errada'
    ];

    static getServices() {
        let serv = [];
        this.services.forEach(service => {
            serv.push(service.key);
        });
        return serv;
    }

    static services = [
        {
            key: 'oleao',
            name: 'Oleão',
            icon: oil
        },
        {
            key: 'papelao',
            name: 'Papelão',
            icon: paper
        },
        {
            key: 'vidrao',
            name: 'Vidrão',
            icon: glass
        },
        {
            key: 'embalao',
            name: 'Embalão',
            icon: plastic
        },
        {
            key: 'lixo_geral',
            name: 'Lixo Geral',
            icon: trash

        },
        {
            key: 'dep_roupa',
            name: 'Roupa',
            icon: clothes

        },
        {
            key: 'pilhao',
            name: 'Pilhão',
            icon: battery

        }
    ];

    static getNameForService(key) {
        let ret = ""
        this.services.forEach(service => {
            if (service.key === key) {
                ret = service.name;
                // break;
            }
        });
        return ret;
    }
}