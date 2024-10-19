import { Routes, Route, Navigate } from 'react-router-dom'
import WebFont from 'webfontloader';
import LanguageBtn from './components/common/LanguageBtn';
function App() {
  return (
    <div id='page-wrapper' className='lg:p-[1%]  '>
      <div className='max-w-[1000px] font-EB-garamond text-[14px] flex flex-col mx-auto border px-[2%] lg:py-[2%] bg-white shadow-md'>
      Hello world
      </div>
      <LanguageBtn/>
      
    </div>
  );
}

export default App;
