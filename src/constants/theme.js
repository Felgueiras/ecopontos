import { createMuiTheme } from '@material-ui/core/styles';

// cause colors
export const cause1Color = '#F9D585';
export const cause2Color = '#C39FE4';
export const cause3Color = '#6DBEDD';

export const mainColor = "#32b1a4";

const theme = createMuiTheme({
    palette: {
        primary: { main: mainColor }
    },
    overrides: {
        MuiExpansionPanelSummary: {
            expandIcon: {
                color: mainColor
            }
        },
        MuiButton: {
            raisedPrimary: {
                color: 'white',
                boxShadow: 'none'
            }
        }, 
        // disabled button (used in BottomBar Map icon)
        MuiButtonBase: {
            disabled: {
                // display: 'none !important'
            }
        },
        MuiSnackbarContent:{
            root: {
                boxShadow: 'unset !important'
            }
        },
        MuiIconButton:{
            root:{
                '&:hover':{
                    backgroundColor: 'unset !important'
                }
            }
        },
        MuiRadio: {
            colorSecondary: {
                '&$checked': {
                    color: 'black'
                },
            }
        },
        MuiCheckBox: {
            colorSecondary: {
                '&$checked': {
                    color: mainColor
                },
            }
        },
        MuiAppBar: {
            colorPrimary: {
                // text color
                color: 'black',
                backgroundColor: '#c1e7e4'
            },
            root: {
                elevation: '0'
            }
        },
        MuiBottomNavigationAction: {
            selected: {
                color: 'white !important',
                backgroundColor: mainColor
            },
            label: {
                color:'black',
                fontWeight: '500'
            },
            root: {
                minWidth: 'unset !important'
            }
        },
        MuiTypography: {
            title: {
                fontWeight: 'bold',
                textAlign: 'center',
                // width: '65%',
                // position: 'absolute',
                fontSize: '22px',
                left: '0',
                right: '0',
                margin: '0 auto'
            }
        },
        MuiListItemText: {
            primary: {
                fontSize: '0.875rem!important',
                fontWeight: '500',
                color: '#000000 !important'
            },
            root:{
                padding: '0! important'
            }
        },
        MuiStepper: {
            root: {
                padding: '32px 0'
            }
        },
        MuiStepLabel: {
            label: {
                fontSize: '14px',
                lineHeight: '1',
                marginTop: '8px!important',
               
            },
            alternativeLabel: {
                color: 'rgba(0, 0, 0, 0.5)'
            }
        },
        MuiStepIcon: {
            root: {
                width: '40px',
                height: '40px',
                fontSize: '20px',
                fontWeight: '700',
                color: '#dddddd'
            },
            text: {
               fill: 'rgba(255, 255, 255, 1)'   
            },
            active: {
                color: '#84d0c8!important'
            },
            completed: {
                color: '#84d0c8!important'
            },
            alternativeLabel: {
                fontSize: '20px'
            }
        },
        MuiStepConnector: {
            root: {
                top: '18px!important',
                left: 'calc(50% + 24px)!important',
                right: 'calc(-50% + 24px)!important'
            },
            line: {
                borderColor: '#dddddd'
            },
            lineHorizontal:{
                borderStyle: 'dotted',
                borderWidth: '4px',
                borderTopStyle: 'none'
            }
        }
        


    }
});


export default theme;
