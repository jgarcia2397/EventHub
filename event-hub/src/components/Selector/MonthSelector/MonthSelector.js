import React from 'react';

const monthList = (props) => {
    let months = [];
    let rows = [];
    let cells = [];

    props.listOfMonths.map(
        data => {
            return months.push(
                <td 
                    key={data}
                    onClick={() => props.selectedMonth(data)}>
                    <span>{data}</span>
                </td>
            );
        }
    );

    months.forEach((monValue, i) => {
        if (i % 3 !== 0 || i === 0) {
            cells.push(monValue);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(monValue);
        }
    });
    rows.push(cells);

    let monthList = rows.map((m, i) => {
        return <tr key={i}>{m}</tr>
    });
    return monthList;
}

export default monthList;