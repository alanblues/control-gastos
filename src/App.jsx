import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filtros from './components/Filtros';
import ListaGastos from './components/ListaGastos';
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import { useUtils } from './hooks/useUtils';

function App() {
  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? []);
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [esValidoPresupuesto, setEsvalidoPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const { generarId } = useUtils();

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      const nuevos = gastos.map(el => el.id === gasto.id ? gasto : el);
      setGastos(nuevos);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([gasto, ...gastos]);
    }

    setAnimarModal(false);
    setGastoEditar({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const eliminarGasto = id => {
    const nuevosGastos = gastos.filter(gasto => gasto.id !== id);
    setGastos(nuevosGastos);
  }

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto);
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])

  useEffect(() => {
    if (filtro) {
      const filtrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(filtrados)
    }
  }, [filtro])

  // * Si hay presupuesto en localStorage mostramo el panel
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setEsvalidoPresupuesto(true);
    }
  }, [])

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        esValidoPresupuesto={esValidoPresupuesto}
        setEsvalidoPresupuesto={setEsvalidoPresupuesto}
      />

      {esValidoPresupuesto &&
        <main>
          <Filtros filtro={filtro} setFiltro={setFiltro} />
          <ListaGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />

          <article className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="nuevo gasto" onClick={handleNuevoGasto} />
          </article>
        </main>
      }

      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }
    </div>
  )
}

export default App;
