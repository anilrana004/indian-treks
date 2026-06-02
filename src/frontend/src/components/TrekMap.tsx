import { useEffect, useRef } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MapData } from "../types";

interface TrekMapProps {
  mapData: MapData;
  googleMapsUrl: string;
}

export default function TrekMap({ mapData, googleMapsUrl }: TrekMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const container = mapRef.current;

    const loadMap = async () => {
      const L = (await import("leaflet")).default;
      // @ts-expect-error leaflet internal
      L.Icon.Default.prototype._getIconUrl = undefined;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
      if (!container) return;
      const map = L.map(container).setView(
        [mapData.centerLat, mapData.centerLng],
        mapData.zoom,
      );
      mapInstanceRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      const latLngs = mapData.waypoints.map((wp) => L.latLng(wp.lat, wp.lng));
      L.polyline(latLngs, { color: "#E8632A", weight: 3, opacity: 0.85 }).addTo(
        map,
      );
      mapData.waypoints.forEach((wp, i) => {
        const isFirst = i === 0;
        const isLast = i === mapData.waypoints.length - 1;
        const color = isFirst ? "#22c55e" : isLast ? "#ef4444" : "#3b82f6";
        const icon = L.divIcon({
          html: `<div style="width:26px;height:26px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:bold">${isFirst ? "S" : isLast ? "E" : wp.day}</div>`,
          className: "",
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });
        L.marker([wp.lat, wp.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="min-width:180px;font-family:sans-serif"><strong style="font-size:14px">${wp.name}</strong><br/><span style="color:#666;font-size:12px">Day ${wp.day} &middot; ${wp.altitude}m</span><br/><p style="margin:6px 0 0;font-size:12px;color:#444">${wp.description}</p></div>`,
          );
      });
    };

    loadMap();
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapData]);

  const { elevationProfile } = mapData;
  const altitudes = elevationProfile.map((p) => p.altitude);
  const maxAlt = altitudes.length ? Math.max(...altitudes) : 0;
  const minAlt = altitudes.length ? Math.min(...altitudes) : 0;
  const totalDist = elevationProfile.length
    ? elevationProfile[elevationProfile.length - 1].distance
    : 0;
  const elevGain = altitudes.reduce((acc, curr, i) => {
    if (i === 0) return 0;
    const diff = curr - altitudes[i - 1];
    return acc + (diff > 0 ? diff : 0);
  }, 0);

  return (
    <div className="space-y-5">
      <div
        ref={mapRef}
        className="w-full rounded-2xl overflow-hidden border border-border"
        style={{ height: 360 }}
      />

      {elevationProfile.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Elevation Profile
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={elevationProfile}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E8632A" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#E8632A" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="distance"
                tickFormatter={(v: number) => `${v}km`}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                tickFormatter={(v: number) => `${v}m`}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(v: number) => [`${v}m`, "Altitude"]}
                labelFormatter={(l: number) => `${l} km`}
              />
              <Area
                type="monotone"
                dataKey="altitude"
                stroke="#E8632A"
                strokeWidth={2}
                fill="url(#elevGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Distance", value: `${totalDist} km` },
          { label: "Elevation Gain", value: `+${elevGain}m` },
          { label: "Max Altitude", value: `${maxAlt}m` },
          { label: "Min Altitude", value: `${minAlt}m` },
        ].map((s) => (
          <div key={s.label} className="bg-muted rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary inline-flex items-center gap-2 text-sm"
        data-ocid="trek.directions_button"
      >
        🗺️ Get Directions from Delhi
      </a>
    </div>
  );
}
