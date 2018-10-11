import React from 'react';
import { withRouter } from 'react-router-dom'
import Divider from '@material-ui/core/Divider';
import ChevronRight from '@material-ui/icons/ChevronRight'
import DateUtils from '../../../../../utils/DateUtils';
import TicketsAPI from '../TicketsAPI';



const TicketResume = (props) => {
    
    const { ticket } = props;
    const { messages, dataObject } = ticket;
    const title = dataObject['_name'];
    const creationDate = DateUtils.formatDate(dataObject._created);
    const messagesArray = TicketsAPI.getMessages(messages);
    const firstMessage = messagesArray.length> 0 ? messagesArray[0].text : '';

    return (
        <div onClick={props.viewTicket}>
            <div className="row margin-top-normal">
                <div className="col-10">
                    <p className="text-highlighted">{title}</p>
                    <p>{firstMessage}</p>
                    <p>criado a {creationDate}</p>
                    {/* {!message.answered && (
                        <p className="text-bold">POR RESPONDER</p>
                    )} */}
                </div>
                <div className="col-2" style={{ textAlign: 'right', paddingTop: '10px' }}>
                    <ChevronRight color="primary" className="text-center" />
                </div>
            </div>
            <Divider />
        </div>
    )
}

export default withRouter(TicketResume);
