import {
  FormControl,
  Card,
  CardContent,
  TextField,
  FormGroup,
} from "@mui/material";
import InputMask from "react-input-mask";
import { useContext, useState, useRef } from "react";
import styles from "../styles/Form.module.css";
import BackButton from "@/components/BackButton";
import MyButton from "@/components/MyButton";
import { formDataContext } from "@/contexts/bookingContext";

export default function FormPay({ currentStepSetter }) {
  const { formData, dispatch } = useContext(formDataContext); //ticket booking context

  /* SUBMIT TO SUPABASE*/
  const formRef = useRef(null);

  /* CONFIRM RESERVATION */
  function confirmReservation(e) {
    e.preventDefault();
    //definerer objekt som indeholder alt i global state.
    const payload = {
      Date: formData.formData.date,
      ticketType: formData.formData.ticketType,
      ticketAmount: formData.formData.ticketAmount,
      area: formData.formData.area,
      attendees: formData.formData.attendees,
      green: formData.formData.green,
      tent: formData.formData.tent,

      tents2: formData.formData.tents2,
      tents3: formData.formData.tents3,
      reservation_id: formData.formData.id,
      ticketPrice: formData.formData.ticketPrice,
    };

    /* Fetcher fra api "confirm-order" som er et mellemled der indeholder kode som forbinde til vores database */
    fetch("/api/confirm-order", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "hej"));

    /* dispatch fetcher data fra udfyldte forms og sender det til api "fullfill-reservation" */
    fetch("https://nova-enchanted-confidence.glitch.me/fullfill-reservation", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: formData.id,
      }),
    });
    dispatch({ action: "SUBMIT" });
    console.log("THIS IS PAYLOAD", payload);
    currentStepSetter(3);
  }
  console.log(formData);
  /* samled pris af bestilling state */
  const [totalAmount, setTotalAmount] = useState(0);

  function handlePreviousFormComponent() {
    dispatch({ action: "PREVIOUS" });
    currentStepSetter(1); //change current step
  }

  return (
    <>
      <div className={styles.btn_container}>
        <BackButton onClick={handlePreviousFormComponent}>Back</BackButton>
      </div>
      <h1 className={styles.h1}>Payment details</h1>
      <section className={styles.body}>
        <article className={styles.overviewContainer}>
          <div className={styles.containerTicketInfo}>
            <h2 className={styles.h2}> Overview</h2>
            <p className={styles.p}>
              <span className={styles.bold}>
                {formData.formData.ticketAmount}
              </span>{" "}
              Tickets /{" "}
              <span className={styles.bold}>
                {formData.formData.ticketType}
              </span>
            </p>

            <p className={styles.p}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-calendar-event"
                viewBox="0 0 16 16"
              >
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>{" "}
              {formData.formData.date}
            </p>
            {/* <p className={styles.p}>Area: {formData.formData.area}</p> */}
            <p className={styles.p}>
              <span className={styles.bold}>
                {formData.formData.ticketAmount}
              </span>{" "}
              Spots /{" "}
              <span className={styles.bold}>{formData.formData.area}</span>
            </p>
            <p className={styles.p}>
              {formData.formData.green ? <p>Green Option</p> : <p></p>}
            </p>
            <p>
              {formData.formData.tentSetUp ? (
                <p className={styles.p}>Setup of tent</p>
              ) : (
                <p></p>
              )}
            </p>
          </div>
          <div className={styles.atendee_container}>
            {formData.formData.attendees.map((attending, index) => (
              <p key={index}>
                <p className={styles.p}>Person {index + 1}</p>
                <p className={styles.p}> {attending.fullname}</p>
                <p className={styles.p}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-envelope-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                  </svg>{" "}
                  {attending.email}
                </p>
                <p className={styles.p}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-telephone-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                    />
                  </svg>{" "}
                  {attending.phone}
                </p>
              </p>
            ))}
          </div>
        </article>
      </section>

      <form onSubmit={confirmReservation} className={styles.form} ref={formRef}>
        <FormControl variant="outlined">
          <Card>
            <CardContent className={styles.formWrapper}>
              <h2 className={styles.h2}>Payment</h2>
              <TextField
                className={styles.formWrapper}
                name="fullname"
                id="fullname"
                label="Name"
                placeholder={"fx: John Doe"}
                required //onChange={handlePIChanges}
              />

              <br></br>
              <TextField
                className={styles.formWrapper}
                name="email"
                id="email"
                label="Email"
                placeholder={"fx: JohnDoe@gmail.com"}
                required
              />
              <br></br>
              <TextField
                name="phone"
                type="tel"
                id="phone"
                label="Phone"
                inputProps={{ maxLength: 11, minLength: 8 }}
                pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                placeholder={"fx: 11111111"}
                required
              />

              <h2 className={styles.h2}>Card Info</h2>
              <FormGroup variant="standard" id="paymentInfoGroup">
                <TextField
                  type="text"
                  name="Cardholder's name"
                  label="Cardholder's name"
                  required
                  className={styles.formWrapper}
                ></TextField>
                <br></br>
                <TextField
                  className={styles.formWrapper}
                  type="text"
                  id="standardCard"
                  label="Credit Card No."
                  required
                  name="creditcard"
                  inputProps={{ maxLength: 16 }}
                  variant="outlined"
                  //used InputProps for custom inputs and components with react-input-mask
                  //chatgpt helped
                  InputProps={{
                    inputComponent: InputMask,
                    inputProps: {
                      mask: "9999 9999 9999 9999",
                      maskChar: "-",
                    },
                  }}
                ></TextField>
                <br></br>
                <TextField
                  className={styles.formWrapper}
                  inputProps={{ maxLength: 4 }}
                  type="text"
                  id="exp.date"
                  variant="outlined"
                  name="expDate"
                  label="Exp. Date (MM/YY)"
                  required
                  InputProps={{
                    inputComponent: InputMask,
                    inputProps: {
                      mask: "99/99",
                    },
                  }}
                />
                <TextField
                  className={styles.formWrapper}
                  type="text"
                  name="CVC"
                  label="CVC"
                  inputProps={{ maxLength: 3, minLength: 3 }}
                  required
                ></TextField>
              </FormGroup>
            </CardContent>
            <div className={styles.btnWrapper}>
              <div className={styles.btn_container}>
                <MyButton type="submit">Checkout</MyButton>
              </div>
            </div>
          </Card>
        </FormControl>
      </form>
    </>
  );
}
