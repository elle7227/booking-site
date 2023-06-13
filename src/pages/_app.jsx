import "@/styles/globals.css";
import { FormDataProvider } from "@/contexts/bookingContext";
import Navigation from "@/components/Navigation";
import BookingDisplay from "./booking_display";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  // Checker om current page er BookingDisplay, bruges til at fjerne navigation
  const isBookingDisplayPage = Component === BookingDisplay;

  useEffect(() => {
    // destructurere pageProps, så det kun er pagePropsne defineret inde i const
    const { isLanding, isSchedule, isProgram } = pageProps;
    //svarer til at vi her sætter en div omkirng indholdet på en hel side.
    // det er dynamisk fordi vi skifter badyclass ud alt efter pageprops. 

    if (isLanding) {
      document.body.className = "landing-background";
    } else if (isSchedule) {
      document.body.className = "schedule-background";
    } else if (isProgram) {
      document.body.className = "program-background";
    } else {
      document.body.className = "default-background";
    }
  }, [pageProps]);
  // sætter pageprops til at være i et array for at tjekke om det sker ændringer med pageprops.
  // useEffect kræver at have et array, hvorpå den kigger efter ændringer.
  return (
    <>
      {/* Render Navigation på alle andre sider end BookingDisplay */}
      {!isBookingDisplayPage && <Navigation />}
      <FormDataProvider>
        <Component {...pageProps} />;
           {/*/... pageprops splitter pageprops i de 3 props.*/}
      </FormDataProvider>
      <Footer />
    </>
  );
}
