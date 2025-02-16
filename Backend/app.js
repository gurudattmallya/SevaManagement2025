import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import entityRouter from './routes/entity.js';
import deitiesRouter from "./routes/deities.js";
import masterSevasRoutes from './routes/masterSevas.js';
import specialSevasRouter from "./routes/specialSevas.js";
import subSevasRouter from "./routes/subSevas.js"; // Added SubSevas router
import entityDescRouter from './routes/entityDesc.js';
import sevaRoutes from "./routes/sevas.js";
import deities1Routes from "./routes/deities1.js";
import devoteeRoutes from './routes/DevoteeForm.routes.js';
import panchangaRouter from './routes/panchanga.js';
import maasaRouter from './routes/maasa.js';
import tithiRouter from './routes/tithi.js';
import shashwathSevaRouter from './routes/shashwathSeva.routes.js';
import entityRouter1 from './routes/entity.routes.js';
import sevadharRouter from './routes/sevadhar.js';
import shashwathRouter from './routes/shash.js';
import nityanidhiRouter from './routes/nitya.js';
import otherSevaRouter from './routes/other.js';
import statsRouter from './routes/stat.js';
import reportsRouter from './routes/reports.js';
import receiptPaymentRoutes from './routes/receiptPayment.routes.js';
import scannerRoutes from './routes/scanner.js';
import rolesRouter from './routes/roles.js';
import pagesRouter from './routes/pages.js';
import tusers from './routes/tusers.js';
import uploadRoutes from "./routes/upload.routes.js";
import sevadharReportRouter from "./routes/sevadharReport.js";

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cors({
    origin: '*',
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/deities", deitiesRouter);
app.use('/entity', entityRouter);
app.use('/masterSevas', masterSevasRoutes);
app.use("/special-sevas", specialSevasRouter);
app.use("/sub-sevas", subSevasRouter); // Added SubSevas route
app.use('/entityDesc', entityDescRouter);
app.use("/api", sevaRoutes);
app.use("/deities1", deities1Routes);
app.use('/api/devotee', devoteeRoutes);
app.use('/api/shashwath', shashwathRouter);
app.use('/panchanga', panchangaRouter);
app.use('/maasa', maasaRouter);
app.use('/tithi', tithiRouter);
app.use('/shashwath-seva', shashwathSevaRouter);
app.use('/entity', entityRouter1);
app.use('/api/sevadhar', sevadharRouter);
app.use('/api/nityanidhi', nityanidhiRouter);
app.use('/api/other', otherSevaRouter);
app.use('/api/stats', statsRouter);
app.use('/api', receiptPaymentRoutes);
app.use('/api/reports', reportsRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/scanner', scannerRoutes);
app.use('/api/pages', pagesRouter);
app.use('/api/tusers', tusers);
app.use("/api/reports/sevadhar", sevadharReportRouter);
app.use("/", uploadRoutes);
app.listen(2002, () => {
    console.log('Server running on port 2002');
});

export default app;














