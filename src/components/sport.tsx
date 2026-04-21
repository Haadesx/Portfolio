'use client';

import React from 'react';
import { varesh } from '@/data/varesh';
const Sports = () => {
  return (
    <div className="mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
          Beyond the Code
        </h2>
        <p className="mt-2 text-muted-foreground text-lg">
          What I tend to build, explore, and obsess over outside class and work.
        </p>
      </div>

      <div className="space-y-6 text-muted-foreground text-base">
        {varesh.hobbies.map((hobby) => (
          <p key={hobby}>{hobby}.</p>
        ))}
      </div>
    </div>
  );
};

export default Sports;
