import {useState} from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setEsvalidoPresupuesto}) => {
    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = e => {
        e.preventDefault();
        
        if (!presupuesto) {
            setMensaje('no es un presupuesto valido');
            return;
        } 
        if (presupuesto < 0) {
            setMensaje('no se permiten numeros negativos');
            return;
        }

        setMensaje('');
        setEsvalidoPresupuesto(true);
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form className='formulario' onSubmit={handlePresupuesto}>
                <div className="campo">
                    <label htmlFor="">Definir presupuesto</label>
                    <input type="number"
                        defaultValue={presupuesto}
                        className='nuevo-presupuesto'
                        placeholder='Añade tu presupuesto'
                        onChange={e => setPresupuesto(Number(e.target.value))}
                    />
                </div>
                <input type="submit" value='Añadir' />
                {mensaje && <Mensaje texto={mensaje} tipo="error" />}
            </form>
        </div>
    );
}
 
export default NuevoPresupuesto;