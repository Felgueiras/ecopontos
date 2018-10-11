import React from 'react'
import FeedElementInfo from './FeedElementInfo';
import DateUtils from '../../../../../utils/DateUtils';

const EventsForDate = (props) => {

    const { transactions, filtering, date } = props;
    const listItems = transactions.map((transaction, index) =>
        <li key={"history_transaction_" + index}>
            <div className="margin-top-normal">
                <FeedElementInfo
                    filtering={filtering}
                    cause={transaction.cause}
                    transaction={transaction} />
            </div>
        </li>);

    return (
        <div>
            <p className="text-center">{DateUtils.formatDate(date, false, true)}</p>
            <ul className="margin-bottom">{listItems}</ul>
        </div>
    )
}

export default EventsForDate;