import { checkDBConnection } from "../config/db.config.js";

export async function healthCheck(req, res) {
    const dbOk = await checkDBConnection();

    const status = {
        server: 'running',
        database: dbOk ? 'ok' : 'unavailable',
        timestamp: new Date().toISOString()
    };

    const httpStatus = dbOk ? 200 : 503;
    res.status(httpStatus).json(status);
}