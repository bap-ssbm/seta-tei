import { useTranslation } from 'react-i18next'
const BCourse = ({ }) => {
    const { t } = useTranslation()
    return (
        <div id='bcourse' className='flex-grow flex flex-col gap-8 py-16 items-center'>
            <div>
                <h2 className='underline font-bold'>
                {t('menu.b.title')}
                </h2>
                <p className='underline font-bold'>
                    ¥4,300
                </p>
            </div>
            <p>
            {t('menu.course.amuse')}
            </p>
            <p>
            {t('menu.course.appetizer')}
            </p>
            <p>
            {t('menu.b.soup')}
            </p>
            <div>
                <p className='mb-5'>
                {t('menu.basic.chooseMain')} {t('menu.basic.chooseFrom3')}
                </p>
                <ul className='flex flex-col items-center w-full gap-3'>
                    <li>
                        ・ {t('menu.b.main1')}
                    </li>
                    <li>
                        ・ {t('menu.b.main2')}
                    </li>
                    <li>
                    ・ {t('menu.b.main3')}
                    </li>
                </ul>
            </div>
            <p>
                ＊{t('menu.basic.soba')} {t('menu.basic.plus550')}
            </p>
            <div>
                <p className='mb-5'>
                {t('menu.course.dessert')}
                </p>
                <ul className='text-start w-fit flex flex-col gap-3'>
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

export default BCourse