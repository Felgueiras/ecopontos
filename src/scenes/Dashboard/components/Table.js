import React from "react";
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { withRouter } from 'react-router-dom'
import '../../../css/react-table.css';


import ActivityUtils from "../../../utils/ActivityUtils";
import ConfirmationDialog from "./ConfirmationDialog";
import { setStateKey } from "../../../redux/actions";


class Table extends React.Component {

    state = {
        dialog: false
    }




    render() {
        const { data, columns } = this.props;
        const { image, main, message, dialog, close } = this.state;
        const otherColumns = [];
        columns.forEach(function (column, index) {

            const textAlignment = (index === columns.length - 1) ? 'right' : 'center';
            let newText = column.name.split('\n').map((item, i) => <p key={i}>{item}</p>);
            otherColumns.push({
                minWidth: 50,
                Header: <div style={{ textAlign: textAlignment, lineHeight: '1.2' }}
                    className={'text-smaller-bold ' + column.key} >{newText}</div>,
                Cell: (row) => {
                    return (
                        <div className="text-smaller">
                            <p style={{ textAlign: textAlignment }} className="text-smaller">
                                {row.original[column.key]}
                            </p>
                        </div>
                    );
                },
            })
        });


        let activities = 'Atividades\npraticadas'.split('\n').map((item, i) => <p key={i}>{item}</p>);
        return (
            <React.Fragment>
                <ReactTable
                    sortable={false}
                    className="full-width"
                    showPagination={false}
                    defaultPageSize={data.length}
                    data={data}
                    columns={[
                        {
                            minWidth: 50,
                            Header: <p className="text-smaller-bold text-left">{activities}</p>,
                            Cell: (row) => {
                                let { activityName, activityIcon } = ActivityUtils.getInfo(row.original.activityName);
                                let activityNameSpaces = activityName.split('\n').map((item, i) => <p key={i}>{item}</p>);
                                return (
                                    <div className="text-smaller row" >
                                        <div className="inline-block col-4 col-full-width align-right">
                                            <img src={activityIcon} alt='' className="inline-block image-activity icon-24" />
                                        </div>
                                        <div className="text-smaller inline-block col-8 col-full-width">
                                            {activityNameSpaces}
                                        </div>
                                    </div>
                                );
                            },
                            id: "status"
                        },
                        ...otherColumns
                    ]}
                    getTdProps={(state, rowInfo, column, instance) => {
                        let _this = this;
                        return {
                            onClick: (e, handleOriginal) => {
                                const { clickedTable } = _this.props;

                                const { activityName: name } = rowInfo.original;
                                const { activityName, activityIcon, activityInfo } = ActivityUtils.getInfo(name);

                                function handleVisited(key, routerPath) {

                                    const jumpToPage = () => _this.props.history.push('/dashboard/' + routerPath);

                                    const closeHandler = (action = false) => {
                                        _this.setState({ dialog: false });
                                        if (action)
                                            jumpToPage();
                                    }
                                    if (!clickedTable[key]) {
                                        _this.props.setStateKey({
                                            key: `clickedTable.${key}`,
                                            payload: true
                                        });
                                    }
                                    else
                                        jumpToPage();

                                    _this.setState(
                                        {
                                            dialog: true,
                                            main: activityName,
                                            message: activityInfo,
                                            image: activityIcon,
                                            close: closeHandler
                                        })
                                }
                                switch (name) {
                                    case 'electricity':
                                        handleVisited('electricity', 'accounts');
                                        break;
                                    case 'walking': case 'biking':
                                        handleVisited('gfit', 'accounts');
                                        break;
                                    case 'elearning':
                                        handleVisited('elearning', 'learning');
                                        break;
                                    case 'checkin':
                                        handleVisited('checkin', 'shops');
                                        break;
                                    default:
                                        break;
                                }
                            }
                        };
                    }}
                />
                <ConfirmationDialog
                    image={image}
                    close={close}
                    open={dialog}
                    main={main}
                    message={message}
                    positiveAction={"Visitar"}
                    negativeAction={'Cancelar'}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        cause: state.cause,
        clickedTable: state.clickedTable,
    };
};



const mapDispatchToProps = dispatch => {
    return {
        setStateKey: key => dispatch(setStateKey(key))
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Table));