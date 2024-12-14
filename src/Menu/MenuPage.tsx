import MenuNav from './MenuNav'
import ACourse from './ACourse'
import Lunch from './Lunch'
import BCourse from './BCourse'
import CCourse from './CCourse'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
const MenuPage = ({ }) => {
      const { t } = useTranslation();
    return (
        <div id='menu-page' className='px-[5%] md:px-0 md:gap-20 w-full text-[16px] mb-20'>
             <div className='text-center border py-5 px-10 border-red-600 mb-0 mt-5 md:mb-10 md:mt-0'>
                <p className='text-red-600 text-md'>
                {t('notice.menu')}
                </p>
            </div>
            <div className='flex flex-col md:px-0 md:flex-row gap-10 md:gap-20 w-full text-[16px] '>
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
        </div>
    )
}

export default MenuPage