import * as expressive from 'https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts';
import getEnvironmentValues from './utils/getEnvironmentValues.ts';

const { PORT } = getEnvironmentValues();

const port = PORT || 2000;
// const app = new expressive.App();
// app.use(expressive.simpleLog());
// app.use(expressive.static_("./public"));
// app.use(expressive.bodyParser.json());
// app.get("/routes/url", async (req: any, res: any) => {
//   await res.json([{ name: "Buy some milk" }]);
// });
// // route with dynamic parameter
// app.get("/routes/url/{user_id}", async (req: any, res: any) => {
//   await res.json([
//     { id: req.params.user_id, name: "Jim Doe", phone: "12425323" },
//   ]);
// });
// const server = await app.listen(port);
