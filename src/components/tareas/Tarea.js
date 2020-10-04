import React, { useContext } from 'react';  
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Tarea = ({tarea}) => {
    const proyectosContext = useContext(proyectoContext)
    const tareasContext = useContext(tareaContext)

    const { proyecto } = proyectosContext
    const { eliminarTarea, obtenerTareas, editarTarea, guardarTareaActual } = tareasContext

    const onClickCambiarEstado = () => {
        tarea.estado = !tarea.estado
        editarTarea(tarea)
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {
                    tarea.estado
                    ? (
                        <button
                            type="button"
                            className="completo"
                            onClick={onClickCambiarEstado}
                        >
                            Completo
                        </button>
                    )
                    : (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={onClickCambiarEstado}
                        >
                            Incompleto
                        </button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => guardarTareaActual(tarea)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => {
                        eliminarTarea(tarea._id, proyecto._id);
                        obtenerTareas(proyecto._id);
                    }}
                >
                    Eliminar
                </button>
            </div>
        </li>
     );
}
 
export default Tarea;