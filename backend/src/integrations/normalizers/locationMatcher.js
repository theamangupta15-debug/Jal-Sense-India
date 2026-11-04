import Location from '../../models/Location.js';

export class LocationMatcher {
  constructor() {
    this.cachedLocations = [];
  }

  async initialize() {
    this.cachedLocations = await Location.find().lean();
  }

  /**
   * Matches raw station/taluka string to official Location ID
   * Never fabricates locality level if source is district or taluka scope.
   */
  resolveLocation({ talukaName, districtName = 'Nagpur', stationName }) {
    if (!this.cachedLocations.length) return null;

    // 1. Direct Taluka Match
    if (talukaName) {
      const cleanTaluka = talukaName.trim().toLowerCase();
      const talukaMatch = this.cachedLocations.find(
        (loc) =>
          loc.level === 'taluka' &&
          (loc.name.toLowerCase() === cleanTaluka ||
            loc.aliases.some((a) => a.toLowerCase() === cleanTaluka) ||
            loc.localNames?.hi === cleanTaluka ||
            loc.localNames?.mr === cleanTaluka)
      );
      if (talukaMatch) return talukaMatch;
    }

    // 2. Fallback to Nagpur City if station indicates urban NMC jurisdiction
    if (stationName) {
      const cleanStation = stationName.toLowerCase();
      if (
        cleanStation.includes('nagpur city') ||
        cleanStation.includes('dharampeth') ||
        cleanStation.includes('sitabuldi') ||
        cleanStation.includes('nmc')
      ) {
        return this.cachedLocations.find((loc) => loc.locationId === 'LOC-MH-NAG-CITY') || null;
      }
    }

    // 3. Fallback to Nagpur District entity
    return this.cachedLocations.find((loc) => loc.locationId === 'LOC-MH-NAG') || null;
  }
}