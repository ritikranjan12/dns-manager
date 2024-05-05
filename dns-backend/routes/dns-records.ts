import express from 'express';
import { listDnsRecords, createDnsRecords, updateDnsRecords, deleteDnsRecords } from '../controllers/dns-records-controller';
const router = express.Router();

router.get('/dns-record/:zone_id', listDnsRecords);
router.post('/dns-record', createDnsRecords);
router.put('/dns-record', updateDnsRecords);
router.delete('/dns-record/:zone_id', deleteDnsRecords);

export default router;