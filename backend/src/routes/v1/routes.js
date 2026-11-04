import { Router } from 'express';
import { getAllLocations, searchLocations, getLocationById } from '../../controllers/locationController.js';
import { getGroundwaterByLocation } from '../../controllers/groundwaterController.js';
import { getWaterQualityByLocation } from '../../controllers/waterQualityController.js';
import { getLocationDashboard } from '../../controllers/dashboardController.js';
import { getHealthStatus, getStandards, getSources, getHealthGuidance, assistantChatPlaceholder } from '../../controllers/systemController.js';
import { getIngestionHistory, getQuarantinedRecords } from '../../controllers/ingestionController.js';
import { getLocationIntelligence } from '../../controllers/intelligenceController.js';
import { handleAssistantChat } from '../../controllers/assistantController.js';

const router = Router();

// System
router.get('/health', getHealthStatus);
router.get('/standards', getStandards);
router.get('/sources', getSources);
router.get('/health-guidance', getHealthGuidance);

// Locations
router.get('/locations', getAllLocations);
router.get('/locations/search', searchLocations);
router.get('/locations/:id', getLocationById);
router.get('/locations/:id/dashboard', getLocationDashboard);

// Ingestion Audit Endpoints
router.get('/ingestion/runs', getIngestionHistory);
router.get('/ingestion/quarantine', getQuarantinedRecords);

// Separated Domains
router.get('/locations/:id/groundwater', getGroundwaterByLocation);
router.get('/locations/:id/water-quality', getWaterQualityByLocation);

// Route replaces the temporary placeholder
router.post('/assistant/chat', handleAssistantChat);

// Assistant (Phase 3 placeholder)
router.post('/assistant/chat', assistantChatPlaceholder);

// Route mount
router.get('/locations/:id/intelligence', getLocationIntelligence);

export default router;







