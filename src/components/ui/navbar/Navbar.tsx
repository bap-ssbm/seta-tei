
import { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import NavMenu from './NavMenu'
import Hamburg from './Hamburg'
import MobileMenu from './MobileMenu'
import Call from './Call'
import { Link } from 'react-router-dom'
const Navbar = ({ }) => {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <motion.nav 
        initial={{opacity:0}}
        animate={{opacity:1}}
        className=' w-full flex-col items-center flex justify-center gap-10 pt-5 z-50 bg-white  duration-300 transition-all mb-10'>
            <div className='fixed left-0'>
                <Call />
            </div>
            <Link to='/' className='max-w-[60%]'>
                <img src='/images/logo.png' />
            </Link>
            <NavMenu />
            <Hamburg openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <AnimatePresence>
                {openMenu && <MobileMenu setOpenMenu={setOpenMenu} />}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar