import React from 'react';
import ProgressDivider from './ProgressDivider';
import ProgressStep from './ProgressStep';

export default function FormProgressIndicator() {
  return (
    <nav className="flex gap-10 items-start" aria-label="Form progress">
    <ProgressStep
      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/316870d1e90a25b6c6558476bcee7575f5418de4?placeholderIfAbsent=true&apiKey=1078ab2f584b4de6a8c41a481b239303"
      label="Personal Details"
      secondaryIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/e7d782d241fc0c6f68ce9845d5638a8ff38b36ea?placeholderIfAbsent=true&apiKey=1078ab2f584b4de6a8c41a481b239303"
    />

    <ProgressStep
      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/448f1d009b4d0951820eee2a00ffcdeaf4c2d040?placeholderIfAbsent=true&apiKey=1078ab2f584b4de6a8c41a481b239303"
      label="Joint Holding Details"
    />

    <ProgressDivider />

    <ProgressStep
      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/69fb543d725f86d7c8a2d02cfe0efb1e0ffc166b?placeholderIfAbsent=true&apiKey=1078ab2f584b4de6a8c41a481b239303"
      label="Nominee Details"
    />

    <ProgressDivider />

    <ProgressStep
      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/575e2751a4d96627af99d9e4ada367358363fc1a?placeholderIfAbsent=true&apiKey=1078ab2f584b4de6a8c41a481b239303"
      label="Bank Details"
    />

    <ProgressDivider />

    <ProgressStep
      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/78b3f41444d10e10af8cd08cdfaec70ddd03a5f4?placeholderIfAbsent=true&apiKey=1078ab2f584b4de6a8c41a481b239303"
      label="FATCA Details"
    />
  </nav>
  )
}
