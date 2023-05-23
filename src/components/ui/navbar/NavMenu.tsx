import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
const NavMenu = ({ }) => {
    const { t } = useTranslation();
    return (
        <div className='w-full md:flex justify-center hidden items-center'>
            <hr className='flex-grow h-[1px]' />
            <ul className='flex  w-[70%] justify-evenly '>
                <li className='relative underline-hover-effect'>
                    <NavLink to="/"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "border-b-[2px] border-blue-950" : ""}>
                        {t('navbar.home')}
                    </NavLink>
                    <div className='absolute bottom-0 left-0 w-full h-[2px] bg-blue-950 duration-500' />
                </li>

                <li className='relative underline-hover-effect'>
                    <NavLink to="/menu"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "border-b-[2px] border-blue-950" : ""}>
                        {t('navbar.menu')}
                    </NavLink>
                    <div className='absolute bottom-0 left-0 w-full h-[2px] bg-blue-950 duration-500' />
                </li>
                <li className='relative underline-hover-effect '>
                    <NavLink to="/concept"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "border-b-[2px] border-blue-950" : ""}>
                        {t('navbar.concept')}
                    </NavLink>
                    <div className='absolute bottom-0 left-0 w-full h-[2px] bg-blue-950 duration-500' />
                </li>
                <li className='relative underline-hover-effect '>
                    <NavLink to="/chef"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "border-b-[2px] border-blue-950" : ""}>
                        {t('navbar.about')}
                    </NavLink>
                    <div className='absolute bottom-0 left-0 w-full h-[2px] bg-blue-950 duration-500' />
                </li>
                <li className='relative underline-hover-effect'>
                    <NavLink to="/reserve"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "border-b-[2px] border-blue-950" : ""}>
                        {t('navbar.reserve')}
                    </NavLink>
                    <div className='absolute bottom-0 left-0 w-full h-[2px] bg-blue-950 duration-500' />
                </li>

                <li className='relative underline-hover-effect'>
                    <NavLink to="/access"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "border-b-[2px] border-blue-950" : ""}>
                        {t('navbar.access')}
                    </NavLink>
                    <div className='absolute bottom-0 left-0 w-full h-[2px] bg-blue-950 duration-500' />
                </li>
            </ul>
            <hr className='flex-grow h-[1px]' />
        </div>
    )
}

export default NavMenu