import React from "react";

const Mensaje = ({texto, tipo}) => {
    return (
        <div className={`alerta ${tipo}`}>
            {texto}
        </div>
    );
}
 
export default Mensaje;