import Button from '../ui/Button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
const Appeal = ({ }) => {
    const { t} = useTranslation();
    return (
        <div className='w-full flex flex-col gap-12 mt-14 mb-10 items-center'>
            <Link to='/menu' className='w-full max-w-[500px]'>
                <Button className='w-full'>
                    {t('homePage.appeal.menu')}
                </Button>
            </Link>
            <Link to='/reserve' className='w-full max-w-[500px]'>
                <Button className='w-full'>
                    {t('homePage.appeal.reservation')}
                </Button>
            </Link>
        </div>)
}

export default Appeal