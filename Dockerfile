#Establezco imagen base
FROM node:18.1 

#Creo y establezco el directorio de mi contenido
WORKDIR /src

#Establezco variables de entorno
ENV DB_URI = mongodbatlas

