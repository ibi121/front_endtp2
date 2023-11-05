import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

import {Link} from 'react-router-dom'
Axios.defaults.withCredentials = true;


export default function Signin(props) {
  const [nom, setNom] = useState('')
  const [mdp, setMdp] = useState('')
  const [errorShowing, isErrorShowing] = useState(false)
  const [erreurHandlingBackend, setErreurHandlingBackend] = useState("")

  const navigate = useNavigate();

  const handleSignin = () => {
    isErrorShowing(false)
   
    if(mdp.length === 0 && nom.length === 0){
        isErrorShowing(true)
        return;
    }
    envoyerRequete()
  }


  const handleSession = () => {
    setErreurHandlingBackend("")
    Axios.get("https://backend-tp2-web-ih-rm-d79a75ee3069.herokuapp.com/signin")
    .catch((error) => {
      setErreurHandlingBackend("erreur de serveur, veuillez revenir plus tard.")
      return;
    })
    .then((response) => {
      if(response && response.data.isConnected) {
        props.onClick(true)
        navigate("/")
      }
    })
  }

  const envoyerRequete = () => {
      Axios.post('https://backend-tp2-web-ih-rm-d79a75ee3069.herokuapp.com/signin', {
      mdp: mdp,
      nom: nom
    }).catch((error) => {
      setErreurHandlingBackend("")

      if(error){
        console.log(error)
        return;
      }

      if(error.reponse.status === 500) {
        setErreurHandlingBackend(error.reponse.message)
        return;
      }

      if(error.reponse.status === 505){
        setErreurHandlingBackend(error.errorShowing.message)
        return;
      }

    }).then((response) => {
      if(response && response.status === 200) {
      handleSession()
      }
    })

  }


  

  return (
    <div className='text-center'>
      <div className="row d-flex justify-content-center">
      <div className="col-md-4">
      <div className='form-signin'>
        <h1 className='h1 mb-3 font-weight-normal'>Veuillez vous connecter</h1>

      <h3 className='text-danger'>{erreurHandlingBackend}</h3>



      <label htmlFor='name' className='sr-only'>Nom d'utilisateur {errorShowing ? <p className='text-danger'>Ce champ est obligatoire</p>: null}</label>
      <input value={nom} onChange={(e) => setNom(e.target.value)} type='text' id='name' className='form-control' autoFocus="" placeholder='identifiant'></input>

      <label htmlFor='mdp' className='sr-only'>Mot de passe: {errorShowing ? <p className='text-danger'>Ce champ est obligatoire</p>: null}</label>
      <input value={mdp} onChange={(e) => setMdp(e.target.value)} type='password' id='mdp' className='form-control' autoFocus="" placeholder='mot de passe'></input>

      <button onClick={handleSignin} className='btn btn-lg btn-primary btn-block'>Connectez-vous :o)</button>
    <br/>

      <Link to={'/Signup'}>Pas de compte?</Link>
      </div>
      </div>
      </div>
    </div>
  )
}
