import moment from 'moment';
import Calendar from 'react-calendar';
import '../style-components/Calendar.css';
import { useBookingContext } from "../contexts/useBookingContext";
import TimeSelect from './TimeSelect';
import TimeZoneSelect from './TimeZoneSelect';

function DateSelect(){
    const { valueDateTime,updateSlots}=useBookingContext();
    const updateDate = (newDate) => {
        updateSlots(moment(newDate).format("yyyy-MM-DD"));
    }
    return (
        <div className="form-block-horizontal">
            <div className="form-container">
                <label>Select the date:</label>
                <Calendar onChange={updateDate} value={valueDateTime.format("yyyy-MM-DD")} />
                <label>Select the time zone:</label>
                <TimeZoneSelect />
            </div>
            <div className="form-container">
                <label>Select the time:</label>
                <TimeSelect />
            </div>
        </div>

    );
}

export default DateSelect;