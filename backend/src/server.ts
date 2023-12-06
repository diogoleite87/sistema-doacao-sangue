import { collectionLocationRoutes } from "./routes/collectionlocation.routes";
import { bloodTypeRoutes } from "./routes/bloodtype.routes";
import { donationRoutes } from "./routes/donation.routes";
import { personRoutes } from "./routes/person.routes";
import { stateRoutes } from "./routes/state.routes";
import fastify, { FastifyInstance } from "fastify";
import { cityRoutes } from "./routes/city.routes";
import cors from '@fastify/cors'

const app: FastifyInstance = fastify();

await app.register(cors, {
    origin: '*'
})

app.register(personRoutes, {
    prefix: '/person'
})

app.register(stateRoutes, {
    prefix: '/state'
})

app.register(cityRoutes, {
    prefix: '/city'
})

app.register(bloodTypeRoutes, {
    prefix: '/blood-type'
})

app.register(donationRoutes, {
    prefix: '/donation'
})

app.register(collectionLocationRoutes, {
    prefix: '/collection-location'
})

app.listen({
    port: 3100,
}, () => console.log('Server Up!'))