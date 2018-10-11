import { mainColor } from '../constants/theme'

export const stepsTopBar = [
    {
        content: "Esta é a totalidade dos pontos acumulados por si",
        placement: "bottom-end",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".walk_points",
    }, {
        content: "Aqui aparece o seu rating atual",
        placement: "bottom-end",
        disableBeacon: false,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".walk_ranking",
    },
    /*
    {
        content: "Promoção atual",
        placement: "bottom-end",
        disableBeacon: false,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".walk_promotion",
    }
    */
];

export const stepsBottomNavigation = [
    {
        content: "Para ganhar pontos com visitas às lojas do bairro, carregue aqui",
        placement: "top",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".bottom_shops",
    },
    {
        content: "Clique aqui para ver os Bónus disponíveis",
        placement: "top",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".bottom_bonus",
    },
    {
        content: "Ganhe pontos respondendo a quizzes",
        placement: "top",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".bottom_learning",
    },
    {
        content: "Veja aqui o progresso  das escolas que participam no desafio",
        placement: "top",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".bottom_challenge",
    }
];

export const stepsPanel = [
    {
        content: "Os pontos que eu ganho com o meu comportamento eco-sustentável são apresentados nesta tabela por cada uma das minhas atividades",
        placement: "top-start",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".panel_table",
    },
    {
        content: "Os pontos totais são apresentados nesta coluna",
        placement: "top",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".tokensTotal",
    },
    {
        content: "Os últimos pontos ganhos são apresentados nestas duas colunas",
        placement: "top",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".tokensRecent",
    },
    {
        content: "O impacto do seu comportamento no meio ambiente é ilustrado nesta figura",
        placement: "bottom",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".impact_image",
    },
    {
        content: "Começa com uma paisagem duma cidade muito poluida, e conforme o meu comportamento melhora...",
        placement: "bottom",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".impact_image",
    },
    {
        content: "... e se torna mais eco-sustentável a paisagem tb evolui para uma cidade inteligente eco-sustentável",
        placement: "bottom",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".impact_image",
    }
];

export const stepsDrawer = [
    /*
    {
        content: "Clicando neste menu...",
        placement: "bottom-end",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".hamburguer_icon",
    },
    */
    {
        content: "Clique aqui para ver o seu perfil e apagar a sua conta",
        placement: "bottom-end",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".profile_avatar",
    },
    {
        content: "Veja aqui quais as lojas de bairro aderentes mais perto de si",
        placement: "bottom-end",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".walkthrough_bonus",
    },
    {
        content: "Clique aqui para autorizar ou cancelar o acesso a mais dados que podem ajudar a ganhar mais pontos",
        placement: "bottom-end",
        disableBeacon: true,
        styles: {
            options: {
                zIndex: 10000
            }
        },
        target: ".walkthrough_accounts",
    }
];

export const stepsDashboard = stepsTopBar.concat(stepsBottomNavigation).concat(stepsPanel);

export const walkthroughStyle = {
    options: {
        arrowColor: '#fff',
        backgroundColor: '#fff',
        primaryColor: mainColor,
        textColor: '#333',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
        beaconSize: 36,
        zIndex: 100,
    }
};
