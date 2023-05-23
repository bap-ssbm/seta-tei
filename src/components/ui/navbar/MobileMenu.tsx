import { FC } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
interface MobileMenuProps {
    setOpenMenu: Function
}

const MobileMenu: FC<MobileMenuProps> = ({ setOpenMenu }) => {
    const { t, i18n } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1  }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
            className='w-screen h-screen lg:hidden fixed top-0 left-0 bg-white '>
            <ul className='flex w-full  gap-10 text-[18px] justify-evenly pt-28 px-[5%] flex-col'>
                <li onClick={()=>{setOpenMenu(false)}} className='relative underline-hover-effect'>
                    <Link to="/">
                        {t('navbar.home')}
                    </Link>     
                </li>
                <li onClick={()=>{setOpenMenu(false)}} className='relative underline-hover-effect'>
                    <Link to="/menu">
                        {t('navbar.menu')}
                    </Link>
                </li>
                <li  onClick={()=>{setOpenMenu(false)}} className='relative underline-hover-effect '>
                    <Link to="/concept">
                        {t('navbar.concept')}
                    </Link>
                 
                </li>
                <li  onClick={()=>{setOpenMenu(false)}} className='relative underline-hover-effect '>
                    <Link to="/chef">
                        {t('navbar.about')}
                    </Link>
                 
                </li>
                <li onClick={()=>{setOpenMenu(false)}} className='relative underline-hover-effect'>
                    <Link to="/reserve">
                        {t('navbar.reserve')}

                    </Link>
                </li>
                <li onClick={()=>{setOpenMenu(false)}} className='relative underline-hover-effect'>
                    <Link to="/access">
                        {t('navbar.access')}

                    </Link>     
                </li>
                <li onClick={()=>{setOpenMenu(false)}} className='relative underline-hover-effect'>
                    <button onClick={() => i18n.changeLanguage(i18n.language === "ja" ? "en" : "ja")}>
                        {i18n.language === "ja" ? "English" : "日本語"}
                    </button>
                </li>
            </ul>
        </motion.div>
    )
}

export default MobileMenu