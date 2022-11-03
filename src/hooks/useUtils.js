import React from "react";

export const useUtils = () => {

    const formatearCantidad = cantidad => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    }

    const formatearFecha = fecha => {
        const fechaNueva = new Date(fecha);
        const opciones = {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        };
        return fechaNueva.toLocaleString('es-ES', opciones);
    }

    return {
        formatearCantidad, generarId, formatearFecha
    }
}