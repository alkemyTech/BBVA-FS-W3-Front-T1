import React from 'react';
import { Typography } from '@mui/material';

const TypographyInfo = ({ children }) => {
    return (
      <Typography
        style={{
          color: '#0D2F36',
          fontWeight: 900,
          fontSize: '1.7em',
        }}
      >
        {children}
      </Typography>
    );
  };

export default TypographyInfo;
