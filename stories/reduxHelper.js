import { quizzes } from './Utils';
import CauseAPI from '../src/services/api/CauseAPI';

export const
    newBonus = [
        // "cause" bonus
        {
            "_id": "5b6467f8455a27314090e5ba",
            "id": "-1",
            "name": "Bónus de setembro",
            "description": "Veggie burger oferecido para apoiantes da Escola A!",
            "cost": 0,
            "cause": "user-guid://school-0",
            "spotID": "9",
            "constraints": {
                "period": "day",
                "times": 3
            },
            "icon": "https://pbs.twimg.com/profile_images/636414451252621312/pZ_tLEw-_400x400.jpg",
            "start": "2018/08/10",
            "expires": "3000/10/01",
            "successfulTransactionIcon": "https://i.pinimg.com/originals/5f/cb/99/5fcb995c29b87b8bbe95ea08e5b574fc.jpg", "failedTransactionIcon": "https://i.ebayimg.com/images/g/fFsAAOSwroZas79w/s-l300.jpg"
        },
        {
            "_id": "5b6467f8455a27314090e5ba",
            "id": "0",
            "name": "Veggie burger",
            "description": "Veggie burger preparado com muito gosto e delicadeza",
            "cost": 10,
            "spotID": "9",
            "constraints": {
                "period": "day",
                "times": 3
            },
            "icon": "https://pbs.twimg.com/profile_images/636414451252621312/pZ_tLEw-_400x400.jpg",
            "start": "2018/08/10",
            "expires": "3000/10/01",
            "successfulTransactionIcon": "https://i.pinimg.com/originals/5f/cb/99/5fcb995c29b87b8bbe95ea08e5b574fc.jpg", "failedTransactionIcon": "https://i.ebayimg.com/images/g/fFsAAOSwroZas79w/s-l300.jpg"
        },
        {

            "_id": "5b680e4042a2542ad8709247",
            "id": "1",
            "name": "Veggie burger 2",
            "description": "Veggie burger 2",
            "cost": 10,
            "spotID": "7",
            "icon": "https://pbs.twimg.com/profile_images/636414451252621312/pZ_tLEw-_400x400.jpg",
            "start": "2018/08/10",
            "expires": "3000/10/01",
            "constraints": {
                "period": "day",
                "times": 1
            },
            "successfulTransactionIcon": "https://i.pinimg.com/originals/5f/cb/99/5fcb995c29b87b8bbe95ea08e5b574fc.jpg",
            "failedTransactionIcon": "https://i.ebayimg.com/images/g/fFsAAOSwroZas79w/s-l300.jpg"
        },
        {
            "_id": "5b6467f8455a27314090e5ba",
            "id": "2",
            "name": "Veggie burger",
            "description": "Veggie burger",
            "cost": 100,
            "spotID": "9",
            "icon": "https://pbs.twimg.com/profile_images/636414451252621312/pZ_tLEw-_400x400.jpg",
            "start": "2000/08/07",
            "expires": "3000/10/01",
            "successfulTransactionIcon": "https://i.pinimg.com/originals/5f/cb/99/5fcb995c29b87b8bbe95ea08e5b574fc.jpg", "failedTransactionIcon": "https://i.ebayimg.com/images/g/fFsAAOSwroZas79w/s-l300.jpg"
        },
    ];

