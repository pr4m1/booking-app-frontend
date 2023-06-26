import '../style-components/Form.css';

function Form({children,justifyLeft=""}){
    return(
        <div className={"container-form "+justifyLeft}>
            {children}
        </div>
    );
}
export default Form;