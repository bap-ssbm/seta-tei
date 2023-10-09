import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Appeal = () => {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1}}
            transition={{ type: 'tween', duration: 0.6, delay:0.4, ease:'easeIn' }}
            className='flex flex-col md:flex-row gap-20 items-center'>
            <div className='flex gap-10  flex-col text-center  items-center  md:w-[30%] lg:max-w-[300px]'>
                <div className=' flex flex-col gap-5'>
                    <h2 className='font-bold text-[16px] italic'>
                        {t('homePage.menu.hayamaTitle')}
                    </h2>
                    <hr />
                    <p className=''>
                        {t('homePage.menu.hayamaDesc')}
                    </p>
                </div>
                <div className='bg-blue-900'>
                    <img className='translate-x-3 translate-y-3  border border-black' src='/images/hayamaImg.jpg' alt='mount fuji' height={300} width={300} />
                </div>
            </div>
            <div className='flex gap-10  flex-col text-center  items-center  md:w-[30%] lg:max-w-[300px]'>
                <div className=' flex flex-col gap-5 '>
                    <h2 className='font-bold text-[16px] italic'>
                        {t('homePage.menu.vegetableTitle')}
                    </h2>
                    <hr />
                    <p className=''>
                        {t('homePage.menu.vegieDesc')}
                    </p>
                </div>
                <div className='bg-blue-900'>
                    <img className='translate-x-3 translate-y-3  border border-black' src='/images/vegetables.jpg' alt='hayama vegetables' height={300} width={300} />
                </div>
            </div>
            <div className='flex gap-10  flex-col text-center  items-center md:w-[32%] '>
                <div className=' flex flex-col gap-5 '>
                    <h2 className='font-bold text-[16px] italic'>
                        {t('homePage.menu.fishTitle')}
                    </h2>
                    <hr />
                    <p className=''>
                        {t('homePage.menu.fishDesc')}
                    </p>

                </div>
                <div className='bg-blue-900'>
                    <img className='translate-x-3 translate-y-3 border border-black' src='/images/foodimg.jpg' alt='image of ala carte' height={300} width={300} />
                </div>
            </div>
        </motion.div>
    )
}

export default Appeal