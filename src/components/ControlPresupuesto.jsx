import React, { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useUtils } from '../hooks/useUtils';

const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setEsvalidoPresupuesto }) => {
    const { formatearCantidad } = useUtils();
    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(presupuesto);
    const [gastado, setGastado] = useState(0);

    const handleResetear = () => {
        const resultado = confirm('¿Desea reiniciar presupuesto y gastos?');
        if (resultado) {
            setGastos([]);
            setPresupuesto(0);
            setPorcentaje(0);
            setEsvalidoPresupuesto(false);
            return;
        }
    }

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        // * Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(0);
        setPorcentaje(nuevoPorcentaje);

        setGastado(totalGastado);
        setDisponible(totalDisponible);
    }, [gastos])

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        // pathColor: '#3B82F6',
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#f2f3f4',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetear}>
                    Resetear Gastos
                </button>
                <p><span>Presupuesto: </span>{formatearCantidad(presupuesto)}</p>
                <p className={disponible < 0 ? 'negativo' : ''}><span>Disponible: </span>{formatearCantidad(disponible)}</p>
                <p><span>Gastado: </span>{formatearCantidad(gastado)}</p>
            </div>
        </div>
    );
}

export default ControlPresupuesto;