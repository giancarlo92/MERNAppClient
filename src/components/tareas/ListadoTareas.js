import React, { Fragment, useContext } from 'react';  
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import {CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {
    const proyectosContext = useContext(proyectoContext)
    const tareasContext = useContext(tareaContext)

    const { proyecto, eliminarProyecto } = proyectosContext
    const { tareasProyectos } = tareasContext

    if(!proyecto) return <h2>Selecciona un proyecto</h2>
    
    return ( 
        <Fragment>
            <h2>Proyecto: {proyecto.nombre}</h2>
            <ul className="listado-tareas">
                {
                    tareasProyectos.length === 0
                    ? (
                        <li className="tarea">No hay tareas</li>
                    )
                    : <TransitionGroup>
                        {
                            tareasProyectos.map(tarea => (
                                <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                                >
                                    <Tarea
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                    
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyecto._id)}
            >
                Eliminar proyecto &times;
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;