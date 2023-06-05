import { Masonry } from '@mui/lab';
import data from './data'
import { motion } from 'framer-motion';
const Showcase= ({ }) => {
    return (
        <div className="mt-20"> 
            <Masonry columns={{ xs: 2, sm:3, md:4}} spacing={2}>
                {data.map((item ,index)=>(
                    <motion.img 
                    initial={{opacity:0}}
                    whileInView={{opacity:1}}
                    transition={{duration:0.5, ease:'easeInOut'}}
                    src={item.imgurl} alt={'img' + index}/>
                ))}
            </Masonry>
        </div>
    )
}
export default Showcase