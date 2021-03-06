import React from 'react';
import numeral from "numeral";

import './styles/table.css';


function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(({ country, cases }) => (
                <tr>
                    <td>{country}</td>
                    <strong>{numeral(cases).format("0,0")}</strong>
                </tr>
            ))}
        </div>
    )
}

export default Table;
