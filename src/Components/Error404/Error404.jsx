import React from 'react'
import img from "Assets/images/404bg.jpg"
import { Link } from 'react-router-dom'
import somosMas from "Assets/images/LOGO-SOMOSMAS.png"
const Error404 = () => {

  const style = {
    background: `url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }

  return (
    <div style={style} className="w-full select-none h-full flex flex-col justify-center items-center">
      <div className="bg-black bg-opacity-60 w-full h-full titulo flex flex-col justify-center items-center">
        <h1 className="text-white font-poppins text-5xl text-center">ERROR</h1>
        <h1 className="text-white font-poppins text-8xl text-center">404</h1>        
        <h1 className="font-poppins text-white mt-10">PÁGINA NO ENCONTRADA</h1>
        <Link to="/" className="bg-sky-200 flex flex-col items-center justify-center rounded py-5 px-20 text-slate-700 font-poppins hover:scale-95 transition-all">
          VOLVER A INICIO
        </Link>
        <img src={somosMas} className="w-[90px] absolute bottom-2 md:left-3 rounded bg-white bg-opacity-30" alt="" />
      </div>
    </div>
  )
}

export default Error404