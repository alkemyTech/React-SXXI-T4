import React from 'react'
import img from "Assets/images/404bg.jpg"
import { Link } from 'react-router-dom'
const Error404 = () => {

  const style = {
    background: `url(${img})`
  }

  return (
    <div style={style} className="w-full h-full flex flex-col justify-center items-center">
      <div className="bg-black bg-opacity-60 w-full h-full titulo flex flex-col justify-center items-center">
        <h1 className="text-white font-poppins text-8xl">404</h1>
        <h1 className="text-white font-poppins text-5xl">ERROR</h1>
        <h1 className="font-poppins text-white mt-10">PÁGINA NO ENCONTRADA</h1>
        <Link  to="/" className="bg-sky-400 rounded py-5 px-20 text-white font-poppins hover:scale-95 transition-all">
          VOLVER A INICIO
        </Link>
      </div>        
    </div>
  )
}

export default Error404