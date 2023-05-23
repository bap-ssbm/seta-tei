import { FC } from 'react'

interface HamburgProps {
  openMenu: boolean,
  setOpenMenu:Function
}

const Hamburg: FC<HamburgProps> = ({openMenu, setOpenMenu}) => {
  return (
    <div 
    onClick={()=>{
        setOpenMenu(!openMenu)
    }}
    id='nav-icon4' className={(openMenu&&'open') +(' w-[30px] h-[30px] fixed  right-5 md:hidden z-50')}>
        <span/>
        <span/>
        <span/>
    </div>
  )
}

export default Hamburg