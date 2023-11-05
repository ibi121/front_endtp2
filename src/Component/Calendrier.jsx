import React, {useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import frCan from '@fullcalendar/core/locales/fr-ca'
import Axios from 'axios'
import { useEffect } from 'react'

export default function Calendrier() {

  const [nomEvent, setNomEvent] = useState(0);
  const [dateEvent, setDateEvent] = useState(0);
  const [events, setEvents] = useState([]);

  const ajouterEvenement = () => {
    setEvents([...events, { title: nomEvent, start: dateEvent },]);
    Axios.post("https://backend-tp2-web-ih-rm-d79a75ee3069.herokuapp.com/ajouterevenemnt", {
      titre: nomEvent,
      date_evenement: dateEvent
    }).then((response) => {
      console.log(response)
    })
  }


  useEffect(() => {
    Axios.get("https://backend-tp2-web-ih-rm-d79a75ee3069.herokuapp.com/getEvenement", {
    })
    .catch((error)=> {
      if(error){
        console.log(error)
        return;
      }
    })
    .then((reponse) => {
      const newEvents = reponse.data.map((item) => ({
        title: item.titre,
        start: item.date_evenement,
      }));
      setEvents(newEvents);
    });
  }, []);

  const supprimerEvenement = (title, date) => {
    Axios.delete("https://backend-tp2-web-ih-rm-d79a75ee3069.herokuapp.com/supprimerEvenement", {
      data: {  
        titre: title,
        date_evenement: date
      }
    })
    .catch((error) => {
      if(error){
        console.log(error);
        return;
      }
    })
    .then((response) => {
      if (response && response.data.message) {
      console.log(response.data.message)
      }
    });
  }

  return (
    <div>
      <div style={{ width: '80%', margin: '0 auto' }}>
         <h1>Calendrier</h1>
        <div id="ajoutEvent">
          <h4>Ajout d'un événement</h4>
            <label>
              Nom de l'événement :
              <input type="text" onChange={(e) => setNomEvent(e.target.value)}></input>
            </label>
            <label>
              Date de l'événement :
              <input type="date" onChange={(e) => setDateEvent(e.target.value)}></input>
            </label>
            <button type='button' className="btn btn-primary" onClick={() => ajouterEvenement()}>Ajouter l'événement au calendrier</button>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventClick={
            (e) => {
            console.log(e.event.title + " " + e.event.startStr)
            if (window.confirm("Voulez vous supprimer cet évènement?") === true) {
              supprimerEvenement(e.event.title, e.event.startStr)
              e.event.remove();
            }
            }
          }
          events={events}
          locale={frCan}
        />
      </div>
    </div>
  )
}
