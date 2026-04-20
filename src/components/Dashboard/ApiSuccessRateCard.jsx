import React, { useEffect, useId, useMemo, useState } from "react";

const START_ANGLE = 150;
const END_ANGLE = 390;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const pointOnArc = (cx, cy, r, angle) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const describeArc = (cx, cy, r, startAngle, endAngle) => {
  const start = pointOnArc(cx, cy, r, startAngle);
  const end = pointOnArc(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
};

const valueToAngle = (value) => {
  const safe = clamp(value, 0, 100);
  return START_ANGLE + (safe / 100) * (END_ANGLE - START_ANGLE);
};

function useDarkModeClass() {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    const update = () => {
      setIsDark(root.classList.contains("dark"));
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

function ApiSuccessRateCard({
  title = "API Success Rate (%)",
  date = "13/04/2026",
  value = 55,
  duration = 1400,
}) {
  const targetValue = clamp(value, 0, 100);
  const [animatedValue, setAnimatedValue] = useState(0);
  const isDark = useDarkModeClass();

  const gradientId = useId().replace(/:/g, "");
  const filterId = useId().replace(/:/g, "");

  useEffect(() => {
    let frameId;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = clamp((now - startedAt) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(targetValue * eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    setAnimatedValue(0);
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [targetValue, duration]);

  const displayValue = Math.round(animatedValue);

  const geometry = useMemo(() => {
    const width = 420;
    const height = 290;
    const cx = width / 2;
    const cy = 188;
    const outerRadius = 145;
    const tickOuterRadius = 115;
    const labelRadius = 88;
    const needleLength = 86;

    return {
      width,
      height,
      cx,
      cy,
      outerRadius,
      tickOuterRadius,
      labelRadius,
      needleLength,
    };
  }, []);

  const {
    width,
    height,
    cx,
    cy,
    outerRadius,
    tickOuterRadius,
    labelRadius,
    needleLength,
  } = geometry;

  const arcPath = describeArc(cx, cy, outerRadius, START_ANGLE, END_ANGLE);
  const angle = valueToAngle(animatedValue);
  const needleTip = pointOnArc(cx, cy, needleLength, angle);

  const ticks = Array.from({ length: 25 }, (_, i) => {
    const ratio = i / 24;
    const tickValue = ratio * 100;
    const tickAngle = valueToAngle(tickValue);
    const isMajor = i % 5 === 0;
    const outer = pointOnArc(cx, cy, tickOuterRadius, tickAngle);
    const inner = pointOnArc(
      cx,
      cy,
      tickOuterRadius - (isMajor ? 14 : 8),
      tickAngle,
    );

    return { i, outer, inner, isMajor };
  });

  const labels = [0, 20, 40, 60, 80, 100].map((label) => {
    const labelAngle = valueToAngle(label);
    const pos = pointOnArc(cx, cy, labelRadius, labelAngle);

    return {
      label,
      x: pos.x,
      y: pos.y + (label === 0 || label === 100 ? 4 : 0),
    };
  });

  const tickMinorColor = isDark ? "#475569" : "#cbd5e1";
  const tickMajorColor = isDark ? "#94a3b8" : "#94a3b8";
  const labelColor = isDark ? "#cbd5e1" : "#334155";
  const valueColor = isDark ? "#f8fafc" : "#0f172a";
  const needleCenterShadow = isDark ? "#000000" : "#94a3b8";
  const needleCenterFill = "#22c55e";
  const needleCenterDot = isDark ? "#f8fafc" : "#ffffff";
  const cardBg = isDark ? "bg-slate-950" : "bg-white";
  const cardShadow = isDark
    ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
    : "shadow-[0_8px_24px_rgba(15,23,42,0.04)]";
  const titleColor = isDark ? "text-slate-100" : "text-slate-800";
  const dateBoxClasses = isDark
    ? "border-slate-700 bg-slate-900 text-slate-200"
    : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <div className="h-full rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px">
      <div
        className={`flex h-full flex-col rounded-2xl px-5 py-4 ${cardBg} ${cardShadow}`}>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3
            className={`pt-1 text-[18px] font-semibold tracking-[-0.02em] ${titleColor}`}>
            {title}
          </h3>

          <div
            className={`rounded-[14px] border px-4 py-2 text-[14px] font-medium ${dateBoxClasses}`}>
            {date}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-[250px] w-full max-w-[360px] overflow-visible">
            <defs>
              <linearGradient
                id={`gaugeArcGradient-${gradientId}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="46%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>

              <filter
                id={`needleShadow-${filterId}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="2.5"
                  floodOpacity={isDark ? "0.4" : "0.22"}
                />
              </filter>
            </defs>

            <path
              d={arcPath}
              fill="none"
              stroke={`url(#gaugeArcGradient-${gradientId})`}
              strokeWidth="30"
              strokeLinecap="round"
            />

            {ticks.map((tick) => (
              <line
                key={tick.i}
                x1={tick.inner.x}
                y1={tick.inner.y}
                x2={tick.outer.x}
                y2={tick.outer.y}
                stroke={tick.isMajor ? tickMajorColor : tickMinorColor}
                strokeWidth={tick.isMajor ? 2.6 : 1.6}
                strokeLinecap="round"
              />
            ))}

            {labels.map((item) => (
              <text
                key={item.label}
                x={item.x}
                y={item.y}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  fill: labelColor,
                }}>
                {item.label}
              </text>
            ))}

            <g filter={`url(#needleShadow-${filterId})`}>
              <line
                x1={cx}
                y1={cy}
                x2={needleTip.x}
                y2={needleTip.y}
                stroke="#4ade80"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </g>

            <circle
              cx={cx}
              cy={cy}
              r="13"
              fill={needleCenterShadow}
              opacity="0.25"
            />
            <circle cx={cx} cy={cy} r="9" fill={needleCenterFill} />
            <circle cx={cx} cy={cy} r="3.2" fill={needleCenterDot} />
          </svg>

          <div
            className={`-mt-2 pb-2 text-center text-[48px] font-bold leading-none tracking-[-0.04em] ${
              isDark ? "text-slate-50" : "text-slate-900"
            }`}>
            {displayValue}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiSuccessRateCard;
