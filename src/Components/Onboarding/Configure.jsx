import React from 'react'
import { __ } from "@wordpress/i18n";
import FeatureWidgetsOnboarding from '@components/Widgets/Features/FeatureWidgetsOnboarding';

const Configure = ({ setCurrentStep }) => {
  return (
    <FeatureWidgetsOnboarding setCurrentStep={setCurrentStep} />
  )
}

export default Configure
