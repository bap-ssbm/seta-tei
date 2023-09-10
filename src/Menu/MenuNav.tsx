import { useTranslation } from 'react-i18next'
const MenuNav= ({ }) => {
    const {t} = useTranslation()
    return (
        <div className='border-b  md:border-r md:border-b-0 pr-4 md:pr-20 py-10 md:pt-20'>
            <ul className='flex flex-col gap-4 md:gap-10 md:sticky md:top-36 h-fit text-center items-center md:items-start md:text-start'>
                <li>
                    <a className='hover:underline' href='#lunch'>
                    {t('menu.lunch.title')}
                    </a>
                </li>
                <li>
                    <div className='flex md:flex-col gap-9 md:gap-10 w-full'>
                        <a className='hover:underline' href='#acourse'>
                        {t('menu.a.title')}
                        </a>
                        <a className='hover:underline' href='#bcourse'>
                        {t('menu.b.title')}
                        </a>
                        <a className='hover:underline' href='#ccourse'>
                        {t('menu.c.title')}
                        </a>
                    </div>
                </li>
                <li>
                    <a href="/menu/jp_menu.pdf" className='hover:underline' download>
                    {t('menu.pdf')}
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default MenuNav