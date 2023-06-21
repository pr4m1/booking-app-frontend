import React from 'react';
import './style-components/Labs.css';
import FormLab from './components/FormLab';
import { LAB_TYPE } from '../../Configuration';
import { DataContextProvider as LabContextProvider} from '../../contexts/useDataContext';
import TableLabs from './components/TableLabs';

function Labs(){
    return (
        <div className="container-principal-labs">
            <h1>ADD A NEW LAB</h1>
            <LabContextProvider type={LAB_TYPE}>
                <FormLab />
                <TableLabs />
            </LabContextProvider>
        </div>
    );
}

export default Labs;