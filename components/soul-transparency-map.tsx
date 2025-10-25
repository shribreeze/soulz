"use client"

import { motion } from "framer-motion"

export default function SoulTransparencyMap() {
  const dimensions = [
    { label: "Empathy", angle: 0, value: 87 },
    { label: "Creativity", angle: 45, value: 92 },
    { label: "Authenticity", angle: 90, value: 88 },
    { label: "Growth", angle: 135, value: 85 },
    { label: "Passion", angle: 180, value: 79 },
    { label: "Stability", angle: 225, value: 82 },
    { label: "Adventure", angle: 270, value: 84 },
    { label: "Wisdom", angle: 315, value: 86 },
  ]

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Background circles */}
        {[1, 2, 3, 4].map((i) => (
          <circle
            key={`bg-${i}`}
            cx="200"
            cy="200"
            r={50 * i}
            fill="none"
            stroke="rgba(168, 85, 247, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Grid lines */}
        {dimensions.map((dim) => {
          const rad = (dim.angle * Math.PI) / 180
          const x = 200 + 200 * Math.cos(rad)
          const y = 200 + 200 * Math.sin(rad)
          return (
            <line
              key={`line-${dim.label}`}
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke="rgba(168, 85, 247, 0.2)"
              strokeWidth="1"
            />
          )
        })}

        {/* Data polygon - You */}
        <motion.polygon
          points={dimensions
            .map((dim) => {
              const rad = (dim.angle * Math.PI) / 180
              const r = (dim.value / 100) * 150
              const x = 200 + r * Math.cos(rad)
              const y = 200 + r * Math.sin(rad)
              return `${x},${y}`
            })
            .join(" ")}
          fill="rgba(255, 153, 204, 0.2)"
          stroke="rgba(255, 153, 204, 0.8)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Data polygon - Them */}
        <motion.polygon
          points={dimensions
            .map((dim) => {
              const rad = (dim.angle * Math.PI) / 180
              const r = ((dim.value + 5) / 100) * 150
              const x = 200 + r * Math.cos(rad)
              const y = 200 + r * Math.sin(rad)
              return `${x},${y}`
            })
            .join(" ")}
          fill="rgba(94, 234, 212, 0.1)"
          stroke="rgba(94, 234, 212, 0.8)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Labels and data points */}
        {dimensions.map((dim, i) => {
          const rad = (dim.angle * Math.PI) / 180
          const labelR = 220
          const labelX = 200 + labelR * Math.cos(rad)
          const labelY = 200 + labelR * Math.sin(rad)

          const dataR = (dim.value / 100) * 150
          const dataX = 200 + dataR * Math.cos(rad)
          const dataY = 200 + dataR * Math.sin(rad)

          return (
            <g key={`dim-${i}`}>
              {/* Label */}
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(209, 213, 219, 0.8)"
                fontSize="12"
                fontWeight="500"
              >
                {dim.label}
              </text>

              {/* Data point - You */}
              <motion.circle
                cx={dataX}
                cy={dataY}
                r="4"
                fill="rgba(255, 153, 204, 0.8)"
                initial={{ r: 0 }}
                animate={{ r: 4 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
              />
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-pink-400" />
          <span className="text-gray-400">You</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400" />
          <span className="text-gray-400">Them</span>
        </div>
      </div>
    </div>
  )
}
