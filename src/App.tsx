import { About } from './components/About'
import { Building } from './components/Building'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Expertise } from './components/Expertise'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Work } from './components/Work'

function App() {
  return (
    <div className="min-h-screen bg-ink font-body text-paper">
      <Nav />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Work />
        <Experience />
        <Building />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
