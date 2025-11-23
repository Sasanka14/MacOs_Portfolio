import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Navbar, Welcome } from '#components'

gsap.registerPlugin(useGSAP);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
    </main>
  )
}

export default App
