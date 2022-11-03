import React from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { useUtils } from '../hooks/useUtils';
import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSusscripciones from '../img/icono_suscripciones.svg';

const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    subscripciones: IconoSusscripciones
}

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
    const { id, nombre, categoria, cantidad, fecha } = gasto;
    const { formatearCantidad, formatearFecha } = useUtils();

    const handleEditar = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const handleEliminar = id => (
        <TrailingActions>
            <SwipeAction  onClick={() => eliminarGasto(id)} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={handleEditar()}
                trailingActions={handleEliminar(id)}
            >
                <article className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={diccionarioIconos[categoria]} alt={categoria} />

                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className='fecha-gasto'><span>{formatearFecha(fecha)}</span></p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">{formatearCantidad(cantidad)}</p>
                </article>
            </SwipeableListItem>
        </SwipeableList>
    );
}

export default Gasto;