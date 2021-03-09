import { useState } from 'react';

export function Challenge(props) {

    const [date, showDate] = useState(false);

    return (
        <form className="Add-challenge">
            <h2 className="Challenge-title">Challenge</h2>
            <div className="Setdate-container">
                <label htmlFor="check">Set start date: </label>
                <input onClick={() => showDate(!date)} type="checkbox" id="check" />
            </div>
            {date === true ? <div className="Startdate-container">
                <label className="Date-label" htmlFor="startDate">Start date</label>
                <input
                    id="startDate"
                    className="Challenge-input"
                    type="date"
                    onChange={(e) => props.setStartDate(e.target.value)}
                    required
                />
            </div> : null}
            <input
                className="Challenge-input"
                type="text"
                placeholder="Title"
                onChange={(e) => props.setTitle(e.target.value)}
                required
            />
            <button onClick={() => props.saveChallenge()} type="button" className="Save-button" value="Save">Save</button>
        </form>
    );
}