import { useTranslation } from 'react-i18next'
const ACourse = ({ }) => {
    const { t } = useTranslation()
    return (
        <div id='acourse' className='flex-grow flex flex-col gap-8 py-16 items-center'>
            <div>
                <h2 className='underline font-bold'>
                {t('menu.a.title')}
                </h2>
                <p className='underline font-bold'>
                    ¥3,200
                </p>
            </div>
            <p>
            {t('menu.course.amuse')}
            </p>
            <p>
            {t('menu.course.appetizer')}
            </p>
            <div className='flex flex-col items-center '>
                <p className='mb-5'>
                {t('menu.basic.chooseMain')} {t('menu.basic.choose2')}
                </p>
                <ul className='text-start w-fit flex flex-col gap-3'>
                    <li>
                        ・ {t('menu.a.main1')}
                    </li>
                    <li>
                        ・ {t('menu.a.main2')}
                    </li>
                </ul>
            </div>
            <p>
                ＊{t('menu.basic.soba')} {t('menu.basic.plus550')}
            </p>
            <div className='items-center flex flex-col'>
                <p className='mb-5'>
                {t('menu.course.dessert')}
                </p>
                <ul className='text-start w-fit  flex flex-col gap-3'>
                    <li>
                        ・ {t('menu.basic.cake1')}
                    </li>
                    <li>
                        ・ {t('menu.basic.cake2')}
                    </li>
                    <li>
                        ・ {t('menu.basic.cake3')}
                    </li>
                </ul>
            </div>
            <p>
            {t('menu.course.drink')}
            </p>
        </div>
    )
}

export default ACourse