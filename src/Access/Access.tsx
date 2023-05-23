import { useTranslation } from 'react-i18next'
import Address from './components/Address';
import How from './components/How';
import { motion } from 'framer-motion';
const Access = ({ }) => {
  const { i18n } = useTranslation();
  return (
    <div className='flex flex-col gap-10 items-center mb-10'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {i18n.language === "ja" ? <img height={500} width={1000} alt='' src='/images/AO_Map.png' /> : <img height={500} width={1000} alt='' src='/images/AO_Map_en.png' />}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y:10 }}
        whileInView={{ opacity: 1, y:0 }}
        transition={{ duration: 0.6, type:'tween', delay:0.1 }}
        className='flex gap-10 flex-col md:flex-row p-10'>
        <Address />
        <How />
      </motion.div>
    </div>
  )
}

export default Access