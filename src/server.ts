import app from "./app";
import { config } from "./config";

app.listen(config.port, () => {
	console.log(`Servidor escuchando en http://localhost:${config.port}`);
});
