'use client';

import React from 'react';
import Image from 'next/image';

const technologies = [
  { name: 'AWS', logo: '/tech/aws.svg' },
  { name: 'Google Cloud', logo: '/tech/gcp.svg' },
  { name: 'Azure', logo: '/tech/azure.svg' },
  { name: 'Snowflake', logo: '/tech/snowflake.svg' },
  { name: 'Databricks', logo: '/tech/databricks.svg' },
  { name: 'Python', logo: '/tech/python.svg' },
  { name: 'TensorFlow', logo: '/tech/tensorflow.svg' },
  { name: 'PyTorch', logo: '/tech/pytorch.svg' },
  { name: 'Next.js', logo: '/tech/nextjs.svg' },
  { name: 'React', logo: '/tech/react.svg' },
  { name: 'Kubernetes', logo: '/tech/kubernetes.svg' },
  { name: 'Docker', logo: '/tech/docker.svg' },
];

const TechIcon = ({ name, logo, hidden }: { name: string; logo: string; hidden: boolean }) => (
  <div
    className="flex-shrink-0 w-28 md:w-32 flex justify-center items-center px-4 h-10 md:h-12"
    aria-hidden={hidden}
  >
    <div className="relative w-full h-full">
        <Image
            src={logo}
            alt={hidden ? '' : name}
            title={name}
            fill
            sizes="128px"
            className="object-contain"
            unoptimized
        />
    </div>
  </div>
);

export function TechRibbon() {
  const extendedTechnologies = [...technologies, ...technologies, ...technologies, ...technologies];

  return (
    <div className="relative w-full overflow-hidden mt-8 md:mt-12 [mask-image:linear-gradient(to_right,transparent_0,black_40px,black_calc(100%-40px),transparent_100%)] md:[mask-image:linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]">
      <div className="py-4 bg-muted/50 dark:bg-white rounded-lg">
        <div className="flex w-max scroll-animate hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]">
          {extendedTechnologies.map((tech, index) => (
            // Only the first copy is announced; the rest exist for the seamless loop
            <TechIcon
              key={index}
              name={tech.name}
              logo={tech.logo}
              hidden={index >= technologies.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
