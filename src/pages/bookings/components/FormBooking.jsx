import React from "react";
import Form from "../../../components/Form";
import LabSelect from "./LabSelect";
import DateSelect from "./DateSelect";
import AddNewBooking from "./AddNewBooking";

function FormBooking(){
    return(
        <Form>
            <LabSelect />
            <DateSelect />
            <AddNewBooking />
        </Form>
    );
}

export default FormBooking;