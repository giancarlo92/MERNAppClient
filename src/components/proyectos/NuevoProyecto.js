import React, { Fragment, useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext)
    const {formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    })

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }
    
    const {nombre} = proyecto

    const onSubmitProyecto = e => {
        e.preventDefault()

        // validar
        if(nombre.trim() === '') {
            mostrarError()
            return;
        }
        // agregar
        agregarProyecto(proyecto)

        // reiniciar
        guardarProyecto({
            nombre: ''
        })
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >
                Nuevo proyecto
            </button>
            {
                formulario
                ? (
                    <form 
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input
                            type="text" 
                            name="nombre" 
                            id="nombre"
                            className="input-text"
                            placeholder="nombre del proyecto"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                        <input
                            type="submit" 
                            className="btn btn-block btn-primario"
                            value="Agregar proyecto"
                        />
                    </form>
                )
                : null
            }

            {
                errorFormulario
                ? <p className="mensaje error">
                    El nombre del proyecto es obligatorio
                </p>
                : null
            }
        </Fragment>
     );
}
 
export default NuevoProyecto;