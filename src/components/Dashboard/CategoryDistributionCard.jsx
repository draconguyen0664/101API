import { useEffect, useMemo, useState } from "react";

const categories = [
  { label: "Slot", value: 40, color: "#46B764" },
  { label: "Fish", value: 15, color: "#F0A000" },
  { label: "Sport", value: 10, color: "#E85A3B" },
  { label: "Live", value: 35, color: "#4D97DD" },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function polarToCartesian(cx, cy, r, angle) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function createSlicePath(cx, cy, r, startAngle, endAngle) {
  const safeEndAngle = Math.max(endAngle, startAngle + 0.01);

  const start = polarToCartesian(cx, cy, r, safeEndAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = safeEndAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function getLabelPosition(cx, cy, r, startAngle, endAngle) {
  const midAngle = (startAngle + endAngle) / 2;
  return polarToCartesian(cx, cy, r * 0.58, midAngle);
}

function CategoryDistributionCard() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId;
    const duration = 1400;
    const start = performance.now();

    const animate = (now) => {
      const raw = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(eased);

      if (raw < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const slices = useMemo(() => {
    const total = categories.reduce((sum, item) => sum + item.value, 0);

    let currentAngle = -90;
    let cumulativeValue = 0;

    return categories.map((item) => {
      const sliceFraction = item.value / total;
      const startProgress = cumulativeValue / total;
      const endProgress = (cumulativeValue + item.value) / total;

      const startAngle = currentAngle;
      const fullSliceAngle = sliceFraction * 360;

      const localProgress = clamp(
        (progress - startProgress) / (endProgress - startProgress),
        0,
        1,
      );

      const animatedEndAngle = startAngle + fullSliceAngle * localProgress;
      const finalEndAngle = startAngle + fullSliceAngle;

      const slice = {
        ...item,
        startAngle,
        endAngle: finalEndAngle,
        localProgress,
        path:
          localProgress > 0
            ? createSlicePath(110, 110, 92, startAngle, animatedEndAngle)
            : null,
        labelPos: getLabelPosition(110, 110, 92, startAngle, finalEndAngle),
      };

      cumulativeValue += item.value;
      currentAngle = finalEndAngle;

      return slice;
    });
  }, [progress]);

  return (
    <div className="h-full rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px">
      <div className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <h3 className="mb-4 text-[18px] font-bold text-slate-800">
          Category Distribution
        </h3>

        <div className="flex flex-1 flex-col items-center justify-center">
          <svg
            viewBox="0 0 220 220"
            className="h-[250px] w-[250px]"
            aria-label="Category Distribution Pie Chart">
            {slices.map((slice) => (
              <g key={slice.label}>
                {slice.path && (
                  <path
                    d={slice.path}
                    fill={slice.color}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                )}

                <text
                  x={slice.labelPos.x}
                  y={slice.labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="600"
                  style={{
                    opacity: slice.localProgress > 0.85 ? 1 : 0,
                    transition: "opacity 120ms linear",
                  }}>
                  {slice.value}%
                </text>
              </g>
            ))}
          </svg>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {categories.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[13px] font-medium text-slate-700">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDistributionCard;
