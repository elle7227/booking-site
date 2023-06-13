import Landing from "@/components/Landing";
import LandingTickets from "@/components/LandingTickets";
import LandingArtists from "@/components/LandingArtists";
import LandingProgram from "@/components/LandingProgram";
import LandingStages from "@/components/LandingStages";

//prop-drilling parent komponent parser props(data) ned til sine children komponenter som kan anvende denne data (sende videre)
export default function Home({ bandData }) {
  return (
    <section>
      <Landing />
      <LandingTickets />
      <LandingProgram bandData={bandData} />
      <LandingArtists bandData={bandData} />
      <LandingStages />
    </section>
  );
}
//components gør strukturen lettere, eks hvis man 

export async function getServerSideProps() {
  const apiEndpoint = "https://nova-enchanted-confidence.glitch.me/bands";
  const bandRes = await fetch(apiEndpoint);
  const bandData = await bandRes.json();

  //isLanding er boolean som på hver side sættes til true, og hermed sætter en bestemt dynamisk klasse = vores baggrund
  return {
    props: {
      bandData,
      isLanding: true,
    },
  };
}
