import React, { FC, HtmlHTMLAttributes } from 'react'

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: FC<ButtonProps> = ({ children,  ...props }) => {

  
  return (

      <button {...props} className={('font-semibold hover:scale-105 grid place-content-center relative duration-500 ') + props.className}>
        
        <div className='relative w-fit items-center justify-center gap-2 flex'>
        {children}
        <img className='absolute bottom-[-5px] left-[-35px]' src='/images/underline-curve.png'/>
        </div>
        
        
      </button>
 

  )
}

export default Button