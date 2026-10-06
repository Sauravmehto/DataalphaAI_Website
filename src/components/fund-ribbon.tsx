'use client';

import React from 'react';
import Image from 'next/image';

const funds = [
  { name: 'Addepar', logo: '/fund-ribbon/Addepar.png' },
  { name: 'Allvue', logo: '/fund-ribbon/allvue.png' },
  { name: 'Anaplan', logo: '/fund-ribbon/Anaplan.png' },
  { name: 'Barclays', logo: '/fund-ribbon/Barclays.png' },
  { name: 'Bloomberg', logo: '/fund-ribbon/Bloomberg.png' },
  { name: 'Citco', logo: '/fund-ribbon/Citco.png' },
  { name: 'Efront', logo: '/fund-ribbon/Efront.png' },
  { name: 'Factset', logo: '/fund-ribbon/Factset.png' },
  { name: 'FIS', logo: '/fund-ribbon/FIS.png' },
  { name: 'Goldman', logo: '/fund-ribbon/Goldman.png' },
  { name: 'ILevel', logo: '/fund-ribbon/ILevel.png' },
  { name: 'Intapp', logo: '/fund-ribbon/Intapp.png' },
  { name: 'Interactive', logo: '/fund-ribbon/Interactive.png' },
  { name: 'Intex', logo: '/fund-ribbon/Intex.png' },
  { name: 'JPMorgan', logo: '/fund-ribbon/JPMorgan.png' },
  { name: 'Morgan', logo: '/fund-ribbon/Morgan.png' },
  { name: 'MSCI', logo: '/fund-ribbon/MSCI.png' },
  { name: 'Rimes', logo: '/fund-ribbon/Rimes.png' },
  { name: 'SnP Advent', logo: '/fund-ribbon/SnP Advent.png' },
  { name: 'SSnC GlobeOp', logo: '/fund-ribbon/SSnC GlobeOp.png' },
  { name: 'SSnC', logo: '/fund-ribbon/SSnC.png' },
  { name: 'Thomson', logo: '/fund-ribbon/Thomson.png' },
  { name: 'Yardi', logo: '/fund-ribbon/Yardi.png' },
];

const FundIcon = ({ name, logo }: { name: string; logo: string }) => (
   <div className="flex-shrink-0 w-32 h-12 flex justify-center items-center px-4">
    <div className="relative w-full h-full">
      <Image 
          src={logo} 
          alt={name}
          layout="fill"
          objectFit="contain"
          unoptimized
      />
    </div>
  </div>
);

export function FundRibbon() {
  const extendedFunds = [...funds, ...funds, ...funds, ...funds];

  return (
    <div className="relative w-full overflow-hidden my-12 [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
      <div className="py-4 bg-muted/50 dark:bg-muted/20 rounded-lg">
        <div className="flex w-max fund-scroll-animate hover:[animation-play-state:paused]">
          {extendedFunds.map((fund, index) => (
            <FundIcon key={index} name={fund.name} logo={fund.logo} />
          ))}
        </div>
      </div>
    </div>
  );
}
