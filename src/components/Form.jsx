import '../style-components/Form.css';

function Form({children}){
    return(
        <div className="container-form">
            {children}
        </div>
    );
}
export default Form;