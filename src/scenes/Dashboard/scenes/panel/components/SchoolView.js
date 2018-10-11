import React, { Component } from "react";
import CauseAPI from "../../../../../services/api/CauseAPI";

var causes = CauseAPI.fetchCauses();

import '../../../../../css/panel.css'

import { cause1Color, cause2Color, cause3Color } from '../../../../../constants/theme';
import tokensIcon from '../../../../../img/icones/24x24px/desafio/pontos_causa.svg';
import selectedIcon from '../../../../../img/icones/16x16px/desafio/selected.svg';
import { Badge, Avatar } from "@material-ui/core";


const iconStyle = {
    width: 20,
    height: 20,
    display: 'inline'
};

const w = '90%';
const pR = 0;
const bR = 25;

const cause0Style = {
    border: '2px solid ' + cause1Color,
    width: w,
    borderRadius: bR,
    paddingRight: pR
};

const cause1Style = {
    border: '2px solid ' + cause2Color,
    width: w,
    borderRadius: bR,
    paddingRight: pR
};

const cause2Style = {
    border: '2px solid ' + cause3Color,
    width: w,
    borderRadius: bR,
    paddingRight: pR
};

class SchoolView extends Component {

    render() {
        const classes = this.props.classes;
        const cause = this.props.cause;
        let indexAux = -1;
        for (let index = 0; index < causes.length; index++) {
            const selectedCause = causes[index];
            if (selectedCause.id === cause.id) {
                indexAux = index;
                break;
            }
        }

        let causeLogo, containerStyle, backgroundColor;
        causeLogo = cause.thumbnail;
        switch (indexAux) {
            case 0:
                containerStyle = cause0Style;
                backgroundColor = cause1Color;
                break;
            case 1:
                containerStyle = cause1Style;
                backgroundColor = cause2Color;
                break;
            case 2:
                containerStyle = cause2Style;
                backgroundColor = cause3Color;
                break;
            default:
                break;
        }

        let causeIcon;
        if (this.props.selectedCause) {
            causeIcon =
                <Badge badgeContent={
                    <Avatar src={selectedIcon} classes={{ root: classes.rootSelected }} />
                }
                    classes={{ colorPrimary: classes.colorPrimary }}
                    color="primary">
                    <Avatar src={causeLogo}
                        className="avatar-small avatar-selected-cause"
                    />
                </Badge>
        }
        else {
            causeIcon = <Avatar
                src={causeLogo}
                className="avatar-smaller" />
        }

        const backgroungWidth = this.props.wallet.balance / this.props.challengePoints * 100;

        const overlayStyle = {
            top: 0,
            left: 0,
            background: 'linear-gradient(90deg, ' + backgroundColor + ' ' + backgroungWidth + '%, #ffffff 0%)',
            marginLeft: 0,
            borderRadius: '25px'
        };


        return (
            <React.Fragment>
                <div id="container"
                    style={containerStyle}>
                    <div style={overlayStyle} className="row full-width full-height">
                        <div className="col-2 no-padding" >
                            {causeIcon}
                        </div>
                        <div
                            className="col-10 no-padding">
                            <p className="cause-name">{this.props.cause.name} / </p>
                            <img src={tokensIcon} alt='' style={iconStyle} />
                            <p className="cause-tokens">  {this.props.wallet.balance}  </p>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default SchoolView;