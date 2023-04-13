import React from 'react'
interface ButtonProps {
    children: React.ReactNode,
    onClick: () => void,
}
function Button({children, onClick}: ButtonProps) {
  return (
    <div 
    onClick={onClick}
    className='py-2 px-4 rounded mt-2 mx-auto text-white focus:ring-2 bg-sky-500 hover:bg-sky-600 w-fit'>   
        {children}
    </div>
  )
}

export default Button