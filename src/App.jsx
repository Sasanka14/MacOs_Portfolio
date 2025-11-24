import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Navbar, Welcome, Dock } from '#components'

gsap.registerPlugin(useGSAP);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock/>
    </main>
  )
}

export default App
