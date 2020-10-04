import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import alertaContext from '../../context/alertas/alertaContext'
import authContext from '../../context/auteticacion/authContext'

const Login = (props) => {
    const alertasContext = useContext(alertaContext)
    const {alerta, mostrarAlerta} = alertasContext

    const authoContext = useContext(authContext)
    const {mensaje, autenticado, iniciarSesion} = authoContext

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
        email: '',
        password: ''
    })

    const {email, password} = usuario

    const onchange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onsubmit = e => {
        e.preventDefault()

        if(email.trim() === "" || password === ""){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }

        iniciarSesion({email, password})
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
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={onsubmit}
                >
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
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>

                <Link 
                    to={'/nueva-cuenta'} 
                    className="enlace-cuenta"
                >
                    Obtener cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;