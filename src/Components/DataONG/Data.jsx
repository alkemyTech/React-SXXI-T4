import React from 'react'
import './Data.css'

const Data = () => {
    return (
        <div className="dataOrganization">
            <h1>¿Quiénes somos?</h1>
            <div className="dataOrganizationContent">

                <div className='dataImg'>
                    <img src="/images/blog-img-03.jpg" alt="" />
                </div>

                <div className="dataText">
                    <h3>¿Quiénes somos?</h3>
                    <p>Somos una ONG que tiene como principal objetivo promover la inclusión social de los sectores más vulnerables de la Argentina.
                        El trabajo es realizado por un gran número de voluntarios mediante un abordaje integral que incluye la asistencia, la contención, la capacitación, la educación y la cultura del trabajo.
                        Quienes formamos Sí creemos en el trabajo de igual a igual, en el trabajo en equipo, en la heterogeneidad de los grupos, en la complementación y en las nuevas generaciones.
                        Quienes formamos Sí estamos convencidos de que transformar la realidad es posible y, para lograrlo, necesitamos el compromiso de todos.
                    </p>
                </div>
            </div>


            <div className="dataOrganizationContent">

                <div className="dataText font-bold">
                    <h3>Accesibilidad</h3>
                    <p>
                        Nuestro objetivo es que sea accesible para todas las personas sin distinguir su edad, sus capacidades, su conocimiento de Internet, la velocidad de su conexión ni el dispositivo que utiliza para navegar (computadora, tableta, celular económico o smartphone). Para ello, nos manejamos con los Estándares Web actuales.
                        Además, queremos que sea compatible con la mayor cantidad de navegadores de Internet (varias versiones de Explorer, Chrome, Firefox, Safari, Edge, entre otros) y con las herramientas que utilizan las personas con disminución visual.
                        Escribimos los textos de modo claro para una fácil comprensión, sin palabras extrañas o innecesariamente difíciles.
                        Si tenés algún problema para encontrar información o navegar en el sitio, ves algún error o te parece que algo no está bien explicado, avisanos para que podamos corregirlo. Queremos que Argentina.gob.ar sea fácil de usar y te resulte una herramienta útil.
                    </p>
                </div>
                <div className='dataImg'>
                    <img src="/images/blog-img-04.jpg" alt="" />
                </div>
            </div>


            <div className="dataOrganizationEdit">
                <h3>¿Deseas editar la información de tu ONG?</h3>
                <a href="">Haz click aquí</a>
            </div>
        </div>
    )
}

export default Data