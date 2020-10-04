import React, { useContext, useEffect, useState } from 'react';  
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
    
    const proyectosContext = useContext(proyectoContext)
    const tareasContext = useContext(tareaContext)

    const { proyecto } = proyectosContext
    const { tareaSeleccionada, agregarTarea, editarTarea, errorTarea, mostrarError, obtenerTareas } = tareasContext

    const [tarea, guardarTarea] = useState({
        nombre: '',
        estado: false,
        proyecto: 0
    })
    
    useEffect(() => {
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])

    const {nombre} = tarea

    if(!proyecto) return null

    const onChangeTarea = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitTarea = e => {
        e.preventDefault()

        if(nombre.trim() === ''){
            mostrarError()
            return
        }

        if(tareaSeleccionada === null){
            tarea.proyecto = proyecto._id
            agregarTarea(tarea)
        } else {
            editarTarea(tarea)
        }

        guardarTarea({
            nombre: '',
            proyecto: 0
        })
        
        obtenerTareas(proyecto._id)
    }
    
    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmitTarea}
            >
                <div className="contenedor-input">
                    <input 
                        type="text" 
                        name="nombre"
                        className="input-text"
                        placeholder="Nombre tarea..."
                        onChange={onChangeTarea}
                        value={nombre}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        className="btn btn-block btn-primario btn-submit"
                        value={tareaSeleccionada ? "Editar tarea" : "Agregar tarea"}
                    />
                </div>
            </form>
            {
                errorTarea
                ? <p className="mensaje error">
                    El nombre de la tarea es obligatorio
                </p>
                : null
            }
        </div>
     );
}
 
export default FormTarea;