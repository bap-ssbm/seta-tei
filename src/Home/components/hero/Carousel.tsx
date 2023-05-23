import { FC, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GrNext, GrPrevious } from 'react-icons/gr'

const images = [
    "/images/top-1.jpg",
    "/images/店内８.jpg",
    "/images/Face book/_MG_9831.JPG",
    "/images/hayamahero.jpg"
]

const Carousel = ({ }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [nextSlide, setNextSlide] = useState<number>(1)
    const [prevSlide, setPrevSlide] = useState<number>(images.length - 1)
    useEffect(()=>{
        setNextSlide(currentSlide + 1 == images.length ? 0 : currentSlide + 1)
        setPrevSlide(currentSlide - 1 == -1 ? images.length - 1 : currentSlide - 1)
    })


    const [showNext, setShowNext] = useState<boolean>(false)
    const [showPrev, setShowPrev] = useState<boolean>(false)

    const handleShowNext = () => {
        setShowPrev(false)
        setShowNext(true)
        setCurrentSlide(nextSlide)
        
    }
    const handleShowPrev = () => {
        setShowNext(false)
        setShowPrev(true)
        setCurrentSlide(prevSlide)
        
    }
    useEffect(()=>{
        let timer = setInterval(() => {
            handleShowPrev()
        }, 10000);
        return ()=>{
            if(timer) {
                clearInterval(timer)
            }
        }
    })
    
    
    return (
        <div className='showBtns relative w-full  overflow-hidden text-white md:aspect-[2000/871]' >
            <AnimatePresence key={currentSlide}>
                <motion.div   
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 2 } }}
                    exit={{ opacity: 0, transition: { delay: 0.5, duration: 2 } }}
                    className='z-10 relative '>
                    <img
                        className='min-h-[400px]  md:h-auto object-cover'
                        height={871}
                        width={1920}
                        src={images[currentSlide]}
                        alt=''
                    />
                </motion.div>
                {showNext && <motion.div
                    className='absolute top-0 left-0 '>
                    <img
                    className='h-[400px] md:h-auto object-cover '
                        height={1080}
                        width={1920}
                        src={images[prevSlide]}
                        alt=''
                    />
                </motion.div>}
                {showPrev && <motion.div
                    className='absolute top-0 left-0 '>
                    <img
                    className='h-[400px] md:h-auto object-cover'
                        height={1080}
                        width={1920}
                        src={images[nextSlide]}
                        alt=''
                    />
                </motion.div>}
            </AnimatePresence>
            <button onClick={() => {handleShowNext()}}
                className='absolute top-[45%] right-[5%] z-20 opacity-0 text-[28px] duration-300 hover:scale-125'>
                <GrNext />
            </button>
            <button onClick={() => {handleShowPrev()}}
                className='absolute top-[45%] left-[5%] z-20  text-[28px] opacity-0 duration-300 hover:scale-125'>
                <GrPrevious />
            </button>
        </div>
    )
}

export default Carousel