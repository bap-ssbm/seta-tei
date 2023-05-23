import { useTranslation } from 'react-i18next';
const How = ({ }) => {
    const { t} = useTranslation();
    return (
        <div className='flex flex-col gap-10 '>
            <div className='max-w-[800px]'>
                <p className='font-bold mb-2 underline text-blue-950'>
                    {t('homePage.access.busTitle')}
                </p>
                <p>
                    {t('homePage.access.busDesc')}
                </p>
            </div>
            <div>
                <p className='font-bold mb-2 underline text-blue-950'>
                    {t('homePage.access.carTitle')}
                </p>
                <p>
                    {t('homePage.access.carDesc')}
                    <br />
                    {t('homePage.access.car1')}
                    <br />
                    {t('homePage.access.car2')}
                </p>
            </div>
        </div>
    )
}

export default How