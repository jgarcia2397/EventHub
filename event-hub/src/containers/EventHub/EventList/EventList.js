import React, { Component } from 'react';

import axios from '../../../axios-events';
import Event from '../../../components/Event/Event';

class EventList extends Component {
    state = {
        eventList: []
    }

    componentDidMount() {
        axios.get('./events.json')
            .then(res => {
                const fetchedEventList = [];
                for (let key in res.data) {
                    fetchedEventList.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({eventList: fetchedEventList});
            })
            .catch(err => {
                console.log(err);
            });
    }

    render () {
        return (
            <div>
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