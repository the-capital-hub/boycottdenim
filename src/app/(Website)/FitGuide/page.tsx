import Navbar2 from "@/Components/Common/Navbar 2";
import FitGuide from "@/Components/FitGuide/fitguide";
import FitGuideSection from "@/Components/FitGuide/fitguide2";
import LastComponentSection from "@/Components/FitGuide/lastcomponent";


const page = () => {
    return (
      <div>
        <Navbar2/>
        <FitGuide/>
        <FitGuideSection/>
        <LastComponentSection/>
        
      </div>
    )
  }
  
  export default page