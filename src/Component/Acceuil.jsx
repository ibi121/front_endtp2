import React from 'react'

export default function Acceuil(props) {
  return (

<div className='h-100 d-flex align-items-center justify-content-center'>
      {props.isLoggedIn? 
        <>
        <p>Bienvenue sur le site <b>{props.utilisateur.identifiant}</b></p>
        </>
      :
      <>
      <p>Veuillez vous connecter pour acceder aux fonctionalités du site.</p>
      </>
      }

</div>
    
  )
}
