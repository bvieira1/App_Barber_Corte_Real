import { Router } from 'express';

// CUSTOM IMPORTS
import appointsmentRouter from '@modules/appointments/infra/http/routes/appointment.routes.ts';
import usersRouter from '@modules/users/infra/http/routes/users.routes.ts';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
const routes = Router();

// Use appointmentsRouter to call all request with /appointments as
// default path
routes.use('/appointments', appointsmentRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
