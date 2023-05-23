import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
const Schedule = () => {
    const { t, i18n } = useTranslation();
    return (
        <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{type:'tween', duration:0.3, ease:'easeInOut'}}
        className='flex lg:flex-row flex-col w-full justify-center gap-10 '>
            <div className=' flex flex-col lg:flex-row gap-5  bg-white rounded-md w-full items-center h-fit '>
                <div className='w-full'>
                    {i18n.language === "ja" ? <img src='/images/date.png' alt='' /> : <img src='/images/timeenglish.jpg' alt='' />}
                </div>
                <div className='flex flex-col  gap-2 text-[18px] p-10 border'>
                    <p className='font-bold  md:whitespace-nowrap '>
                        {t('homePage.reservation.timeTitle')}
                    </p>
                    <div className='text-[17px]'>
                        <p className=' md:whitespace-nowrap'>
                            {t('homePage.reservation.lunch')}: 11:30〜13:30 (LO)
                        </p>
                        <p className='md:whitespace-nowrap'>
                            {t('homePage.reservation.dinner')}: 17:30〜19:30 (LO)
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Schedule