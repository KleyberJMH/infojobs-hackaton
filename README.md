### Nota importante
Actualmente la Demo no está funcionando ya que la API Key fue eliminada o desactivada, no se han realizado cambios por lo que si la API de Infojobs sigue trabajando igual y puede obtener una API Key nueva debería de funcionar sin problemas.

# Hackathon Infojobs 2023
![](https://api.checklyhq.com/v1/badges/checks/d94b200b-8628-4f99-894f-e2dcf907f872?style=for-the-badge&theme=dark) <br><br>
[![](https://img.shields.io/badge/-Demo-lightgreen?style=for-the-badge&theme=dark)](https://infojobs-hackaton-kleyberjmh.vercel.app/)

Uno de los 15 proyectos seleccionados por infojobs para la hackathon.<br>
## Tabla de contenido
 - Idea
 - Lista de tareas
 - Tecnologías usadas
 - Instalacion
 - Agradecimientos

## Idea💡
Cómo usuario recurrente de infojobs he tenido el problema de no saber que escribir en las cartas de presentación que envío conjunto a mi CV, muchas veces ni siquiera adjunto una presentación, lo cual disminuye la posibilidad de llamar la atención de los reclutadores, por lo que decidí crear un generador de carta de presentaciòn de acuerdo a las habilidades del candidato y requerimientos de la oferta generado con IA (Cohere API).

## Lista de tareas📆
- ✅ Mostrar lista de ofertas laborales.<br>
- ✅ Generar una carta de presentacion general para la oferta (en inglés).<br>
- ✅ Agregar boton de copiado rapido "Copy on clipboard".<br>
- ✅ Agregar búsqueda y filtro para encontrar mejor la oferta que busco.<br>
- ✅ Mejorar el prompt para que genere mejores cartas.<br>
- ✅ Generar una carta de presentacion personalizada con la informacion del candidato.<br>
- ⚠️ Traducir el resultado de la carta de presentación a español.<br>
<font size='1'>*Se intento hacer la traduccion pero las apis que se usaron no devolvian los valores esperados, por ese motivo se desistio la idea, pero usando OpenApi no se necesita traducir a español*</font> <br>
- ⚠️ Agregar paginación.<br>
<font size='1'>*Por motivos de tiempo la paginación se realizara post hackaton*</font><br>

## Tecnologias utilizadas🚀
- NextJs. <br>
- Tailwind CSS. <br>
- Tremor.<br>
- API Infojobs. <br>
- SDK Cohere.<br>
- NextAuth. <br>
- InfoJobs NextAuth Provider. <br>

## Instalacion⚙️
- Clona el repositorio.
```
git clone https://github.com/KleyberJMH/infojobs-hackaton
```
- Instala dependencias.
```
npm install
```
- Crea las variables de entorno ".env.local"
```
NODE_ENV="production"
SCOPES="CANDIDATE_PROFILE_WITH_EMAIL,CV,CANDIDATE_READ_CURRICULUM_SKILLS"
REDIRECT_URI="TU CALLBACK URL"
NEXTAUTH_SECRET="TU CLIENT SECRET DE INFOJOBS"
INFOJOBS_ID="TU CLIENT ID DE INFOJOBS"
INFOJOBS_TOKEN="TU API KEY"
COHERE_TOKEN="TU API KEY"
```
- Ejecuta servidor en modo desarrollo
```
npm run dev
```

## Agradecimientos💬
Muchas gracias a toda la comunidad de Midudev ya que sin ella no podría haber logrado este proyecto en tan poco tiempo.
Sobretodo a 2 personas que han estado desde el inicio [@NoHaxito](https://github.com/NoHaxito) y [@Rodri.dev](https://github.com/RodriDev23) son lo máximo chicos ✌🏼 a seguir moviendo las manitas ⚡
