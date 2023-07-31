import React from 'react';
import { Typography } from '@mui/material';

const TypographyData = ({ children }) => {
    return (
      <Typography
        style={{
          color: '#5B92C2',
          fontWeight: 700,
          fontSize: '1.2em',
        }}
      >
        {children}
      </Typography>
    );
  };

export default TypographyData;

// '#67A5DB'