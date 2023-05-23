import Schedule from './Schedule'
import Socials from './Socials'
import Call from './Call'
const Reservation = ({ }) => {
    return (
        <div className='py-16 w-full flex flex-col gap-5 mx-auto items-center  px-[5%] '>
            <Schedule />
            <hr className='border-dashed w-full' />
            <Call />
            <Socials />
        </div>
    )
}

export default Reservation