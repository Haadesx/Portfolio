'use client';

import React from 'react';
import { Rocket } from 'lucide-react';
const Crazy = () => {
  return (
    <div className="mx-auto w-full text-center">
      <div className="mb-4">
        <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
          Building Fast Enough To Stress Test The Idea
        </h2>
      </div>
      <div className="flex justify-center items-center p-6 bg-accent rounded-xl">
        <Rocket className="h-20 w-20 text-primary" />
      </div>
      <p className="text-muted-foreground mt-4">
        The craziest thing is probably how often I would rather build the full
        system than keep theorizing about whether the idea might work.
      </p>
    </div>
  );
};

export default Crazy;
