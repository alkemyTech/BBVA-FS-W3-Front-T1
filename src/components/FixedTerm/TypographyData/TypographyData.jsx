import React from 'react';
import { Typography } from '@mui/material';

const TypographyData = ({ children }) => {
    return (
      <Typography
        style={{
          color: '#1C6875',
          fontWeight: 700,
          fontSize: '1.2em',
        }}
      >
        {children}
      </Typography>
    );
  };

export default TypographyData;