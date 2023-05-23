
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Carousel from './Carousel'

interface HeroCarouselProps {
   
}


const HeroCarousel: FC<HeroCarouselProps> = ({  }) => {
    const { t} = useTranslation();
    return (
        <div className='relative grid place-content-center w-full'>
            <Carousel />

            <div className='z-10 absolute top-0 left-0 w-full h-full grid place-content-center pointer-events-none'>
                {/* <h1 className='lg:text-[30px] font-bold text-white text-center'>
                    {t('homePage.hero.hero1')}
                    <br />
                    {t('homePage.hero.hero2')}
                </h1> */}

            </div>
        </div>

    )
}

export default HeroCarousel