import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Navbar, Welcome, Dock, Home } from '#components'
import { Draggable } from "gsap/Draggable";
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Teams } from "#windows";
gsap.registerPlugin(Draggable);

gsap.registerPlugin(useGSAP);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock/>
      <Home/>

      <Terminal/>
      <Safari/>
      <Resume/>
      <Finder/>
      <Text/>
      <Image/>
      <Contact/>
      <Teams/>
    </main>
  )
}

export default App
