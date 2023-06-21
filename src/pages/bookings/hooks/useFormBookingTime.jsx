import { useState } from "react";
import { fetchTimeNotAvailable } from "../../../services/api";
import moment from "moment";

function useFormBookingTime(){
    const [valueDateTime,setValueDateTime] = useState(moment().tz(moment.tz.guess()));
    const [timeZone,setTimeZone] = useState(moment.tz.guess());
    const [timeDisabled,setTimeDisabled] = useState([]);
    const [timeOptionToShow,setTimeOptionToShow] = useState([]);
    const [timeAvailable,setTimeAvailable] = useState([]);
    const [durationSlot,setDurationSlot] = useState(0);

    function notTimeOptionsAvailableToSelect(){
        const now = moment().tz(timeZone);
        return timeOptionToShow.length<= timeDisabled.filter((date)=>{
            const dateDisabledTimeZone=moment.utc(date).tz(timeZone);
            return now.isBefore(dateDisabledTimeZone) && dateDisabledTimeZone.format("yyyy-MM-DD")===valueDateTime.format("yyyy-MM-DD");
            }).length;
    };

    const checkDisabledSlotsTime = ({availables,disables=timeDisabled}) => {
        const available = availables.find(available => !disables.includes(available.clone().tz('Etc/UTC').format("yyyy-MM-DDTHH:mm")));
        if(available !== undefined){
            setValueDateTime(available);
        }
    }

    const updateTimeZone = (newTimeZone) => {
        setTimeZone(newTimeZone);
        const newDate = valueDateTime.clone().tz(newTimeZone);
        setValueDateTime(newDate);
        const slotsTime = updateTimeOptionToShow({date:newDate,timeZ:newTimeZone});
        setTimeOptionToShow(slotsTime);
        checkDisabledSlotsTime({availables:slotsTime});
    }

    const updateTimeOptionToShow = ({date,timeZ=timeZone,slotsTimeAvailables=timeAvailable}) => {
        const slotsTime = [];
        const now = moment().tz(timeZ);
        for(const slot of slotsTimeAvailables){
            let slotTime = slot.clone().tz(timeZ);
            if (now.isBefore(slotTime) && slotTime.format("yyyy-MM-DD")===date.format("yyyy-MM-DD")) {
                slotsTime.push(slotTime);
            }       
        }
        return slotsTime;
      };

    const getSlotsAvailables = (date,duration) =>{
        let dateOptionUTC =  date.clone().tz('Etc/UTC').subtract(1, 'day').startOf('day');
        const slotsTime = [];
        let minutesT = 0;
        for (let i = 0; i < (24 * 3 * (60 / duration)); i++) {
            let slotTime = dateOptionUTC.clone().minutes(minutesT);
            slotsTime.push(slotTime);
            minutesT += duration;
        }
        return slotsTime;
    };

    const updateSlotsTime = async ({labSelected,date=valueDateTime,duration=durationSlot}) => {
        if(date!==valueDateTime){
            setValueDateTime(date);
        }
        if(labSelected===null){
            setTimeOptionToShow([]);
            return;
        }
        let slotsTimeAvailables=getSlotsAvailables(date,duration);
        setTimeAvailable(slotsTimeAvailables);
        let slotsTimeToShow=updateTimeOptionToShow({date:date,duration:duration,slotsTimeAvailables:slotsTimeAvailables});
        setTimeOptionToShow(slotsTimeToShow);
        let requestDisabledSlots ={
            date:date.clone().tz('Etc/UTC').format('YYYY-MM-DD'),
            id_lab: labSelected.id
        }
        let disables = await fetchTimeNotAvailable(requestDisabledSlots)
            .then(data=>{
                setTimeDisabled(data);
                return data;
            })
            .catch(() =>{ return []});
        checkDisabledSlotsTime({availables:slotsTimeToShow,disables:disables});
    }

    return { valueDateTime,setValueDateTime,updateSlotsTime,timeZone,updateTimeZone,timeOptionToShow,timeDisabled, setDurationSlot,notTimeOptionsAvailableToSelect};

};

export default useFormBookingTime;