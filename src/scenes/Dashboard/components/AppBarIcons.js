import React from 'react'
import { SvgIcon } from '../../../../node_modules/@material-ui/core';


const fillColor = "#32b1a4";

export const MenuIcon = () => {
    return (
        <React.Fragment>
            <SvgIcon>
                <path fill={fillColor} d="M24 3v2c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3H1c-.3 0-.5-.1-.7-.3C.1 5.5 0 5.3 0 5V3c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h22c.3 0 .5.1.7.3.2.2.3.4.3.7zm0 8v2c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3H1c-.3 0-.5-.1-.7-.3S0 13.3 0 13v-2c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h22c.3 0 .5.1.7.3.2.2.3.4.3.7zm0 8v2c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3H1c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7v-2c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h22c.3 0 .5.1.7.3.2.2.3.4.3.7z" />
            </SvgIcon>
        </React.Fragment>
    )
}

export const BackIcon = () => {
    return (
        <React.Fragment>
             <SvgIcon>
                <path fill={fillColor} d="M15.1 4.1L7.2 12l7.9 7.9c.2.2.3.4.3.7 0 .3-.1.5-.3.7l-2.5 2.5c-.1.1-.3.2-.6.2s-.5-.1-.7-.3l-11-11c-.2-.2-.3-.4-.3-.7 0-.3.1-.5.3-.7l11-11c.2-.2.4-.3.7-.3.3 0 .5.1.7.3l2.5 2.5c.2.2.3.4.3.7-.1.2-.2.4-.4.6z" />
            </SvgIcon>
        </React.Fragment>
    )
}

