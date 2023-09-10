import MenuNav from './MenuNav'
import ACourse from './ACourse'
import Lunch from './Lunch'
import BCourse from './BCourse'
import CCourse from './CCourse'
import { motion } from 'framer-motion'

const MenuPage = ({ }) => {
    return (
        <div id='menu-page' className='flex flex-col px-[5%] md:px-0 md:flex-row gap-10 md:gap-20 w-full text-[16px] mb-20'>
             
            <MenuNav />
            <motion.div 
            initial={{opacity:0, y:10}}
            animate={{opacity:1, y:0}}
            transition={{type:'tween', duration:0.6, ease:'easeInOut'}}
            className='flex-grow flex flex-col md:ml-[-50px] items-center md:pb-20 md:pt-10 text-center'>
                <Lunch/>
                <ACourse />
                <BCourse/>
                <CCourse/>
            </motion.div>
        </div>
    )
}

export default MenuPage