export const newShops = [

    {
        "id": '0',
        "name": 'Campo Grande 25',
        "description": 'Campo Grande 25',
        "picture": 'https://github.com/reTHINK-project/dev-dsm-app/blob/5cb9ab20be846facd5cfcd4250a5240494bd53ac/public/shops/campo_grande.jpg?raw=true',
        'opening-hours': { "monday": '[\'09:00-12:00\', \'13:00-18:00\']', "sunday": '[]', "exceptions": { '2016-11-11': '[\'09:00-12:00\']', '2016-12-25': '[]', '01-01': '[]', '12-25': '[\'09:00-12:00\']' } },
        "location": {
            'degrees-latitude': 38.749533,
            'degrees-longitude': - 9.150412
        }
    },
    {
        "id": '1',
        "name": 'Camara Municipal de Lisboa',
        "description": 'Camara Municipal de Lisboa',
        "picture": 'https://github.com/reTHINK-project/dev-dsm-app/blob/5cb9ab20be846facd5cfcd4250a5240494bd53ac/public/shops/camara_lisboa.jpg?raw=true',
        'opening-hours': { "monday": '[\'09:00-12:00\', \'13:00-18:00\']', "sunday": '[]', "exceptions": { '2016-11-11': '[\'09:00-12:00\']', '2016-12-25': '[]', '01-01': '[]', '12-25': '[\'09:00-12:00\']' } },
        "location": {
            'degrees-latitude': 38.708189,
            'degrees-longitude': - 9.138569
        }
    },
    {
        "id": '2',
        "name": 'Praça do Município 31',
        "description": 'Praça do Município 31',
        "picture": 'https://github.com/reTHINK-project/dev-dsm-app/blob/5cb9ab20be846facd5cfcd4250a5240494bd53ac/public/shops/praca_municipio.jpg?raw=true',
        'opening-hours': { "monday": '[\'09:00-12:00\', \'13:00-18:00\']', "sunday": '[]', "exceptions": { '2016-11-11': '[\'09:00-12:00\']', '2016-12-25': '[]', '01-01': '[]', '12-25': '[\'09:00-12:00\']' } },
        "location": {
            'degrees-latitude': 38.708370,
            'degrees-longitude': - 9.139291
        }
    },
    {
        "id": '3',
        "name": 'Pavilhão de Matemática',
        "description": 'Pavilhão de Matemática',
        "picture": 'https://github.com/reTHINK-project/dev-dsm-app/blob/5cb9ab20be846facd5cfcd4250a5240494bd53ac/public/shops/pavilhao_matematica.jpg?raw=true',
        'opening-hours': { "monday": '[\'09:00-12:00\', \'13:00-18:00\']', "sunday": '[]', "exceptions": { '2016-11-11': '[\'09:00-12:00\']', '2016-12-25': '[]', '01-01': '[]', '12-25': '[\'09:00-12:00\']' } },
        "location": {
            'degrees-latitude': 38.735591,
            'degrees-longitude': - 9.139951
        }
    },
    {
        "id": '4',
        "name": 'Lisboa E-Nova',
        "description": 'Lisboa E-Nova',
        "picture": 'https://github.com/reTHINK-project/dev-dsm-app/blob/develop/public/shops/e_nova.jpg?raw=true',
        'opening-hours': { "monday": '[\'09:00-12:00\', \'13:00-18:00\']', "sunday": '[]', "exceptions": { '2016-11-11': '[\'09:00-12:00\']', '2016-12-25': '[]', '01-01': '[]', '12-25': '[\'09:00-12:00\']' } },
        "location": {
            'degrees-latitude': 38.709384,
            'degrees-longitude': - 9.135344
        }
    },
    {
        "id": '5',
        "name": 'EDP ​​Distribuição - Energia, SA',
        "description": 'EDP ​​Distribuição - Energia, SA',
        "picture": 'https://github.com/reTHINK-project/dev-dsm-app/blob/5cb9ab20be846facd5cfcd4250a5240494bd53ac/public/shops/edp.PNG?raw=true',
        'opening-hours': { "monday": '[\'09:00-12:00\', \'13:00-18:00\']', "sunday": '[]', "exceptions": { '2016-11-11': '[\'09:00-12:00\']', '2016-12-25': '[]', '01-01': '[]', '12-25': '[\'09:00-12:00\']' } },
        "location": {
            'degrees-latitude': 38.725864,
            'degrees-longitude': - 9.148488
        }
    },
    {
        "id": '6',
        "name": 'Reabilita | Lisbon Real Estate Developer',
        "description": 'Reabilita | Lisbon Real Estate Developer',
        "picture": 'https://raw.githubusercontent.com/reTHINK-project/dev-dsm-app/5cb9ab20be846facd5cfcd4250a5240494bd53ac/public/shops/reabilita.jpg',
        'opening-hours': { "monday": '[\'09:00-12:00\', \'13:00-18:00\']', "sunday": '[]', "exceptions": { '2016-11-11': '[\'09:00-12:00\']', '2016-12-25': '[]', '01-01': '[]', '12-25': '[\'09:00-12:00\']' } },
        "location": {
            'degrees-latitude': 38.708487,
            'degrees-longitude': - 9.150423
        }
    },
    {
        "id": '7',
        "name": 'Loja do IT 0',
        "description": 'A Loja IT',
        "picture": 'https://pbs.twimg.com/profile_images/2150974577/top.ht6_400x400.png',
        'opening-hours': {
            "monday": '[\'09:00-12:00\', \'13:00-18:00\']',
            "sunday": '[]',
            "exceptions": {
                '2016-11-11': '[\'09:00-12:00\']',
                '2016-12-25': '[]',
                '01-01': '[]',
                '12-25': '[\'09:00-12:00\']'
            }
        },
        "location": {
            'degrees-latitude': 40.634173,
            'degrees-longitude': -8.660073
        }
    },
    {
        "id": '8',
        "name": 'TECHTRIS HOUSE - ENTER',
        "description": ' ENTERRRR',
        "picture": 'https://scontent.flis7-1.fna.fbcdn.net/v/t31.0-8/18055640_648363808700641_4525749373298022291_o.png?_nc_cat=0&_nc_eui2=AeF-uTdkVvymXcdLcxY1tafaJ2lqnBSIYC7OLz46UB6YoUZqvXjV9XTd7yX8NU0PZgU1GYRgbAggqXUBKk2wauxhVtEU3z3PSuhxaHHxXhLMEg&oh=4e52789d7fcb2a571dd8716bc7d7454c&oe=5B7CFEC7',
        'opening-hours': {
            "monday": '[\'09:00-12:00\', \'13:00-18:00\']',
            "sunday": '[]',
            "exceptions": {
                '2016-11-11': '[\'09:00-12:00\']',
                '2016-12-25': '[]',
                '01-01': '[]',
                '12-25': '[\'09:00-12:00\']'
            }
        },
        "location": {
            'degrees-latitude': 38.708199,
            'degrees-longitude': -9.147116
        }
    },
    {
        "id": '9',
        "name": 'Altice Labs',
        "description": 'Alb  -  aveiro',
        "picture": 'https://pbs.twimg.com/profile_images/887679766064750592/0IU4_WRR_400x400.jpg',
        'opening-hours': {
            "monday": '[\'09:00-12:00\', \'13:00-18:00\']',
            "sunday": '[]',
            "exceptions": {
                '2016-11-11': '[\'09:00-12:00\']',
                '2016-12-25': '[]',
                '01-01': '[]',
                '12-25': '[\'09:00-12:00\']'
            }
        },
        "location": {
            'degrees-latitude': 40.629571,
            'degrees-longitude': -8.646709
        }
    }
];

