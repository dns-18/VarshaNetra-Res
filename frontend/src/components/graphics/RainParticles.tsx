import React, { useMemo } from "react";
import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

interface RainParticlesProps {
  density?: number;
  opacity?: number;
}

export default function RainParticles({
  density = 28,
  opacity = 0.18,
}: RainParticlesProps) {
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },

      fpsLimit: 60,

      particles: {
        number: {
          value: density,
          density: {
            enable: true,
          },
        },

        color: {
          value: "#7dd3fc",
        },

        opacity: {
          value: opacity,
          random: {
            enable: true,
            minimumValue: opacity * 0.35,
          },
        },

        shape: {
          type: "line",
        },

        size: {
          value: 8,
          random: {
            enable: true,
            minimumValue: 3,
          },
        },

        move: {
          enable: true,
          direction: "bottom-right",
          speed: 4,
          straight: true,
          outModes: {
            default: "out",
          },
        },

        rotate: {
          value: 20,
        },
      },

      detectRetina: true,
    }),
    [density, opacity]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <Particles
        id="varshanetra-rain"
        options={options}
        className="h-full w-full"
      />
    </div>
  );
}