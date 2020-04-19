import React, { Component } from 'react';
import moment from 'moment';

import classes from './EventList.module.css';
import axios from '../../../axios-events';
import Event from '../../../components/Event/Event';

class EventList extends Component {
    state = {
        eventList: []
    }

    componentDidMount() {
        axios.get('./events.json?orderBy="eventTimestamp"')
            .then(res => {
                const fetchedEventList = [];
                for (let key in res.data) {
                    fetchedEventList.push({
                        ...res.data[key],
                        id: key
                    });
                }
                fetchedEventList.sort((a, b) => {
                    if (moment(b.eventTimestamp).isBefore(a.eventTimestamp)){
                        return 1;
                    } else if (moment(a.eventTimestamp).isBefore(b.eventTimestamp)){
                        return -1;
                    } else {
                        return 0;
                    }
                });
                this.setState({eventList: fetchedEventList});
            })
            .catch(err => {
                console.log(err);
            });
    }

    render () {
        return (
            <div className={classes.List}>
                {this.state.eventList.map(event => (
                    <Event 
                        key={event.id}
                        details={event.eventDetails}
                        numGuests={event.numberOfGuests} />
                ))}
            </div>
        );
    }
}

export default EventList;