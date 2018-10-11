import React from 'react'
import { withStyles, Badge, Avatar, Divider } from '@material-ui/core';

import selectedIcon from '../../../../../img/icones/16x16px/desafio/selected.svg';
import FeedElementInfo from './FeedElementInfo';

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


export const CauseFeedElement = withStyles(styles)((props) => {
    const { transaction, cause, selectedCause, classes } = props;

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
            {/* <p>{props.transaction.value}</p> */}
            <div className="margin-top-normal"
            // onClick={this.selectShop(shop)    }
            >
                <div className="row">
                    {/* image */}
                    <div className="col-2 col-full-width text-center">
                        {causeIcon}
                    </div>
                    {/* info */}
                    <div className="col-10  col-full-width"  >
                        <FeedElementInfo
                            cause={cause}
                            transaction={transaction} />
                    </div>
                </div>
                <Divider />
            </div>

        </React.Fragment>
    )
})

