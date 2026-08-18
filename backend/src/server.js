import "./config/env.config.js"
import app from "./app.js";
import { checkDBConnection } from "./config/db.config.js"

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    const ok = await checkDBConnection();
    if (!ok) {
        console.error("Failed to connect to database. Server will not start.");
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

startServer();