import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cord from'@fastify/cors' 
import { shortenController } from "./controllers/ShortenController";
const app = fastify();

app.register(cord,{
    origin:true,
    methods: ['GET','POST']
})// ADICIONAR O CORS


app.register(shortenController)
 // ADICIONA O CONTROLLER
app.listen({port:3333}).then(() => {
    console.log("Backend rodando na posta 3333!!!")
})