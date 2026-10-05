import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Chapters from './components/Chapters.jsx';
import Products from './components/Products.jsx';
import Ask from './components/Ask.jsx';
import Calculators from './components/Calculators.jsx';
import Principles from './components/Principles.jsx';
import Analysis from './components/Analysis.jsx';
import Faq from './components/Faq.jsx';
import Waitlist from './components/Waitlist.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Chapters />
        <Products />
        <Ask />
        <Calculators />
        <Principles />
        <Analysis />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
