import React, { useState, useContext } from "react";
import { FormControl, Card, CardContent } from "@mui/material";
import MyButton from "@/components/MyButton.jsx";
import styles from "../styles/Form.module.css";
import OtherOptionsSection from "./OtherOptions";
import AvailableSpotsSection from "./AvailableSpots";
import TicketsSection from "./TicketSection";
import { formDataContext } from "@/contexts/bookingContext";

//!!!!mainTicket komponent er hele layout for den første side man ser på booking!!!!


export default function MainTicket({ spotData, currentStepSetter }) {
  //state til at åbne og lukke en lille infoboks ved tent set up
  const [open, setOpen] = useState(false);

  //fortæller at vi skal bruge useContext (vores context) - context call on the parent
  const { formData, dispatch } = useContext(formDataContext);

  const handleInfoClick = () => {
    setOpen(!open);
  };

  //vi får adgang til api - vores endpoint - fetch, som vi kan sende via `put` metoden sted og antal billetter.
  function reserveSpot(e) {
    e.preventDefault();
    fetch("https://nova-enchanted-confidence.glitch.me/reserve-spot", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area: formData.formData.area,
        amount: formData.formData.ticketAmount,
      }),
    })
    //som response på det vi smider op får vi et id på en reservation tilhørende det globale objekt.
    //i vores database vil der ligge et id med tilhørende sted og antal tickets.
      .then((response) => response.json())
      .then((data) => {
        console.log(data.id);
        /* sætter formDatas id til at være det id vi får i response så det kan sende med videre */
        formData.formData.id = data.id;
        handleNextFormComponent();
      });
    console.log(formData, formData.id);
  }

  function handleNextFormComponent() {
    dispatch({ action: "NEXT" });
    dispatch({ action: "CREATE_ATTENDEE_STRUCTURE" });
    currentStepSetter(1); //change current step
  }

  return (
    <>
      <h1 className={styles.h1}>Ticket details</h1>
      <div>
        <form className={styles.form} onSubmit={reserveSpot}>
          <FormControl variant="filled">
            <Card>
              <CardContent className={styles.formWrapper}>
                <TicketsSection />
                <AvailableSpotsSection areaData={spotData} />
                <OtherOptionsSection open={open} handleInfoClick={handleInfoClick} />
              </CardContent>
              <div className={styles.btn_container}>
                <MyButton type="submit">Next</MyButton>
              </div>
            </Card>
          </FormControl>
        </form>
      </div>
    </>
  );
}
