import React, { useState } from 'react';

const Filtros = ({filtro, setFiltro}) => {
    return (
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label htmlFor="">Filtrar Gastos</label>
                    <select
                        value={filtro}
                        onChange={e => setFiltro(e.target.value)}
                    >
                        <option value="">Seleccione Filtro</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Camida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="subscripciones">Subscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

export default Filtros;