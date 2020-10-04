import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import alertaContext from '../../context/alertas/alertaContext'
import authContext from '../../context/auteticacion/authContext'

const NuevaCuenta = (props) => {
    const alertasContext = useContext(alertaContext)
    const {alerta, mostrarAlerta} = alertasContext

    const authoContext = useContext(authContext)
    const {mensaje, autenticado, registrarUsuario} = authoContext

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    const {nombre, email, password, confirmar} = usuario

    const onchange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onsubmit = e => {
        e.preventDefault()

        if(nombre.trim() === "" || 
            email.trim() === "" || 
            password === "" || 
            confirmar.trim() === ""
          ){
              mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
              return
        }

        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error')
            return
        }

        if(password !== confirmar){
            mostrarAlerta('Los passwords no son iguales', 'alerta-error')
            return
        }

        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return ( 
        <div className="form-usuario">
            {
                alerta
                ? (
                    <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
                )
                : null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Crear cuenta</h1>
                <form
                    onSubmit={onsubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            onChange={onchange}
                            value={nombre}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={onchange}
                            value={email}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={onchange}
                            value={password}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password" 
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu password"
                            onChange={onchange}
                            value={confirmar}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link 
                    to={'/'} 
                    className="enlace-cuenta"
                >
                    Volver a iniciar sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;