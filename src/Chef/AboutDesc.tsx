import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const AboutDesc = () => {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y:10 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ type: 'tween', duration: 0.6, ease: 'easeInOut', delay:0.4 }}
            className='max-w-[500px] lg:basis-3/4 '>
            <div className='flex flex-col gap-5'>
                <div>
                    <h2 className='font-bold'>瀬田律子</h2>
                    <h3>Ritsuko Seta</h3>
                </div>
                <hr />
                <p>
                    {t('homePage.about.desc')}
                </p>
                <hr />
                <div>
                    <h2 className='font-bold'>
                        {t('homePage.about.title')}
                    </h2>

                    <ul>
                        <li>
                            ・ {t('homePage.about.first')}
                        </li>
                        <li>
                            ・ {t('homePage.about.second')}
                        </li>
                        <li>
                            ・ {t('homePage.about.third')}
                        </li>
                        <li>
                            ・ {t('homePage.about.fourth')}
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

export default AboutDesc