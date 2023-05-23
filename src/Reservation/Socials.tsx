import { useTranslation } from 'react-i18next';
import { BsInstagram, BsFacebook } from 'react-icons/bs'
import { motion } from 'framer-motion';
const Socials= ({ }) => {
    const { t } = useTranslation();
    return (
        <motion.div 
        initial={{opacity:0, y:10}}
        animate={{opacity:1, y:0}}
        transition={{type:'tween', duration:0.6, ease:'easeInOut', delay:0.4}}
        className='flex flex-col gap-5  px-[5%]'>
            <div>
                {t('homePage.reservation.warning')}
            </div>
            <div className='flex gap-10 justify-center mt-4'>
                <a href='https://www.instagram.com/hayama_setatei/' className='flex justify-center items-center gap-3 px-4 hover:underline'>
                    <BsInstagram className='inline-block' /> <span>Instagram</span>
                </a>
                <a href='https://www.facebook.com/hayamasetatei/' className='flex justify-center items-center gap-3 px-4 hover:underline'>
                    <BsFacebook className='inline-block' /><div className='inline-block'>Facebook</div>
                </a>
            </div>
        </motion.div>
    )
}

export default Socials