import React from 'react'
interface ButtonProps {
    children: React.ReactNode,
    onClick: () => void,
}
function Button({children, onClick}: ButtonProps) {
  return (
    <div 
    onClick={onClick}
    className='py-2 px-4 rounded mt-2 mx-auto flex justify-center text-white focus:ring-2 bg-sky-600 hover:bg-sky-500 w-full'>   
        {children}
    </div>
  )
}

export default Button