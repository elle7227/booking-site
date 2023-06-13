import { useContext, useState } from "react";
import MainTicket from "../components/MainTicket";
import { formDataContext } from "@/contexts/bookingContext";
import PersonalInfo from "@/components/PersonalInfo";
import FormPay from "@/components/FormPay";
import Confirmation from "@/components/Confirmation";
import Link from "next/link";
import NavigationBooking from "@/components/NavigationBooking";
import Head from "next/head";

//henter data fra available spots og sender med den i booking display component.
export async function getServerSideProps() {
  const api = "https://nova-enchanted-confidence.glitch.me/available-spots";
  const res = await fetch(api);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}


export default function BookingDisplay({ data }) {
  //provide the context to the component
  const { formState, dispatch } = useContext(formDataContext);
  
  // en stater der holder styr på hvilke step i flowet du er på, staten bruges til at vælge component der skal vises.
  const [currentStep, setCurrentStep] = useState(0);

  //kig efter hvilke step du er på, og derudfra vis/switch til denne component.
  switch (currentStep) {
    case 1:
      return <PersonalInfo currentStepSetter={setCurrentStep} />;
    case 2:
      return <FormPay currentStepSetter={setCurrentStep} />;
    case 3:
      return <Confirmation />;
    default:
      return (
        <>
          <Head>
            <title>Booking</title>
          </Head>
          <NavigationBooking />
          <MainTicket
            currentStepSetter={setCurrentStep}
            formData={{ formState, dispatch }}
            spotData={data}
          />
        </>
      );
  }
}
