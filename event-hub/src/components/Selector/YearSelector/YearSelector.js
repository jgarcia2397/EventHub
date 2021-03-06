import React from 'react';
import moment from 'moment';

const yearSelector = (props) => {
    let years = [];

    let nextTwelveYears = moment()
        .set("year", props.currentYear)
        .add(11, "year")
        .format("Y");

    let yearRange = props.yearRange(props.currentYear, nextTwelveYears);

    yearRange.map(data => {
        return years.push(
            <td
                key={data}
                onClick={() => {props.selectedYear(data)}}
            >
                <span>{data}</span>
            </td>
        );
    });
    let rows = [];
    let cells = [];
  
    years.forEach((row, i) => {
        if (i % 3 !== 0 || i === 0) {
            cells.push(row);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(row);
        }
    });
    rows.push(cells);

    let yearList = rows.map((d, i) => {
        return <tr key={i}>{d}</tr>;
    });
    return yearList;
}

export default yearSelector;