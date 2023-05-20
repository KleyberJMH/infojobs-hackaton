# infojobs-hackaton
Proyecto para hackaton de infojobs de midudev.<br>
[Demo](https://infojobs-hackaton-kleyberjmh.vercel.app/)<br>
![](https://api.checklyhq.com/v1/badges/checks/8cf2ee2e-9908-4300-8bd5-fd07bcb14441?style=for-the-badge&theme=dark)

# Idea
Un generador de carta de presentaciòn de acuerdo a las habilidades del candidato y requerimientos de la oferta generado con IA (Cohere API).

# Roadmap
Mostrar lista de ofertas laborales.
Generar una carta de presentacion general para la oferta.
Generar una carta de presentacion personalizada con la informacion del candidato.

# Techstack
Nextjs. <br>
Tailwind. <br>
Tremor.

# Apis
Infojobs. <br>
Cohere.

# Install
- Clona el repositorio
- Instala dependencias
- Crea .env.local 
```
COHERE_URL="https://api.cohere.ai/generate"
COHERE_TOKEN="TU API KEY"
INFOJOBS_TOKEN="TU API KEY"
```
- Ejecuta npm run dev
