export class EcoServices {

    static issues = [
        'Vandalizado',
        'Cheio',
        'Localização errada'
    ];


    static services = [
        {
            key: 'papelao',
            name: 'Papelão'
        },
        {
            key: 'eletrao',
            name: 'Eletrão'
        },
        {
            key: 'vidrao',
            name: 'Vidrão'
        },
        {
            key: 'papelao',
            name: 'Papelão'
        },
        {
            key: 'embalao',
            name: 'Embalão'
        },
        {
            key: 'lixo',
            name: 'Lixo Geral'
        },
        {
            key: 'roupa',
            name: 'Roupa'
        }
        // 'oleão',
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