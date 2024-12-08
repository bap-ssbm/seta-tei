import { useTranslation } from 'react-i18next';

const Notice = ({ }) => {
    const { t } = useTranslation();
    return (
        <div className='text-center border py-5 px-10 border-red-600'>
            <p className='text-red-600 text-md'>
                {t('notice.txt')}
            </p>
        </div>
    )
}

export default Notice