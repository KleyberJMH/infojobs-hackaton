# Hackaton Infojobs 2023
![](https://api.checklyhq.com/v1/badges/checks/d94b200b-8628-4f99-894f-e2dcf907f872?style=for-the-badge&theme=dark) <br><br>
[![](https://img.shields.io/badge/-Demo-lightgreen?style=for-the-badge&theme=dark)](https://infojobs-hackaton-kleyberjmh.vercel.app/)

Proyecto para la hackaton de infojobs y midudev.<br>
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
- ❗ Generar una carta de presentacion personalizada con la informacion del candidato.<br>
- ❗ Traducir el resultado de la carta de presentación a español.<br>
- ❗ Agregar paginación.

## Tecnologias utilizadas🚀
- NextJs. <br>
- Tailwind CSS. <br>
- Tremor.<br>
- API Infojobs. <br>
- SDK Cohere.<br>
- NextAuth. <br>
- InfoJobs NextAuth Provider. <br>
- API Microsoft Translate.

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
SCOPES="CANDIDATE_PROFILE_WITH_EMAIL,CV,CANDIDATE_READ_CURRICULUM_EXPERIENCE"
REDIRECT_URI="TU CALLBACK URL"
NEXTAUTH_SECRET="TU CLIENT SECRET DE INFOJOBS"
INFOJOBS_SECRET="TU CLIENT SECRET DE INFOJOBS"
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
Sobretodo a 2 personas que han estado desde el inicio @NoHaxito y @Rodri.dev son lo máximo chicos ✌🏼 a seguir moviendo las manitas ⚡
