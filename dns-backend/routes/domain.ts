import express from 'express';
import { listDomains, createHostedZone, deleteHostedZone } from '../controllers/domain-controller';
const router = express.Router();

router.get('/domain', listDomains);
router.post('/create-domain', createHostedZone);
router.delete('/delete-domain/:zoneId', deleteHostedZone);
export default router;