import React from 'react';
import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';

const Header = ({ gastos, setGastos, presupuesto, setPresupuesto, esValidoPresupuesto, setEsvalidoPresupuesto }) => {
    return (
        <header>
            <h1>Control de Gastos</h1>
            {
                esValidoPresupuesto
                    ? <ControlPresupuesto
                        gastos={gastos}
                        setGastos={setGastos}
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        setEsvalidoPresupuesto={setEsvalidoPresupuesto}
                    />
                    : <NuevoPresupuesto
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        setEsvalidoPresupuesto={setEsvalidoPresupuesto}
                    />
            }
        </header>
    );
}

export default Header;