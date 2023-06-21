import React from "react";
import moment from "moment";
import { useBookingContext } from "../contexts/useBookingContext";

function TimeZoneSelect(){
    const { timeZone:selectedTimezone,updateTimeZone } = useBookingContext();
    const handleTimezoneChange = (event) => {
        updateTimeZone(event.target.value);
    }
    return (
        <select
            className="form-fit-content"
            value={selectedTimezone}
            onChange={handleTimezoneChange}
            >
            {moment.tz.names().map((timezone) => {
                const offset = moment.tz(timezone).format('Z');
                const label = `${timezone} (${offset})`;
                return (
                  <option key={timezone} value={timezone}>
                    {label}
                  </option>
                );
            })}
        </select>

    );
}

export default TimeZoneSelect;