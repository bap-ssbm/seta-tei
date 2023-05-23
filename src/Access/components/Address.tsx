import { useTranslation } from 'react-i18next';
import { BiMap } from 'react-icons/bi';

const Address = ({ }) => {
    const { t } = useTranslation();
    return (
        <div className='flex gap-5 md:pr-10 pb-10 md:pb-0 border-b md:border-r md:border-b-0 justify-center items-center'>
            <div className='flex flex-col gap-5'>
                <div>
                    <p className='font-bold underline'>
                        {t('homePage.access.addressTitle')}
                    </p>
                    <p>
                        〒240-0112
                        <br />
                        {t('homePage.access.address')}
                    </p>
                </div>

                <a href='https://www.google.com/maps/place/HAYAMA+%E3%81%9B%E3%81%9F%E4%BA%AD/@35.2782653,139.5714886,17z/data=!3m1!4b1!4m6!3m5!1s0x601846fe07cb3531:0xf8b03366ea9f1814!8m2!3d35.2782653!4d139.5736773!16s%2Fg%2F11bv1m_fqx?hl=en'>
                    <button className='w-full flex gap-2 items-center justify-center bg-blue-950 text-white py-4 hover:opacity-60 duration-300'>
                        <BiMap />Google Maps
                    </button>
                </a>
            </div>
        </div>
    )
}

export default Address