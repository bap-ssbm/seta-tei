import AboutDesc from './AboutDesc';
import { motion } from 'framer-motion';
const AboutSection = () => {
    return (
        <div className=' w-full grid place-content-center '>
            <div>
                <motion.h1 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{type:'tween', duration:0.6, ease:'easeInOut'}}
                className='text-[23px] italic tracking-[2px] mb-5'>
                    About The Chef
                </motion.h1>
            </div>
            <div className='w-full items-center  flex gap-20 flex-col lg:flex-row mt-10'>
                <motion.div 
                initial={{opacity:0,  y:10 }}
                animate={{opacity:1,  y:0 }}
                transition={{type:'tween', duration:0.6, ease:'easeInOut' , delay:0.4}}
                className='mr-10 lg:mr-0 p-5 h-fit bg-light-blue lg:w-[34%] max-w-[350px] '>
                    <img className='translate-x-10 w-full' src='/images/Rituko Seta - Copy.jpg' alt='seta chef 瀬田シェフ' height={500} width={500} />
                </motion.div>
                <AboutDesc />
            </div>
        </div>
    )
}

export default AboutSection