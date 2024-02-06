import { Box, Rating, Typography } from '@mui/material';
import * as React from 'react';


export default function BasicRating({selectedCourseRating }) {
  console.log(selectedCourseRating)
  const [value, setValue] = React.useState(selectedCourseRating );

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="read-only"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
     
    </Box>
  );
}