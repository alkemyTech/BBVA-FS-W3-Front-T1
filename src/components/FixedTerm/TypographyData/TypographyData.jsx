import React from 'react';
import { Typography } from '@mui/material';

const TypographyData = ({ children }) => {
    return (
      <Typography
        style={{
          color: '#1C6875',
          fontWeight: 900,
          fontSize: '1.3em',
        }}
      >
        {children}
      </Typography>
    );
  };

export default TypographyData;