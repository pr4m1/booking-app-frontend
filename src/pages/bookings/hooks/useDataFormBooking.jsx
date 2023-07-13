import {  useState,useEffect } from 'react';
import useFormBookingLab from './useFormBookingLab';
import { fetchLoadData,getUser } from '../../../services/api';
import { MANAGER_TYPE,BOOKING_TYPE } from '../../../Configuration';
import useFormBookingTime from './useFormBookingTime';
import useData from '../../../hooks/useData';
import moment from 'moment';

function useDataFormBooking () {
    const user = getUser(); 
    const urlBookings = user.role==="ADMIN" ? BOOKING_TYPE+"/all" : BOOKING_TYPE+"/my";
    const [managers,setManagers] = useState([]);
    const { labs,updateLabs,labSelected,setLabSelected,setNullLabs } = useFormBookingLab();
    const { valueDateTime,setValueDateTime,updateSlotsTime,timeZone,updateTimeZone,timeOptionToShow,timeDisabled, setDurationSlot,notTimeOptionsAvailableToSelect } = useFormBookingTime();
    const { data: bookings, stateData, update } = useData(urlBookings);
    const updateSlots = async (date) => {
      updateSlotsTime({
              labSelected: labSelected,
              date: moment.tz(date,"yyyy-MM-DD",timeZone)});
    }

    const updateManagerAndLabs = async (manager) => {
        if(manager!==null){
            let lab = await updateLabs(manager.id);
            setDurationSlot(manager.duration);
            await updateSlotsTime({ labSelected: lab,duration:manager.duration });
        }else{
          setNullLabs();
          setDurationSlot(0);
          updateSlotsTime({ labSelected: null});
        }
    }

    const updateLabSelected = async (lab) => {
      setLabSelected(lab);
      await updateSlotsTime({labSelected: lab});
    }
    
    const updateTable = async () => {
      update();
      await updateSlotsTime({ labSelected: labSelected });
    }

    useEffect(() => {
      fetchLoadData(MANAGER_TYPE+"/all")
          .then(data => {
              setManagers(data);
              if(data.length>0){
                updateManagerAndLabs(data[0]);
              }else{
                updateManagerAndLabs(null);
              }
              })
          .catch(()=>{});
    // eslint-disable-next-line
    },[]);
    return { managers,labs,valueDateTime,setValueDateTime,timeZone,updateTimeZone,notTimeOptionsAvailableToSelect,bookings,stateData,updateTable,updateSlots,labSelected,updateLabSelected,updateManagerAndLabs,timeOptionToShow,timeDisabled };
};

export default useDataFormBooking; 