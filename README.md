# Hackaton Infojobs 2023
Proyecto para hackaton de infojobs de midudev.<br>

![](https://api.checklyhq.com/v1/badges/checks/8cf2ee2e-9908-4300-8bd5-fd07bcb14441?style=for-the-badge&theme=dark) <br><br>
[![](https://img.shields.io/badge/-Demo-lightgreen?style=for-the-badge&theme=dark)](https://infojobs-hackaton-kleyberjmh.vercel.app/)

## Idea 💡
Cómo usuario recurrente de infojobs he tenido el problema de no saber que escribir en las cartas de presentación que envío conjunto a mi CV, muchas veces ni siquiera adjunto una presentación, lo cual disminuye la posibilidad de llamar la atención de los reclutadores, por lo que decidí crear un generador de carta de presentaciòn de acuerdo a las habilidades del candidato y requerimientos de la oferta generado con IA (Cohere API).

## Roadmap 📆
- ✅ Mostrar lista de ofertas laborales.<br>
- ✅ Generar una carta de presentacion general para la oferta (en inglés).<br>
- ✅ Agregar boton de copiado rapido "Copy on clipboard".<br>
- ✅ Agregar búsqueda y filtro para encontrar mejor la oferta que busco.<br>
- ❗ Generar una carta de presentacion personalizada con la informacion del candidato.<br>
- ❗ Traducir el resultado de la carta de presentación a español.<br>
- ❗ Mejorar el prompt para que genere mejores cartas.<br>
- ❗ Agregar paginación.

## Techstack 🚀
Nextjs. <br>
Tailwind. <br>
Tremor.

## Apis ⚡
Infojobs. <br>
Cohere.<br>

## Install ⚙️
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
COHERE_TOKEN="TU API KEY"
INFOJOBS_TOKEN="TU API KEY"
```
- Ejecuta servidor en modo desarrollo
```
npm run dev
```
