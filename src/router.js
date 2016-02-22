import express from 'express';
import controllers from './controllers';

const router = express.Router();

router.get('/twitter-feed', controllers.twitter);

export default router;
