import express from 'express';
import cors from 'cors';
import corsOptions from './config/cors';
import controllers from './controllers';

const router = express.Router();

router.use(cors(corsOptions));
router.get('/twitter-feed', controllers.twitter);

export default router;
