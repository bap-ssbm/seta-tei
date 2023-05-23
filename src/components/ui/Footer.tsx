import { useTranslation } from 'react-i18next';
import { CiInstagram, CiFacebook } from 'react-icons/ci'

const Footer = ({ }) => {
    const { t } = useTranslation();
    return (
        <footer className='py-10 border-t  gap-3 w-full flex justify-center flex-col text-center items-center '>
            <p>
             {t('homePage.access.address')}
            </p>
            <a href='tel:046-887-0099' className='w-fit hover:text-black  duration-300 flex items-center gap-3'>
                <p className=''>
                    {t('footer.reservation')}:
                </p>
                <span className='text-[16px]'>046-887-0099</span>
            </a>
            <div className='flex  justify-center gap-5 items-center h-fit  text-[25px]'>
                <a href='https://www.instagram.com/hayama_setatei/' className='hover:text-black duration-300'>
                    <CiInstagram />
                </a>
                <a href='https://www.facebook.com/hayamasetatei/' className='hover:text-black duration-300'>
                    <CiFacebook />
                </a>
            </div>
            <p className=''>
                © HAYAMA せた亭
            </p>
        </footer>
    )
}

export default Footer