import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi"
const Navbar = ({name, log}) => {
    const [isLog, setIsLog] = useState(log)
    const [open, setOpen] = useState(false)

    const menuArr = [
        {
            name: "Inicio",
            link: "/",
            id: 0,
            img: <img className='max-w-[20px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAApVJREFUSEt1lm25GkEMhd8oAAeXKigOCgraKoA6qAPAwZUACtoqAAlIuHVAFaRP5msz2dn9tbsz+TonOTNCfQTQ/GGv9pTP8rNs6H4262xka86PW20+pwht84JF9SUgWpJZci6gmmNLzH7ZfUlWeEd5A34Ar1jCkn2Ok7ITtAdrhMMVOBRIniB70JeHKELvER3RNPrng9T1J7DPlfVkCznxEKgvePpqb1eBQ+mDG/AOPBBWKINgPeUVtL6/5i3nK7mBHEsLbAUeCiuQJ2iorAe0uo0wl2+5glZObgjHQON2qqwPFjFqgboFaw64qjbiDa7jwsxt1WBMlfFE2KOeswbjsCETXCWLmxpcbWjmMynQB4O9wKuOpO9Eb31FOGS/cgMdVhKnXiHBKLBSqyx0Y+TIES9/QL/N+sc1i027Tb57bP+v0Zz5QGfg5IwugP2bQK6S4zaFJt0Bd7fcKvOBfgNfXQUhUNmaKhgoa6JadqA+kG3+BHwkrStmazLOxskB4SLKWfOGTal2E6TdFME60pI0yfKB9ggvUXlWhYiTdUYThLmiTMSHwNv4hEiZfC/BdiB3p+ndRES+K1cVuoa7wCUEs7UvLSnwHHWNNhrYFKg4tfcdwr3gW6BugJek5AKa907N0PlOGmA66yieVSRwL8Nn4+WfM8IJLTDDTkpS5bxLR435z2Ljpj7z0hvXLPPm2jypKpeUnEV0p9rauxVRk4yHfaio6yRLb7oWqJxBT9ahaJq5eTMUlAuO7ssMIhwFOodyhW/OkeMzylS89VTj8bVmqMHu1M9M/AXZTHzmkzY+a4SHKJ+XblYDGz8v/xR+AqabnYKNJcVUQli3u54IGhS0czPJkunb4oVlLJwRpng6LmrevOb/eZkQL2azMiwAAAAASUVORK5CYII=" />
        },
        {
            name: "Nosotros",
            link: "/staff",
            id: 1,
            img: <img className='max-w-[20px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAA21JREFUSEt9lrFuU0EQRc8tguhiqCiQYnokHPEBIR0FEggaRJPQIFGRPyD5gkAHooipEBISQXxAnIYOxX8Qp6M04gMGze7svn0vhm1sP8/u3Llz5+4TgADzL+1KD4VkmPVj4q9uU3NA76zB8+74SxsEshUoVqKqD7tj+t8i4L+wxsBDYCIYe/VR1QzjGzAfph5m9fi0JPoU5bxjxBHGvRW8Nkxogdm+4GMFMWhITVQzddv3gMMG2QXGMbBskk6i0vJojtjGejG5kKgHYZ0gxFTGTgjkFNhHmskipq+eUfofXkW2BbANWuT+5uCaqOl4W8lbYK+nuX/pQ0wwZsC690xo21L1Ga4GVHrTzwNZJLks+yrEtrLcZBfLzMQ6Rm+/iggioSPaApyuTgBlcJoMPl8ONphpp7EyInHLDKcyUxfAXGHnUek2JBqKJm+A/SoUlG4G71cN1oA/TfxCsg1rqvKCigi8F4dgF4hxAL4C/JC4a8Y74KWjagq7j/EVuIp4hvEpUEdVmoNtpg55kwLhFNiBjlvBA4PvTZdSTxuzeA+8CE6+gh4n2HLadZIGM3TQbNRM2JbBQcjVg64DPwEXyWfE0+R/iQU/UE8w+xIPXiA+NP4Y06FbYItmYJlh2hJ2YHkuynL+byPOEnKrM5EoF9w0tAZ23ik4QSk+nfrdJcrNd8VFRSs9Pc1DJqQnucEMJAbKmGTWqrxzFa8hmeSjwU5X5CLT5qSVdOnXKNS/bLS+CxwhfmO4c2Q5hOwmYGeR4Fp4mgcdReLngAumXY7cVedx/n8aCcHUYCdM1pMWC6rzshC2YUl52gsEfgXcSaGy47CZJcgH+hHYKJDfU74uJob3M606j3WOwvp2kfm14Bg2hc0to21Ns1+TcFd3qudII8xOSL6nUzCXeWeqg7ZHBSwFbozlUvMrwWnwT19+XRwjpgFsBObXSqIK8EH1gU0/moGt6bwCv1c2ZCxN7IdB5g3FSfroPLn3soCo/Syyzp+D61VoDHZs3pt8oBvjG8Qc4zSeuRB8HLw3u+UyCFFMXf7t60b0qJn2rgOD3qyeqy489cQ9buX7Q1TUOWs5rpkvR76X/Mtcfb31O/UJppJmVs2gJTnE8C+cjdk2oOOFJVNbZqaZ0wGMyOcUthZUG91L/h/G3FaSudbbL4JX7PkLRv1mL8kvteIAAAAASUVORK5CYII=" />
        },
        {
            name: "Novedades",
            link: "/news",
            id: 2,
            img: <img className='max-w-[20px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAo1JREFUSEudlg2R2zAQhb+FUARNEXSKIDGCQuhBOAaJIZRBIRwEh0HK4Mogh2A7q13Jkmzlbi6TjB3J0tuf954spI/4BY1re7HZNFNu8nw90E/G/3Jp5jc77QJvB33do9VSkikJDR5Pw22UK+DOmq4MuWZ5zRPwqx7Me1tAoqPi1jla7Gr53UB/A691c+z+gnC2ZmwK8YmKiq95VfjWAgkLyhG4Yvd73HgIGCnndRE08AO4lSoJLEoCmi27vOeGVzVBh8BpIlN4AhYLI2qasihAwAH4OqDdX+COcEDjGQd9s+ij9j1Q2cqBhBm1fskF1fMAKEWZ+oqcK4pcgVNI0xhheUyoWEYtkMCsaYP02wC5HnTSABI4FzHDVZRTpBKElQl0CwQyg7ZAqc9O2mBQBnK76Hnv4WsMrz2K1BeEI8qMcEnl22SUWmr7TpqiDPBazGuFtmQoQC0Ziq56BxBhUvUeWekqJZg0TpF49qScUTZLWUCPo9IVV/V6VGRY+yjCVTXIkBmSyMDiAvaKLOqCnUEuoEbvQyuVIsqbKHd1CdgvG+o90dv/VRltWCdH0CTY2oqH3lz1pvPQ2lcmSyLondraOEPowTJ897yqJPIP+BMrNPg9maVVOso9cgvyRsvZH64PxLWYOw60Cta46V8HqjwtZVQEKzyh2LEx/NjiJga3n+c4AfJUz7qN11UAO046PJ8KYbK+JzAyrPm3prpTl35oJ6O1pauNOL0roBeBn6UbsevHzryHT30xp3cFuRoPIC+g33PN3on4Ufts7k2EZ9XMwv6EGwTXglYPDTzVT4j1ACk6Sq9LImhHozrsDJZUt+PY25eXVgodu6JLOQSztpp0O5GWw2M9RsqbWd78PwUhMTG7x5pwAAAAAElFTkSuQmCC" />
        },
        {
            name: "Testimonios",
            link: "/testimonials",
            id: 3,
            img: <img className='max-w-[20px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAoZJREFUSEuFlm15GzEQhN9h4CJoyiAMbCNoyiAMEga5IGiKoGVQh4HNIEHQhIEZbJ/V10knnX3+c89JmtmdnV1ZAALMX9IjCbP6S7VLAl9bHspnHWuxJvzXPSsI/cZBiCXUJnRH9PjKE3OoiMQd8NCkOyRsPyaEM/AMvDnkzFPwy8sN8C9CdOK2Yq+KoLNkX7LSazi3oLu2enXkPXr8ok1QQZaOai/sOKhRnUACu1C2Fbp74HcKaw84Ub1VN2DfgU2IIBlsKF+9QZwxvQIfcyalspmoyOGF/zuDOo+5FAvzzxknqdK+cPIHcEiIuT+WRDqCbUGfYB9DD4x8EVHdOF+BE7C7QhR03LolDaZgyVDPHHd8j1l2zwQ8IZ0wdulg7upOuiOJCCe62sizpILJ0BPYtYzCoSNoC+ZNNo1jb4yTU/aQUkbEjLKP4va9UGPvhigq1g2tpq2q1Y5odlDuozwkyWYIY2PKts9gjVBB1saPk+DJxmb45ravGra47hks1mih1IWZFzOqiLwFQa+Geds00ztJ5xklooXjLoyjCawhcpsLjtmh9Qhqa5Rdl3eEE6uzqMuomDaVZkHEFnHEXMZQh0/gT+X0HQq9trgp3WnaYY29G/Xj1RfzexE8+GuVRO6LDeInxv1aVgnmF9KjbG7qYqZqXm1Ak2G3ZaQo9MUhOcrHv4fxDpwXrvOFt9RPfuG1T3PxtUtZ84Qdsv4EPSI7ZPeNKzbuvTzsl85ticKVrBewLtpVe6SF8l9mOGrEhHlf6ATml1ic5sV3ZeJ2Eq31Wu262r4OfkYUmTrdRx9q/mqk+GtxXX0ZzBh9vkWqBFqcfklD2fx3a3DHVM5fRRknWkeTtPwPo48WNuOMV1wAAAAASUVORK5CYII=" />
        },
        {
            name: "Contacto",
            link: "/contacto",
            id: 4,
            img: <img className='max-w-[20px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAp1JREFUSEuNlv9d20AMxb+aoNmgbECYADxBGSFMUJiAZILABKQTQCcgbOCO0A3CBOpHdzpbd7ZD75/Etqwf7z1JFpaOALr4ND8oNgu2dtuOSjLNViKgxfG5IK3zOVsRRLXKswStUq+ChifnixQEd54cWAn52t6bDXQWsAEPtzJMHIka6TqtNtAG4XusOeVpnoKXuYqj28DNM8qp0FkK2AKPkeOK8LGALzUSEOmBqzbQEbgGPgD7T0C95rAoyQud504eM1FyhWo/QCdw1BzIsuhATpHcWkVOTGE6wWppmZTVfu9V2buiO/M9yNursEBmeNIcrM/kLOTslQUsV8ALcFteEaRT1AINp0AX2bgHnluuFmS+FnhRWI8uk2WHpIomgczxDXDpTw7AA2T1NE48B9kougesok/A1PuaK5WOhYp2gCnwCfjpUPYKdyLYbzuaBjvgjwgbVfrQFZ3R0lQk16A7Qbbe45scUL6J6AmVO9A3536F8s4I1S+Qe9BSuY04K2oM5DcSRwI7zRWVswY5IHrppFsFvwVeFVbevA8CT2NPJ4/TQO6xiCFB1xC+Ejgo/IjCEPhU5AbRfjJBy0wV6dCiujRtOaroNYpzNNeuCZq9N8wH6K31W060qWe8ETlK+Q8VCWwnr41QmiLXCE/TFouUl6UTVZdxGqETtnlbhWGa2/4/tuGQkef6pbybQG3X1k01XIUtUosh5FgqOpjK8pxrh3+725fGboqbBrPNTZ913pLoG0VVTbYVYEsX86jalLiw2ZkqdfgvUGzcpMEaT8l7acXPoij8RVM/ms+vVrmnGYUwI4psNeV0busuLIJprhOEKkUHKTTLJZgNeU1bb0FhLcD+6eOLNXy+RejOdUiVgkM3bN+azGFPitYW/wAuSiMw7V5NyAAAAABJRU5ErkJggg==" />
        },
        {
            name: "Contribuye",
            link: "",
            id: 5,
            img: <img className='max-w-[20px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAuxJREFUSEuFlo1xEzEQhb+tgHRAqACowE4FQAVQglOBzxUkqYCkAzqIqYB0QKiAdCDmrVbS3k8Gz3h8J2l/3tu3KxuAASX9aq2uG8UKVur+WIciI1n6xrZ1tvLjw4MMSwRu4ecRFLS5jmxWcdaWSnmcvsV4P/eSdjP0zsE2Heb5Oh8U7Bp4yojOwE6HxESmqpIbOFbpGpnbdLKlcwV2rpiq12/AJbA32BX4aXAWkTWzqNm6Wpl82X+NhVOQdU/heV6jGnUCjsDJYFoji5UEJIHcYzxGLjPf/SUd7oHApgZ3tl8hPgDPrYqB+v+BEv4UCD0n8rgA/sbZLxg/FtLfY/Yo5YZR753WDVJHK9ZkxrEUxPEUqxcGxwKH1EsvBbsF7ozyElJRfR+9noYpXtZ16iOPVREZp3jW/g/gU8tlITzJVwG1vScCjRCjRUa/VkxCcQQ76RmKlPQ7nHenCJ1xQ+EJ+BhOOqJOXWzMxFDhSwAKVJw64APwK6R6ReGcZ5Yn0KVpe6y46kKUr1BXozuiIuoUyIdaUdZ1atSP1Kav1nXOa6QeFHVjSs7n6HiLQK2PsB5I9N2D7VzGwWP8KMg7g5fSAwX+pJw86yoj7rzWKJo3i+WSYpfRW6rHocAb4BpzQewpDZEG02h3UdlnUHicMI6EvMF7R7KW1V2iSZbnArtKnzd3UDcQ5SsoUV9r1Kmrz1LqM5S3URdJXXTJqb76ePNSRo3ajdWA1GHdcFWkE1ioro8gKU/TXTT1dKNWQnmIzFeIPM36nY/5bUTuWxR+Br6H0wd8MrgiW+Lb1AWQRZkchU9vD7osoXGOGh/Anrx048wriOKG7efqw0aNRspZgvX4uDa8RstrIrXCQgwJkTHl6ZwVNL+nOqgNRNVqdjlFuRzR0lGSwJLq6siM0se1W6ebYeMlroKbOcxFoVatl6Xoz3/ib0HXyRzR8C45S2WrTzPYRtyPqxVyOdfULf7+vAJsPuz6odSPozL19vsHOrwvN2zf1HMAAAAASUVORK5CYII=" />
        }
    ]

    return (
        <header>
            <nav className="hidden lg:w-full bg-white sticky top-0 z-50 h-[80px] md:flex justify-between pl-5 pr-5 align-middle shadow-md shadow-gray-400">
                <img src="images/assets/LOGO-SOMOSMAS.png" className="w-full md:w-1/4 object-contain " onError={
                    (e) => {
                        e.currentTarget.src = "images/assets/404.png"
                    }
                } />
                <ul className="md:flex justify-around text-sm hidden align-middle w-full md:text-sm lg:w-3/4 xl:w-1/2">
                    {
                        menuArr.map(x => (
                            <li key={x.id} className="grid place-content-center hover:text-red-700">
                                <Link to={x.link}>
                                    {x.name}
                                </Link>
                            </li>

                        ))
                    }
                    {isLog === true ?

                        <button onClick={(e) => setIsLog(false)} className="flex justify-center items-center py-4 text-red-600 col-span-3"> <BiLogOut />Cerrar sesión</button>
                        :
                        <div className='flex'>
                            <li className="grid place-content-center">
                                <Link to="/login-user" className="bg-slate-200 hover:bg-slate-300 text-black px-4 py-2 hover:scale-95 transition mr-4 rounded">Ingresar</Link>
                            </li>
                            <li className="grid place-content-center">
                                <Link to="/register-user" className="bg-red-600 hover:bg-red-700 px-4 py-2 hover:scale-95 transition  text-white rounded">
                                    Registrarse
                                </Link>
                            </li>
                        </div>
                    }
                </ul>
            </nav>

            <nav className=''>
                <div className="md:hidden bg-white flex justify-between pl-4 pr-4 pt-4 shadow-sm py-2 shadow-gray-200">

                    {isLog === true ?
                        <h3> Bienvenido, {name}  </h3>
                        :
                        <div className='flex'>
                            <li className="grid place-content-center">
                                <Link to="/login-user" className="bg-slate-100 hover:bg-slate-300 text-black px-1 py-1 mr-3 rounded">Ingresar</Link>
                            </li>
                            <li className="grid place-content-center">
                                <Link to="/register-user" className="bg-red-600 hover:bg-red-700 px-1 py-1 text-white rounded">
                                    Registrarse
                                </Link>
                            </li>
                        </div>
                    }

                    {
                        open ?
                            <img onClick={(e) => setOpen(!open)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAlxJREFUSEuFloFtGzEMRR8n8AhNN3BH8ARBJ3Buoo5Qj5ARPIJHyAjOBCwoUTqK0rkBHB1wEj/5+T91gv8JAijqK321J0HLvvq/7hyfWpxp9c22DEfX5/fQAWWPGYL1REVAazoVoWwadg6xpuwFRK1CD5lyWNXdSgmojZJITyaxEjxVXhLYz+f3Tl06V8o+ym0nwzaFgiDRFaMWoIbWGjy2PrS3Rc1r6EOvNqnCCu4aWja6BfEiCz1DGUs5jTCOcqhM4CzwR4XfKM+s/CCUG+gduI3EjsJcK7ru+QJ+gDwQvRSwmSYLfnXQn+XM2IvSukEM0ZouhTPCHeUk8FC4QAMroQuIn9usot05zZ41hRGoSbRzUmbCGbgrcgJ9INTKpNB0reqUDdGbPQ++E+2SH8Ww6lY9WcCAE/Dw34crdtMXvYk9SyOoTjZLNA4NE0YAa+c3RG5x1MRcO2lWWVeCN2Wh3F0swifKu/PzBLkYnaOt1hF6j0ZTx80tF7VGXz3jb4GTijxF9aKVzoWzF/J+pXH3RwPZEB5o65k8QS+uyvkm6HaYEHY5+kgyMzafFAm7K85uUhOI+cuknyr7b0Wdum5GYFPEQCNHLpAifQP7VU0uiCgaZlUybBagfKD610CKbwaMjtfU+AkUyS9dcqSyoP83raOou3EwZUV/E/jqeRwM3fQV0FwUIh8b+SD9eiGM2p3Qj2s8fOPXe7l7l5dfAZ2PLwO+4Pg1/WmoTomEwRqnb52hMzXZrrYnfATlinJuqy+O3Ls8RdJ3RDfsvK++OuA6X2pBnfsg7rnswf8Bx1AHLrYq160AAAAASUVORK5CYII=" />
                            :
                            <img onClick={(e) => setOpen(!open)} className="hover:cursor-pointer hover:scale-95 md:hidden" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAdRJREFUSEuNVomRAyEMkzu5TrKlpJNsOrvOuAMbkM23mckkAS+WbMlEwC8RICW3BAFAS+Enxa538hl5t7zqF04jEKScZZaM1sZnbbN9CDIHBczRZXGDMGZmtKEgkYhlsigqYWElSdHMchvAGuJyMusj7l2A66+VxpXUSo8Ml3q0YE1UYlb/W49Lruq6Enuk5bkk4dX6VrMvmPFyCPlGwl7OwA3gwyJx9Z8mbPps7LOie4XyvpNd2XoD8nbmaVB6lpnlAuIrso2Mmq9czwYme4NWz3Q5+NGgBEutYqPXCh+QBjPno6h0MXxlmuq17vSKOmCm6pO8aRDdQPr0hyYJrUEHizXr6OCJ40ZwI5HqbDx15ameJHUeLqH9qKqreyVrQPYDIL+3pMpEpmQTRf0ufTSWgrtq37fDtsOO0pbRah7boQ9qhXyN5c82e8frha6kpqYLCa9opsVAGHxNcTqCTBJOGcaljKB9g7ixEUI9stS4MZ4letsY6nf4Ax1PrqvLi2F3iGk0DYPtwfhpXtN+KaMjYrtlc+zh2hh0131leZyzzv98OrY1yijx4DXd5rxK4onQJ7a1Z7sYxpPt6KpPM0mwe3nsaGL6X1cBP8a9CJxOl38n/wEcUMUpNbvs8gAAAABJRU5ErkJggg==" />


                    }

                </div>

                {open && <div className='md:hidden grid grid-cols-3 shadow-md shadow-gray-400'>
                    {
                        menuArr.map(x => (
                            <li key={x.id} className='grid place-content-center hover:text-red-700 p-4'>
                                <Link className='grid place-content-center' to={x.link}>
                                    <div className=' grid place-content-center'>{x.img}</div>
                                    <p className='items-place-center font-light text-sm'>{x.name}</p>
                                </Link>
                            </li>

                        ))
                    }
                    {(isLog) &&
                        <button onClick={(e) => setIsLog(false)} className="flex w-full justify-center items-center py-4 text-red-600 col-span-3"> <BiLogOut />Cerrar sesión</button>
                    }
                </div>
                }
            </nav>



        </header>
    )
}

export default Navbar