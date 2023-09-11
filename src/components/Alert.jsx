import React, { useState } from "react";
import '../style-components/Alert.css';
import { IconExclamationCircle } from '@tabler/icons-react';
import Loader from "./Loader";

export const Alert = ({ message,close }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="button-alert-close" onClick={close}></div>
        <p className="modal-close-cotent">{message}</p>
      </div>
    </div>
  );
};

export const AlertDelete = ({close,deleteElement }) => {
    const [alert,setAlert] = useState(0);
    const [content,setContent] = useState("");

    const  handleClick =  async () => {
      setAlert(1);
      await deleteElement()
            .then(close())
            .catch((error) => {
              if (error?.message) {
                setContent(error.message);
              }else{
                setContent("Problem deleting element!")
              }
              setAlert(2);
          });
  
    }


    return (
      <div className="modal">
        {alert===0 && <div className="modal-content-delete">
                          <h2>Are you sure you want to delete this item?</h2>
                          <div className="botones-alert">
                              <button id="button-delete" onClick={handleClick}>Delete</button>
                              <button id="button-cancel" onClick={close}>Cancel</button>
                          </div>
                        </div>}
        {alert===1 && <div className="modal-content">
                          <div className="content-alert-success-error">
                            <Loader/>
                          </div>
                        </div>}
        {alert===2 && <div className="modal-content">
                          <div className="button-alert-close" onClick={close}></div>
                          <div className="content-alert-success-error">
                            <IconExclamationCircle id="icon-error"/>
                            <p className="modal-close-cotent">{content}</p>
                          </div>                        
                        </div>}
      </div>
    );
  };