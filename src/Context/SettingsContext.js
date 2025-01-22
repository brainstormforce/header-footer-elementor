import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from '@bsf/force-ui';
import { __ } from '@wordpress/i18n'; // Import localization function

// Create the Settings Context
export const SettingsContext = createContext();