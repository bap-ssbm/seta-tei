import { Routes, Route } from 'react-router-dom'
import WebFont from 'webfontloader';
import Homeage from './Home/Homepage'
import Navbar from './components/ui/navbar/Navbar'
import Footer from './components/ui/Footer'
import Chef from './Chef/Chef'
import Access from './Access/Access'
import Reservation from './Reservation/Reservation'
import LanguageBtn from './components/ui/navbar/LanguageBtn'
import Concept from './concept/Concept'
import MenuPage from './Menu/MenuPage'

WebFont.load({
  custom: {
    families: ['hannari'],
  },
});
const App = () => {
  return (
    <div id='page-wrapper' className='lg:p-[1%]  '>
      <LanguageBtn />
      <div className='max-w-[1000px] font-EB-garamond text-[14px] flex flex-col mx-auto border px-[2%] lg:py-[2%] bg-white shadow-md'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homeage />} />
          <Route path='/chef' element={<Chef />} />
          <Route path='/concept' element={<Concept />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/reserve' element={<Reservation />} />
          <Route path='/access' element={<Access />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )}

export default App