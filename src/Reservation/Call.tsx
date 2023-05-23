import { useTranslation } from 'react-i18next';
import { FaPhoneAlt } from 'react-icons/fa'
import { motion } from 'framer-motion';

const Call = () => {
    const { t } = useTranslation();
    return (
        <motion.div 
        initial={{opacity:0, y:10}}
        animate={{opacity:1, y:0}}
        transition={{type:'tween', duration:0.6, ease:'easeInOut'}}
        className='flex flex-col items-center py-2 px-10 text-blue-900'>
            <p className='text-[16px] font-semibold mt-5'>
                {t('homePage.reservation.button')}
            </p>
            <a href='tel:046-887-0099' className='mb-5 flex gap-3 text-[18px] items-center border-b border-b-black font-semibold hover:scale-105 duration-300 w-fit'>
                <FaPhoneAlt /> 046-887-0099
            </a>
        </motion.div>
    )
}

export default Call