import React from 'react';
import '../style-components/TimeSelect.css';
import { useBookingContext } from '../contexts/useBookingContext';
import { hours } from '../../../Configuration';
import { IconSunset2,IconSun,IconMoon} from '@tabler/icons-react';

function TimeSelect(){
    const {valueDateTime,setValueDateTime,timeOptionToShow,timeDisabled,notTimeOptionsAvailableToSelect} = useBookingContext();
    
    
    const hourShow = hours.map(hour =>{
        const optionTime=timeOptionToShow.find((date) => hour===date.format("HH"));
        const selected=valueDateTime.format("HH")===hour;
        if(optionTime!==undefined){
            return(<button key={hour} id={selected? "selected":""} className="hour-button" onClick={() => {setValueDateTime(optionTime);}}>
            {hour}
            </button>);
        }else{
            return(<button key={hour} className="hour-button disabled">
            {hour}
            </button>);
        }
    });
    
    const slotsTime = timeOptionToShow.filter(hour => valueDateTime.format("HH")===hour.format("HH")).map((hora) => {
        const horaM=":"+hora.format('mm');
        const disabled = timeDisabled.includes(hora.clone().tz('Etc/UTC').format("yyyy-MM-DDTHH:mm"));
        const selected=hora.isSame(valueDateTime) && !notTimeOptionsAvailableToSelect() && !disabled;
        return (<button key={hora.format("yyyy-MM-DDTHH:mm")} id={selected? "selected":""} className={disabled? "hour-button disabled":"hour-button"} onClick={() => {if(!disabled) setValueDateTime(hora);}}>
        {horaM}
        </button>)});
    return (
        <div className='container-principal-hour-button'>
            <div id='hours-container'>
                <div id='icons-hours'>
                    <div className='icon-hour'>
                        <IconSunset2 size={25}/>
                    </div>
                    <div className='icon-hour'>
                        <IconSun size={25}/>
                    </div>
                    <div className='icon-hour'>
                        <IconMoon size={23}/>
                    </div>
                </div>
                <div id="hours">
                    {hourShow}
                </div>
            </div>
            <div id="minutes-container">
                {slotsTime.length>0 ?
                    slotsTime
                : <h4 id='default-not-available'>Not availables for this day!</h4>}
            </div>
        </div>

    );
}

export default TimeSelect;