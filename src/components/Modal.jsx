import React, { useEffect, useState, useRef } from 'react';
import Mensaje from './Mensaje';
import IconoCerrar from '../img/cerrar.svg';

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {
    const nombreRef = useRef();
    const [error, setError] = useState('');
    const [valores, setValores] = useState({
        id: '',
        nombre: '',
        cantidad: '',
        categoria: '',
        fecha: ''
    });

    const handleSetValores = (campo, valor) => {
        setValores({
            ...valores,
            [campo]: valor
        });
    }

    const handleOcultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { nombre, cantidad, categoria } = valores;

        if ([nombre, categoria].includes('') || cantidad <= 0) {
            setError('¡Todos los campos son obligatorios!');

            setTimeout(() => {
                setError('');
            }, 3000);
            return;
        }

        setError('');
        guardarGasto(valores);
    }

    useEffect(() => {
        nombreRef.current.focus();

        if (Object.keys(gastoEditar).length > 0) {
            setValores({
                ...valores,
                id: gastoEditar.id,
                nombre: gastoEditar.nombre,
                cantidad: gastoEditar.cantidad,
                categoria: gastoEditar.categoria,
                fecha: gastoEditar.fecha
            })
        }
    }, [])

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={IconoCerrar} alt="Cerrar" onClick={handleOcultarModal} />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            >
                <legend>
                    {gastoEditar.nombre ? 'Editar Gasto' : 'Gasto'}
                </legend>
                {error && <Mensaje texto={error} tipo="error" />}

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select
                        id="categoria"
                        value={valores.categoria}
                        onChange={e => handleSetValores('categoria', e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Camida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="subscripciones">Subscripciones</option>
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="nombre">Nombre gasto</label>
                    <input type="text" id="nombre"
                        ref={nombreRef}
                        placeholder="Añade el Nombre del Gasto"
                        value={valores.nombre}
                        onChange={e => handleSetValores('nombre', e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" id="cantidad"
                        placeholder="Añade el Cantidad del Gasto: ej. 3300"
                        value={valores.cantidad}
                        onChange={e => handleSetValores('cantidad', Number(e.target.value))}
                    />
                </div>

                <input type="submit" value="Añadir Gasto" />
            </form>
        </div>
    );
}

export default Modal;