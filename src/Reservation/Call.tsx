import { useTranslation } from 'react-i18next';
import { FaPhoneAlt } from 'react-icons/fa'
import { motion } from 'framer-motion';
import './styles/hover.css'

const Call = () => {
    const { t } = useTranslation();
    return (
        <motion.div 
        initial={{opacity:0, y:10}}
        animate={{opacity:1, y:0}}
        transition={{type:'tween', duration:0.6, ease:'easeInOut'}}
        className='flex flex-col items-center pb-2 px-10 text-blue-900'>
            <p className='text-[18px] font-semibold mt-5'>
                {t('homePage.reservation.button')}
            </p>
            <a href='tel:046-887-0099' className='mb-5 mt-3 flex gap-3 text-3xl pb-2 items-center font-semibold w-fit telephone'>
                <FaPhoneAlt /> 046-887-0099
            </a>
        </motion.div>
    )
}

export default Call