import { FaPhoneAlt } from 'react-icons/fa'
const Call= ({ }) => {
    return (
        <a href='tel:046-887-0099' className=' w-full md:hidden'>
            <button className='p-5 text-[18px] '>
                <FaPhoneAlt />
            </button>
        </a>
    )
}

export default Call