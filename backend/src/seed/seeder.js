import mongoose from 'mongoose';
import Location from '../models/Location.js';
import Source from '../models/Source.js';
import ParameterStandard from '../models/ParameterStandard.js';
import HealthGuidance from '../models/HealthGuidance.js';
import GroundwaterObservation from '../models/GroundwaterObservation.js';
import WaterQualitySample from '../models/WaterQualitySample.js';
import { connectDB } from '../config/database.js';
import {
  SEED_LOCATIONS,
  SEED_SOURCES,
  SEED_STANDARDS,
  SEED_HEALTH_GUIDANCE,
  SEED_DEMO_GROUNDWATER,
  SEED_DEMO_SAMPLES
} from './seedData.js';

async function seed() {
  const shouldDrop = process.argv.includes('--drop');
  await connectDB();

  if (shouldDrop) {
    console.log('[Seed] Dropping existing collections...');
    await Location.deleteMany({});
    await Source.deleteMany({});
    await ParameterStandard.deleteMany({});
    await HealthGuidance.deleteMany({});
    await GroundwaterObservation.deleteMany({});
    await WaterQualitySample.deleteMany({});
  }

  console.log('[Seed] Seeding Locations...');
  for (const loc of SEED_LOCATIONS) {
    await Location.updateOne({ locationId: loc.locationId }, { $set: loc }, { upsert: true });
  }

  console.log('[Seed] Seeding Sources...');
  for (const src of SEED_SOURCES) {
    await Source.updateOne({ sourceId: src.sourceId }, { $set: src }, { upsert: true });
  }

  console.log('[Seed] Seeding Parameter Standards (IS 10500)...');
  for (const std of SEED_STANDARDS) {
    await ParameterStandard.updateOne({ parameterCode: std.parameterCode }, { $set: std }, { upsert: true });
  }

  console.log('[Seed] Seeding Health Guidance...');
  for (const h of SEED_HEALTH_GUIDANCE) {
    await HealthGuidance.updateOne({ topicSlug: h.topicSlug }, { $set: h }, { upsert: true });
  }

  console.log('[Seed] Seeding Labelled Demo Records...');
  for (const gw of SEED_DEMO_GROUNDWATER) {
    await GroundwaterObservation.updateOne({ stationId: gw.stationId }, { $set: gw }, { upsert: true });
  }
  for (const wq of SEED_DEMO_SAMPLES) {
    await WaterQualitySample.updateOne({ sampleId: wq.sampleId }, { $set: wq }, { upsert: true });
  }

  console.log('[Seed] Done. All demo data tagged with isDemo: true.');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('[Seed Error]', err);
  process.exit(1);
});