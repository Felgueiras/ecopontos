import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import dates from './utils/dates'
import '../css/react-big-calendar.css'


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const events = [
    {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
    }
]

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let CalendarExample = ({ localizer }) => (
    <BigCalendar
        events={events}
        views={allViews}
        step={60}
        showMultiDayTimes
        max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
        defaultDate={new Date(2015, 3, 1)}
        localizer={localizer}
        onSelectEvent={event => alert(event.title)}
        // onSelectSlot={this.handleSelect}
    />
)

export default CalendarExample