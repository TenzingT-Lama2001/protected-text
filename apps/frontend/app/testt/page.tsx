'use client';

import React from 'react';
import { useContentStore } from '../../store/store';

export default function Page() {
  const { content } = useContentStore();
  return (
    <div>
      <h1 className="text-white">Content:{content}</h1>
    </div>
  );
}
