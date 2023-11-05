import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

    const [mdp, setMdp] = useState("")
    const [identifiant, setIdentifiant] = useState("")
    const [message, setMessage] = useState("")
    const [confirmPassword, setConfirmedPassword] = useState("")
    const [errorShowing, isErrorShowing] = useState(false)
    const [erreurHandlingBackend, setErreurHandlingBackend] = useState("")

    const navigate = useNavigate();


   

    const handleSignin = () => {
        setMessage("")
        isErrorShowing(false)
        if(confirmPassword !== mdp){
            setMessage("Les mots de passes ne sont pas identique.")
            return;
        }
        if(mdp.length === 0 && identifiant.length === 0){
            isErrorShowing(true)
            return;
        }
        envoyerRequete()
    }


    const envoyerRequete = () => {
        Axios.post("https://backend-tp2-web-ih-rm-d79a75ee3069.herokuapp.com/signup", {
            mot_de_passe: mdp,
            nom: identifiant
        }).catch((error) => {
          setErreurHandlingBackend("")

          if(error.response.status === 500) {
            setErreurHandlingBackend("Ce nom d'utilisateur existe déjà, veuillez en choisir un autre.")
            return;
          }

          if(error.response.status === 406){
            setErreurHandlingBackend("erreur de serveur, veuillez relancer votre demande.")
            return; 

          }
        }).then((response) => {
           if(response && response.status === 200) {
            navigate("/Signin")
           }
        })

    }


   

  
  return (
    <div className='text-center'>
    <div className="row d-flex justify-content-center">
    <div className="col-md-4">
    <div className='form-signin'>
      <h1 className='h1 mb-3 font-weight-normal'>Créer vous un compte</h1>

      <h3 className='text-danger'>{erreurHandlingBackend}</h3>
      


    <label htmlFor='name' className='sr-only'>Identifiant utilisateur{errorShowing ? <p className='text-danger'>Ce champ est obligatoire</p>: null}</label>
    <input value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} type='text' id='name' className='form-control' autoFocus="" placeholder='identifiant' required></input>

    <label htmlFor='mdp' className='sr-only'>Mot de passe: {errorShowing ? <p className='text-danger'>Ce champ est obligatoire</p>: null}</label>
    <input value={mdp} onChange={(e) => setMdp(e.target.value)} type='password' id='mdp' className='form-control' autoFocus="" placeholder='mot de passe' required></input>
    <p className='text-danger'>{message}</p>

    <label htmlFor='mdpConfirm' className='sr-only'>Confirmer le mot de passe: {errorShowing ? <p className='text-danger'>Ce champ est obligatoire</p>: null}</label>
    <input value={confirmPassword} onChange={(e) => setConfirmedPassword(e.target.value)} type='password' id='mdpConfirm' className='form-control' autoFocus="" placeholder='mot de passe' required></input>
    <p className='text-danger'>{message}</p>
    <button onClick={handleSignin} className='btn btn-lg btn-primary btn-block'>Inscrivez-vous</button>
  <br/>

    <Link to={'/Signin'}>Déjà inscrit?</Link>
    </div>
    </div>
    </div>
  </div>
  )
}
