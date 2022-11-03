import React from 'react';
import Gasto from './Gasto';

const ListaGastos = (props) => {
    const { gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados } = props;

    return (
        <section className="listado-gastos contenedor">
            {
                filtro ? (
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos filtrados' : 'Gastos hay gastos en esta categoría'}</h2>
                        {gastosFiltrados.map(gasto => 
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    )}
                    </>
                ) : (
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'Gastos No Registrados'}</h2>
                        {gastos.map(gasto =>
                            <Gasto
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        )}
                    </>
                )
            }
        </section>
    );
}

export default ListaGastos;