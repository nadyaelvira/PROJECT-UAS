/**
 * Reverse geocode coordinates to address using Nominatim (free, no API key).
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      { headers: { "Accept-Language": "id" } }
    );
    const data = await res.json();
    if (data.display_name) {
      // Take first part of address (street name)
      const parts = data.display_name.split(",");
      return parts.slice(0, 3).join(",").trim();
    }
  } catch {}
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}
