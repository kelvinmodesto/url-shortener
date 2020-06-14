import * as expressive from 'https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts';
import getEnvironmentValues from './utils/getEnvironmentValues.ts';

const { PORT } = getEnvironmentValues();

const port = PORT || 2000;
// const app = new expressive.App();
// app.use(expressive.simpleLog());
// app.use(expressive.static_("./public"));
// app.use(expressive.bodyParser.json());
// const server = await app.listen(port);
