import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '../../Home/components/ui/Button';
import { motion } from 'framer-motion';

const ConceptIntro = () => {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'tween', duration: 0.6, ease:'easeInOut' }}
            className='text-center flex flex-col gap-5 items-center mb-10 '>
            <p>
                {t('homePage.menu.concept')}
                <br />
                {t('homePage.menu.concept2')}
                <br />
                {t('homePage.menu.concept3')}
                <br />
                {t('homePage.menu.concept4')}
            </p>
            <div className='md:w-[50%] w-full'>
                <Link className='w-fit' to='/menu'>
                    <Button className='w-full px-10'>
                        {t('homePage.menu.button')}
                    </Button>
                </Link>
            </div>
        </motion.div>
    )
}

export default ConceptIntro