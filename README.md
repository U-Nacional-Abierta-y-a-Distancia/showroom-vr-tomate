# Showroom VR · Cadena Productiva del Tomate (versión web)

Recurso educativo interactivo de la Universidad Nacional Abierta y a Distancia (UNAD) sobre la cadena productiva del tomate. Esta carpeta contiene el build WebGL listo para publicarse en GitHub Pages o en cualquier hosting estático.

## Cómo usarlo

Abra `index.html` desde un servidor web (no funciona con doble clic sobre el archivo). Requiere Chrome, Edge o Firefox actualizados con WebGL 2.

Controles en computador: W A S D o flechas para caminar, arrastrar con el mouse para mirar, Shift para correr, Espacio para saltar (doble salto en el aire), F para sentarse en las escaleras o la mesa, escalar los posteres caminando de frente y manteniendo W, Q y E para girar, clic en Play y Stop para escuchar las narraciones. En celulares y tabletas: palanca virtual a la izquierda para caminar, arrastrar a la derecha para mirar, botones Saltar, Correr y Sentarse, y tocar Play y Stop.

## Origen

Proyecto Unity 2021.3.21f1 con URP, migrado desde Spatial (plataforma cerrada el 27 de julio de 2026). El proyecto fuente vive en la carpeta `CadenaProductivaTomate_WebGL`; el build se genera con el menú `UNAD > 2. Build WebGL` o por línea de comandos con `-executeMethod WebGLMigration.SetupAndBuild`.

## Contenido

- `index.html`: página de carga en español, pantalla completa adaptable.
- `Build/`: datos, código WebAssembly y cargador de Unity (comprimidos con gzip y descompresión en el navegador, sin configuración de servidor).
- `TemplateData/`: icono.
- `.nojekyll`: evita que GitHub Pages procese los archivos con Jekyll.
