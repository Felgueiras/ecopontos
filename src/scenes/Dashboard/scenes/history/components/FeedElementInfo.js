import React from 'react'
import { connect } from "react-redux";

import ActivityUtils from '../../../../../utils/ActivityUtils';
import ShopUtils from '../../../../../utils/ShopUtils';
import DateUtils from '../../../../../utils/DateUtils';
import { Badge, Avatar, withStyles } from '@material-ui/core';

// icons
import pointsIcon from '../../../../../img/icones/24x24px/bonus/creditos_suficientes.svg';
import selectedIcon from '../../../../../img/icones/16x16px/desafio/selected.svg';
import distanceIcon from '../../../../../img/icones/24x24px/forum/distancia.svg';
import checkinIcon from '../../../../../img/icones/24x24px/lojas/ver_localizacao.svg'
import quizIcon from "../../../../../img/icones/24x24px/tabela_atividades/quiz.svg";
import energySavingIcon from "../../../../../img/icones/32x32px/perfil/poupanca.svg";


const styles = theme => ({
    rootSelected: {
        width: 20,
        height: 20
    },
    colorPrimary: {
        // backgroundColor: 'black',
        marginTop: 10,
        marginRight: 7,
        width: 20,
        height: 20,
        zIndex: 0
    },
    unselected: {
        backgroundColor: 'unset',
        marginTop: 10,
        marginRight: 7,
        width: 20,
        height: 20
    }
});


const CauseAvatar = withStyles(styles)((props) => {

    const { cause, classes, selectedCause } = props;
    const thumbnail = cause.thumbnail;

    let causeIcon;
    if (selectedCause) {
        causeIcon =
            <Badge badgeContent={
                <Avatar src={selectedIcon}
                    classes={{ root: classes.rootSelected }}
                />
            }
                classes={{ colorPrimary: classes.colorPrimary }}
                color="primary">
                <Avatar src={thumbnail + ''}
                    className="avatar-small avatar-selected-cause"
                />
            </Badge>;
    }
    else {
        causeIcon =
            <Badge badgeContent={<React.Fragment></React.Fragment>}
                classes={{ colorPrimary: classes.unselected }}
                color="primary">
                <Avatar src={thumbnail + ''}
                    className="avatar-small"
                />
            </Badge>;
    }

    return (
        <React.Fragment>
            {causeIcon}
        </React.Fragment>
    )
})


class FeedElementInfo extends React.Component {

    displayTransactionData(transaction) {
        let { source, data } = transaction;
        let info, icon = pointsIcon;

        switch (source) {
            case 'user-activity':
                if (data.distance <= 1000) {
                    info = data.distance + ' m';
                }
                else {
                    info = Math.floor(data.distance * 10 / 1000) / 10 + ' km';
                }
                icon = distanceIcon;
                break;
            case 'elearning':
                {
                    info = data.quiz;
                    icon = quizIcon;
                    break;
                }
            case 'checkin':
                {
                    let shopUtils = new ShopUtils(this.props.shops);
                    info = shopUtils.getShopByID(data.shopID).name;
                    icon = checkinIcon;
                    break;
                }
            case 'bonus':
                {
                    // let bonusUtils = new BonusUtils(this.props.bonus);
                    info = '123';
                    // info = bonusUtils.getBonusByID(data.shopID).name;
                    break;
                }
            case 'electricity':
                {
                    icon = energySavingIcon;
                    // let bonusUtils = new BonusUtils(this.props.bonus);
                    // info = '123';
                    // // info = bonusUtils.getBonusByID(data.shopID).name;
                    // break;
                    break;
                }

            default:
                break;
        }

        return <React.Fragment>
            <img src={icon} alt='' className="inline-block image-activity icon-24" />
            <p className="text-smaller inline-block align-super align-right">
                {info}
            </p>
        </React.Fragment>

    }

    render() {
        const { cause, transaction, personal, filtering, selectedCause } = this.props;
        let { source, data } = transaction;
        if (source === 'user-activity')
            source = data.activity;

        const { activityName, activityIcon } = ActivityUtils.getInfo(source);
        let activityNameSpaces = activityName.split('\n').map((item, i) => <p key={i}>{item}</p>);

        let numColumns = 4;
        if (personal) numColumns--;
        const columnWidth = 'col-' + numColumns;

        return (
            <React.Fragment>
                {/* cause info */}
                {cause && (
                    <div className="row">
                        <div className="col-2 col-full-width text-center no-margin">
                            <CauseAvatar
                                cause={cause}
                                selectedCause={cause.id === selectedCause.id}
                            />
                        </div>
                        {/* cause name */}
                        <div className="col-8">
                            <p className="text-highlighted">{cause.name}</p>
                        </div>
                        {/* transaction date */}
                        {/* <div className="col-2 text-smaller align-right"  >
                            <p>{DateUtils.getHoursMinutes(transaction.date)}</p>
                        </div> */}
                    </div>
                )}

                {/* transaction info */}
                <div className="row">
                    {personal && (
                        <React.Fragment>
                            <div className={columnWidth + " text-smaller align-left"}  >
                                <p>{DateUtils.formatDate(transaction.date)}</p>
                            </div>
                        </React.Fragment>
                    )}
                    {/* source */}
                    {filtering !== true && (
                        <div className={columnWidth}>
                            <div className="inline-block col-4 col-full-width align-right">
                                <img src={activityIcon} alt='' className="inline-block image-activity icon-24" />
                            </div>
                            <div className="text-smaller inline-block col-8 col-full-width">
                                {activityNameSpaces}
                            </div>
                        </div>
                    )}

                    {/* tokens */}
                    <div className={columnWidth}>
                        <img src={pointsIcon} alt='' className="inline-block image-activity icon-24" />
                        <p className="text-smaller inline-block align-super">
                            {transaction.value}
                        </p>
                    </div>
                    {/* info */}
                    {
                        transaction.source !== 'created' && (
                            <div className={columnWidth}>
                                {this.displayTransactionData(transaction)}
                            </div>
                        )
                    }
                </div>



            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        shops: state.shops,
        // bonus: state.bonus,
        selectedCause: state.cause,
    };
};

export default connect(mapStateToProps, null)(FeedElementInfo);