const today = new Date();

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const initialState = {
    // code: undefined,
    // code: '123',
    tickets: [],
    impactElements: {
        cars: 10,
        people: 0,
        bikes: 0,
        trees: 0,
        birds: 0,
        factories: 4
    },
    newQuizzes: 1,
    showNotifications: false,
    permissions: ['location'],
    // permissions: [],
    finishedSetup: false,
    walkthrough: false,
    network: true,
    login: "user://google.com/rafaelfelgueiras1993@gmail.com",
    // login: "user://facebook.com/Rafael Felgueiras",
    publicWallets: [

        {
            address: 'school0-wallet',
            identity: {
                userProfile: {
                    guid: "user-guid://school-0"
                }
            },
            created: 1530527996328,
            balance: 0,
            transactions: [{
                source: "checkin",
                value: 150,
                date: "2018-07-02T13:49Z",
                data: {
                    shopID: '9'
                }
            },
            {
                source: "created",
                value: 50,
                date: "2018-07-02T13:49Z",
            },
            {
                source: 'bonus',
                date: '2018-08-06T11:18Z',
                value: -10,
                description: 'valid',
                bonus: true,
                data: {
                    bonusID: '1',
                    shopID: '9'
                }
            },

            {
                source: "checkin",
                value: -1,
                date: "2018-06-01T13:49Z",
                data: {
                    shopID: '9'
                }
            },

            {
                source: "checkin",
                value: 150,
                date: "2018-06-01T13:49Z",
                data: {
                    shopID: '9'
                }
            }],
            status: 'active',
            counters: {
                'user-activity': 0,
                elearning: 0,
                checkin: 0,
                'energy-saving': 0
            }
        },
        {
            address: 'school1-wallet',
            identity: {
                userProfile: {
                    guid: "user-guid://school-1"
                }
            },
            created: 1530527996328,
            balance: 100,
            transactions: [
                {
                    source: "electricity",
                    value: 45,
                    date: "2018-06-03T13:49Z"
                },
                {
                    source: "electricity",
                    value: 100,
                    date: "2018-07-03T13:49Z"
                },
                {
                    source: "checkin",
                    value: 150,
                    date: "2018-07-02T13:49Z",
                    data: {
                        shopID: '9'
                    }
                },
                {
                    source: "elearning",
                    value: 100,
                    date: "2018-07-02T13:49Z",
                    data: {
                        quiz: 'Aquecimento Global'
                    }
                },
                {
                    source: "user-activity",
                    value: 100,
                    date: "2018-07-04T13:49Z",
                    data: {
                        activity: 'walking',
                        distance: 2000
                    }
                },
                {
                    source: "user-activity",
                    value: 23,
                    date: today,
                    data: {
                        activity: 'walking',
                        distance: 2000
                    }
                }],
            status: 'active',
            counters: {
                'user-activity': 200,
                elearning: 100,
                checkin: 150,
                'energy-saving': 45
            }
        },
        {
            address: 'school2-wallet',
            identity: {
                userProfile: {
                    guid: "user-guid://school-2"
                }
            },
            created: 1530527996328,
            balance: 20,
            transactions: [
                {
                    source: "checkin",
                    value: 150,
                    date: "2018-07-01T13:49Z",
                    data: {
                        shopID: '9'
                    }

                },
                {
                    source: "checkin",
                    value: 150,
                    date: "2018-06-01T13:49Z",
                    data: {
                        shopID: '9'
                    }

                }],
            status: 'active',
            counters: {
                'user-activity': 0,
                elearning: 0,
                checkin: 0,
                'energy-saving': 0
            }
        },
    ],
    wallet: {
        balance: 100,
        ranking: 2,
        'bonus-credit': 40,
        transactions: [
            {
                recipient: '\ufffd\ufffdc\u0001\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdc\u0005j\ufffd\ufffd\ufffd\u0003iJ\'1¶\u0001\ufffd\u0019\ufffd\f<\ufffd',
                source: 'elearning',
                date: '2018-06-25T11:18Z',
                value: 20,
                description: 'valid',
                nonce: 1,
                data: {
                    quiz: 'Aquecimento Global'
                }
            },
            {
                source: "created",
                value: 50,
                date: "2018-06-01T12:49Z",
            },
            {
                source: "checkin",
                value: -1,
                date: "2018-06-01T13:49Z",
                data: {
                    shopID: '9'
                }
            },
            {

                recipient: '\ufffd\ufffdc\u0001\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdc\u0005j\ufffd\ufffd\ufffd\u0003iJ\'1¶\u0001\ufffd\u0019\ufffd\f<\ufffd',
                source: 'user-activity',
                date: yesterday,
                value: 20,
                description: 'valid',
                nonce: 1,
                data: {
                    activity: 'user_walking_context',
                    distance: 1500
                }
            },
            {
                recipient: '\ufffd\ufffdc\u0001\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdc\u0005j\ufffd\ufffd\ufffd\u0003iJ\'1¶\u0001\ufffd\u0019\ufffd\f<\ufffd',
                source: 'checkin',
                date: today,
                value: 10,
                description: 'valid',
                nonce: 1,
                bonus: false,
                data: {
                    shopID: '9'
                }
            },
            {
                recipient: '\ufffd\ufffdc\u0001\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdc\u0005j\ufffd\ufffd\ufffd\u0003iJ\'1¶\u0001\ufffd\u0019\ufffd\f<\ufffd',
                source: 'bonus',
                date: '2018-08-06T11:18Z',
                value: -10,
                description: 'valid',
                nonce: 1,
                bonus: true,
                data: {
                    bonusID: '1',
                    shopID: '9'
                }
            },
            {
                recipient: '\ufffd\ufffdc\u0001\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdc\u0005j\ufffd\ufffd\ufffd\u0003iJ\'1¶\u0001\ufffd\u0019\ufffd\f<\ufffd',
                source: 'bonus',
                date: '2018-08-06T11:18Z',
                value: -10,
                description: 'valid',
                nonce: 1,
                bonus: true,
                data: {
                    bonusID: '0',
                    shopID: '9'
                }
            }


        ]

    },
    shops: newShops
    /*[
        {
            _id: {
                $oid: '5afc4d2fe4f367ab797778bb'
            },
            id: '0',
            name: 'Loja do IT 0',
            description: 'A Loja IT',
            picture: 'https://pbs.twimg.com/profile_images/2150974577/top.ht6_400x400.png',
            'opening-hours': {
                monday: '[\'09:00-12:00\', \'13:00-18:00\']',
                sunday: '[]',
                exceptions: {
                    '2016-11-11': '[\'09:00-12:00\']',
                    '2016-12-25': '[]',
                    '01-01': '[]',
                    '12-25': '[\'09:00-12:00\']'
                }
            },
            location: {
                'degrees-latitude': 40.634173,
                'degrees-longitude': -8.660073
            }
        },
        {
            _id: {
                $oid: '5afc4d2fe4f367ab797778bb'
            },
            id: '1',
            name: 'Loja do IT 1',
            description: 'A Loja IT',
            picture: 'https://pbs.twimg.com/profile_images/2150974577/top.ht6_400x400.png',
            'opening-hours': {
                monday: '[\'09:00-12:00\', \'13:00-18:00\']',
                sunday: '[]',
                exceptions: {
                    '2016-11-11': '[\'09:00-12:00\']',
                    '2016-12-25': '[]',
                    '01-01': '[]',
                    '12-25': '[\'09:00-12:00\']'
                }
            },
            location: {
                'degrees-latitude': 40.634173,
                'degrees-longitude': -8.660073
            }
        },
        {
            _id: {
                $oid: '5afc4d65e4f367ab797778bc'
            },
            id: '2',
            name: 'TECHTRIS HOUSE - ENTER',
            description: ' ENTERRRR',
            picture: 'https://scontent.flis7-1.fna.fbcdn.net/v/t31.0-8/18055640_648363808700641_4525749373298022291_o.png?_nc_cat=0&_nc_eui2=AeF-uTdkVvymXcdLcxY1tafaJ2lqnBSIYC7OLz46UB6YoUZqvXjV9XTd7yX8NU0PZgU1GYRgbAggqXUBKk2wauxhVtEU3z3PSuhxaHHxXhLMEg&oh=4e52789d7fcb2a571dd8716bc7d7454c&oe=5B7CFEC7',
            'opening-hours': {
                monday: '[\'09:00-12:00\', \'13:00-18:00\']',
                sunday: '[]',
                exceptions: {
                    '2016-11-11': '[\'09:00-12:00\']',
                    '2016-12-25': '[]',
                    '01-01': '[]',
                    '12-25': '[\'09:00-12:00\']'
                }
            },
            location: {
                'degrees-latitude': 38.708199,
                'degrees-longitude': -9.147116
            }
        },
        {
            _id: {
                $oid: '5afc4d7be4f367ab797778bd'
            },
            id: '3',
            name: 'Altice Labs',
            description: 'Alb  -  aveiro',
            picture: 'https://pbs.twimg.com/profile_images/887679766064750592/0IU4_WRR_400x400.jpg',
            'opening-hours': {
                monday: '[\'09:00-12:00\', \'13:00-18:00\']',
                sunday: '[]',
                exceptions: {
                    '2016-11-11': '[\'09:00-12:00\']',
                    '2016-12-25': '[]',
                    '01-01': '[]',
                    '12-25': '[\'09:00-12:00\']'
                }
            },
            location: {
                'degrees-latitude': 40.629571,
                'degrees-longitude': -8.646709
            }
        }
    ]*/,
    logged: false,
    cause: CauseAPI.fetchCauses()[0],
    position: {
        lat: 40.634173,
        lng: -8.660073
    },
    authorizations: ['gfit'],
    quizzes: quizzes,
    identity: {
        picture: "https://lh6.googleusercontent.com/-NBVQ-V1C6cE/AAAAAAAAAAI/AAAAAAAAEd0/lHrQwAVuVS8/photo.jpg",
        name: "Rafael Felgueiras",
        guid: "user-guid://4f0f9bed0485d0802cef7e5860c81afc6354ba099ad41ba87ecbde980a9afd10"
    },
    bonus: newBonus,
    notifications: {
        date: today,
        shown: false,
        shownBonus: false,
        shownQuiz: false,
        shownBonusAvailable: false
    },
    shownQuiz: false,
    shownBonus: false,
    shownBonusAvailable: false,
    newBonuses: 3,
    notificationDate: today,
    // notificationDate: "2018-09-11T23:00:00.000Z",
    clickedTable: {
        elearning: false,
        checkin: false,
        gfit: false,
        electricity: false,
    }
};