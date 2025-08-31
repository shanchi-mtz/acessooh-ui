import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// GeoJSON do Brasil (estados)
const geoUrl =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

export default function MapaBrasil() {
  return (
    <div className="w-full flex justify-center items-center">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 650, // zoom adequado
          center: [-55, -15], // centraliza Brasil no card
        }}
        width={500}
        height={500}
        style={{ width: "100%", height: "auto" }} // responsivo
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#0f172a",
                    stroke: "#fff",
                    strokeWidth: 0.4,
                    outline: "none",
                  },
                  hover: {
                    fill: "#facc15",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#f59e0b",
                    outline: "none",
                  },
                }}
              >
                {/* Tooltip nativo */}
                <title>{geo.properties.name}</title>
              </Geography>
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
