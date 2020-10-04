import React, { useReducer } from 'react';
import tareaContext from './tareaContext'
import tareaReducer from './tareaReducer'
import { 
    AGREGAR_TAREA,
    EDITAR_TAREA,
    ELIMINAR_TAREA,
    TAREAS_PROYECTO, 
    TAREA_ACTUAL, 
    VALIDAR_TAREA
} from '../../types'
import clienteAxios from '../../config/axios'

const TareaState = props => {
    const initialState = {
        tareasProyectos: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    const [state, dispatch] = useReducer(
        tareaReducer,
        initialState
    )

    const obtenerTareas = async (proyecto) => {
        try {
            const respuesta = await clienteAxios.get(`/api/tareas`, {params: {proyecto}})
            dispatch({
                type: TAREAS_PROYECTO,
                payload: respuesta.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
        
    }
    
    const agregarTarea = async (tarea) => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }
    
    const eliminarTarea = async (idTarea, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${idTarea}`, {params: {proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: idTarea
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    
    const editarTarea = async (tarea) => {
        try {
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            dispatch({
                type: EDITAR_TAREA,
                payload: respuesta.data.tarea
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    return ( 
        <tareaContext.Provider
            value={{
                tareasProyectos: state.tareasProyectos,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                mostrarError,
                eliminarTarea,
                guardarTareaActual,
                editarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
     );
}
 
export default TareaState;