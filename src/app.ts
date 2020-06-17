import { Application } from 'https://deno.land/x/oak/mod.ts';
import errorMiddleware from './middlewares/error.ts';
import getEnvironmentValues from './utils/getEnvironmentValues.ts';
import notFound from './routes/handlers/notFound.ts';
import addressRouter from './routes/addressRouter.ts';

const { PORT, URL } = getEnvironmentValues();
const router = addressRouter();

const app = new Application();
const port = parseInt(PORT) || 2000;
app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

console.log(`Listening on ${URL}...`);
await app.listen({ port });
