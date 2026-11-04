import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import GroundwaterObservation from '../models/GroundwaterObservation.js';
import WaterQualitySample from '../models/WaterQualitySample.js';
import ParameterStandard from '../models/ParameterStandard.js';
import Location from '../models/Location.js';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jalsense_nagpur';

const ALL_AREAS = [
  {
    locationId: 'LOC-MH-NAG',
    name: 'Nagpur District',
    level: 'district',
    preMbgl: 8.80,
    postMbgl: 6.10,
    postDate: '2026-10-28', // 7 days ago
    tds: 410, ph: 7.3, fl: 0.70, no3: 22, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-CITY',
    name: 'Nagpur City',
    level: 'city',
    parentId: 'LOC-MH-NAG',
    preMbgl: 12.40,
    postMbgl: 9.80,
    postDate: '2026-10-31', // 4 days ago
    tds: 480, ph: 7.5, fl: 0.80, no3: 31, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-SAO',
    name: 'Saoner',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 9.40,
    postMbgl: 6.80,
    postDate: '2026-10-24', // 11 days ago
    tds: 420, ph: 7.4, fl: 0.85, no3: 28, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-KAT',
    name: 'Katol',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 11.20,
    postMbgl: 8.45,
    postDate: '2026-10-15', // 20 days ago
    tds: 540, ph: 7.6, fl: 1.10, no3: 38, compliance: 'Caution'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-RAM',
    name: 'Ramtek',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 7.10,
    postMbgl: 4.30,
    postDate: '2026-10-29', // 6 days ago
    tds: 360, ph: 7.1, fl: 0.55, no3: 18, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-KAL',
    name: 'Kalmeshwar',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 10.50,
    postMbgl: 7.60,
    postDate: '2026-10-18', // 17 days ago
    tds: 490, ph: 7.5, fl: 0.90, no3: 34, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-UMR',
    name: 'Umred',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 8.90,
    postMbgl: 5.80,
    postDate: '2026-10-10', // 25 days ago
    tds: 390, ph: 7.2, fl: 0.65, no3: 20, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-HIN',
    name: 'Hingna',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 11.80,
    postMbgl: 8.90,
    postDate: '2026-11-01', // 3 days ago
    tds: 520, ph: 7.7, fl: 0.95, no3: 41, compliance: 'Caution'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-NAR',
    name: 'Narkhed',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 12.80,
    postMbgl: 9.70,
    postDate: '2026-09-25', // 40 days ago
    tds: 580, ph: 7.8, fl: 1.20, no3: 44, compliance: 'Caution'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-PAR',
    name: 'Parseoni',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 8.10,
    postMbgl: 5.20,
    postDate: '2026-10-21', // 14 days ago
    tds: 375, ph: 7.2, fl: 0.60, no3: 19, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-MAU',
    name: 'Mauda',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 7.40,
    postMbgl: 4.60,
    postDate: '2026-10-26', // 9 days ago
    tds: 340, ph: 7.0, fl: 0.50, no3: 16, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-KAM',
    name: 'Kamptee',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 9.10,
    postMbgl: 6.40,
    postDate: '2026-10-30', // 5 days ago
    tds: 460, ph: 7.4, fl: 0.75, no3: 27, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-RUR',
    name: 'Nagpur Rural',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 10.10,
    postMbgl: 7.20,
    postDate: '2026-10-27', // 8 days ago
    tds: 440, ph: 7.3, fl: 0.80, no3: 29, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-URB',
    name: 'Nagpur Urban',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 12.10,
    postMbgl: 9.50,
    postDate: '2026-11-02', // 2 days ago
    tds: 470, ph: 7.5, fl: 0.85, no3: 32, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-KUH',
    name: 'Kuhi',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 8.50,
    postMbgl: 5.40,
    postDate: '2026-10-12', // 23 days ago
    tds: 380, ph: 7.1, fl: 0.60, no3: 18, compliance: 'Safe'
  },
  {
    locationId: 'LOC-MH-NAG-TAL-BHI',
    name: 'Bhivapur',
    level: 'taluka',
    parentId: 'LOC-MH-NAG',
    preMbgl: 9.20,
    postMbgl: 6.30,
    postDate: '2026-10-14', // 21 days ago
    tds: 410, ph: 7.3, fl: 0.70, no3: 24, compliance: 'Safe'
  }
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('[Database] MongoDB connected: 127.0.0.1');

  // 1. Locations
  console.log('[Seed] Seeding Locations...');
  for (const a of ALL_AREAS) {
    await Location.updateOne(
      { locationId: a.locationId },
      {
        $set: {
          locationId: a.locationId,
          name: a.name,
          level: a.level,
          parentId: a.parentId || null,
          aliases: [a.name, `${a.name} Taluka`]
        }
      },
      { upsert: true }
    );
  }

  // 2. Standards (BIS IS 10500)
  console.log('[Seed] Seeding Parameter Standards (IS 10500)...');
  const standards = [
    { parameterCode: 'tds', name: 'Total Dissolved Solids (TDS)', standard: 'BIS IS 10500:2012', acceptableLimit: 500, permissibleLimit: 2000, unit: 'mg/L', healthRelevance: 'Gastrointestinal irritation' },
    { parameterCode: 'ph', name: 'pH', standard: 'BIS IS 10500:2012', acceptableLimit: 6.5, permissibleLimit: 8.5, unit: 'pH units', healthRelevance: 'Corrosion and bitter taste' },
    { parameterCode: 'fluoride', name: 'Fluoride', standard: 'BIS IS 10500:2012', acceptableLimit: 1.0, permissibleLimit: 1.5, unit: 'mg/L', healthRelevance: 'Dental and skeletal fluorosis' },
    { parameterCode: 'nitrate', name: 'Nitrate (as NO3)', standard: 'BIS IS 10500:2012', acceptableLimit: 45.0, permissibleLimit: 45.0, unit: 'mg/L', healthRelevance: 'Methemoglobinemia in infants' }
  ];

  for (const s of standards) {
    await ParameterStandard.updateOne({ parameterCode: s.parameterCode }, { $set: s }, { upsert: true });
  }

  // 3. Reset existing readings and samples
  console.log('[Seed] Clearing previous observations & samples...');
  await GroundwaterObservation.deleteMany({});
  await WaterQualitySample.deleteMany({});

  const gwObservations = [];
  const wqSamples = [];

  for (const a of ALL_AREAS) {
    const suffix = a.locationId.replace('LOC-MH-NAG-', '').replace('LOC-MH-', '');
    const stationId = `CGWB-NAG-${suffix}`;

    // A. Pre-monsoon Groundwater
    gwObservations.push({
      locationId: a.locationId,
      stationId,
      measurementValue: a.preMbgl,
      unit: 'meters below ground level (mbgl)',
      season: 'pre_monsoon',
      observationDate: new Date('2026-05-15'),
      sourceId: 'SRC-CGWB',
      verificationStatus: 'verified',
      isDemo: true
    });

    // B. Post-monsoon Groundwater
    gwObservations.push({
      locationId: a.locationId,
      stationId,
      measurementValue: a.postMbgl,
      unit: 'meters below ground level (mbgl)',
      season: 'post_monsoon',
      observationDate: new Date(a.postDate), // Uses the specific date per taluka
      sourceId: 'SRC-CGWB',
      verificationStatus: 'verified',
      isDemo: true
    });

    // C. Water Quality Sample matching WaterQualitySampleSchema & ParameterResultSchema
    const sampleDate = new Date('2026-09-15');
    const parameters = [
      {
        parameterCode: 'tds',
        parameterName: 'Total Dissolved Solids (TDS)',
        measuredValue: a.tds,
        unit: 'mg/L',
        status: a.tds > 500 ? 'Caution' : 'Safe',
        healthRelevance: 'High TDS impacts palatability.'
      },
      {
        parameterCode: 'ph',
        parameterName: 'pH',
        measuredValue: a.ph,
        unit: 'pH units',
        status: (a.ph < 6.5 || a.ph > 8.5) ? 'Caution' : 'Safe',
        healthRelevance: 'Corrosion and alkaline balance.'
      },
      {
        parameterCode: 'fluoride',
        parameterName: 'Fluoride',
        measuredValue: a.fl,
        unit: 'mg/L',
        status: a.fl > 1.0 ? 'Caution' : 'Safe',
        healthRelevance: 'Enamel and skeletal health.'
      },
      {
        parameterCode: 'nitrate',
        parameterName: 'Nitrate (as NO3)',
        measuredValue: a.no3,
        unit: 'mg/L',
        status: a.no3 > 45.0 ? 'Potential Health Risk' : 'Safe',
        healthRelevance: 'Infant oxygenation risk above 45 mg/L.'
      }
    ];

    wqSamples.push({
      sampleId: `WQS-${suffix}-2026`,
      locationId: a.locationId,
      sampleDate,
      sampleType: 'tap_water',
      samplingMethod: 'laboratory_tested',
      laboratoryName: `Public Health Engineering Laboratory - ${a.name}`,
      overallComplianceStatus: a.compliance,
      parameters,
      sourceId: 'SRC-NMC-OCW',
      verificationStatus: 'verified',
      isDemo: true
    });
  }

  await GroundwaterObservation.insertMany(gwObservations);
  await WaterQualitySample.insertMany(wqSamples);

  console.log(`\n [Seed Success]`);
  console.log(`   • ${ALL_AREAS.length} Administrative Locations`);
  console.log(`   • ${gwObservations.length} Groundwater Observations (Pre & Post Monsoon)`);
  console.log(`   • ${wqSamples.length} Water Quality Samples (with embedded parameter results)`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[Seed Error]:', err);
  process.exit(1);
});