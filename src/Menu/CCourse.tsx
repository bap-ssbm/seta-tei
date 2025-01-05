import { useTranslation } from 'react-i18next'

const CCourse= ({}) => {
    const { t } = useTranslation()
  return (
    <div id='ccourse' className='flex-grow flex flex-col gap-8 py-16 items-center'>
            <div>
                <h2 className='underline font-bold'>
                {t('menu.c.title')}
                </h2>
                <p className='underline font-bold'>
                    ¥7,500
                </p>
            </div>
            <p>
            {t('menu.course.amuse')}
            </p>
            <p>
            {t('menu.course.appetizer')}
            </p>
            <p>
            {t('menu.c.soup')}
            </p>
            <p>
            {t('menu.c.main1')}
            </p>
            <div>
                <p>
                {t('menu.c.main2')}
                <br/>
                {t('menu.c.or')}
                <br/>
                {t('menu.c.main3')}
                </p>
            </div>  
            <p>
            {t('menu.basic.soba')}
            </p>
            <div className='flex flex-col items-center'>
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

export default CCourse