// utils/geo.js
import fetch from "node-fetch";
export async function enrichGeo(ip) {
  try {
    const r = await fetch(`https://ipapi.co/${ip}/json/`, { timeout: 2000 });
    const j = await r.json();
    return { country: j.country_name, city: j.city };
  } catch { return { country: "", city: "" }; }
}
