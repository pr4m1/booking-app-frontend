import unedIcon from '../assets/img-UNED.png';
import bookLabIcon from '../assets/img-BookLab.png';
import '../style-components/Footer.css';

function Footer(){
    return(
        <footer>
          <div className='datos-footer'>
            <p>Correo: pramiro7@alumno.uned.es</p>
            <p>Nombre: Pedro Ramiro</p>
            <p>Dirección: Av. del Jardín Botánico, 1345, 33203 Gijón, Asturias</p>
          </div>
          <div className='footer-images'>
            <img src={unedIcon} alt="UNED icon" />
            <img src={bookLabIcon} alt="BookLab icon" />
          </div>
      </footer>
    );
}

export default Footer;