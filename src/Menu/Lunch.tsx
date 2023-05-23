import { useTranslation } from 'react-i18next'
const Lunch = () => {
    const { t } = useTranslation()
    return (
        <div id='lunch' className='flex-grow flex flex-col gap-8 pb-16 items-center'>
            <div>
                <h2 className='underline font-bold space-x-2'>
                    {t('menu.lunch.title')} {t('menu.lunch.titleEtc')}
                </h2>
                <p className='underline font-bold'>
                    ¥1,800
                </p>
            </div>
            <p>
                {t('menu.lunch.soupAndSalad')}
            </p>
            <div className='items-center flex flex-col w-fit'>
                <p className='mb-5'>
                    {t('menu.basic.chooseMain')} {t('menu.basic.chooseFrom3')}
                </p>
                <ul className='text-start w-fit flex flex-col gap-3'>
                    <li>
                        ・ {t('menu.lunch.main1')}
                    </li>
                    <li>
                        ・ {t('menu.lunch.main2')}
                    </li>
                    <li>
                        <div>
                            <p className='italic'>
                            {t('menu.lunch.main3Title')}
                            </p>
                            <p>
                                ・  {t('menu.lunch.main3')}
                            </p>
                        </div>

                    </li>
                </ul>
            </div>
            <p>
            {t('menu.lunch.sourbet')}
            </p>
            <hr className='border-dashed w-full' />
            <div className='flex flex-col items-center'>
                <p >
                    ＊{t('menu.lunch.dessertTitle')}
                </p>
                <p className='mb-5'>
                {t('menu.lunch.dessertChoose')}
                </p>
                <ul className='text-start mb-5 w-fit flex flex-col gap-3'>
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
                <p>
                {t('menu.lunch.dessertAndDrink')}・・・￥650
                </p>
            </div>
            <hr className='border-dashed w-full' />
            <p>
            {t('menu.basic.soba')}・・・¥550
            </p>
            <p>
            {t('menu.lunch.drinks')}・・・￥400
            </p>
        </div>
    )
}

export default Lunch