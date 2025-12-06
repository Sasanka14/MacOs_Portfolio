import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Navbar, Welcome, Dock } from '#components'
import { Draggable } from "gsap/Draggable";
import { Terminal, Safari } from "#windows";
gsap.registerPlugin(Draggable);

gsap.registerPlugin(useGSAP);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock/>

      <Terminal/>
      <Safari/>
    </main>
  )
}

export default App
