import { 
    AGREGAR_TAREA,
    EDITAR_TAREA,
    ELIMINAR_TAREA,
    TAREAS_PROYECTO, 
    TAREA_ACTUAL, 
    VALIDAR_TAREA
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasProyectos: action.payload,
                tareaSeleccionada: null
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasProyectos: [action.payload, ...state.tareasProyectos],
                errorTarea: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyectos: state.tareasProyectos.filter(x => x._id !== action.payload)
            }
        case EDITAR_TAREA:
            return {
                ...state,
                tareasProyectos: state.tareasProyectos.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        default:
            return state
    }
}