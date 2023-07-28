import { Box, Card, CardActionArea } from "@mui/material";

export const CustomCard = (props) => {
  return (
    <Card
      sx={{
        maxWidth: 315,
        boxShadow: "-4px 6px 18px -3px rgba(0,0,0,1)",
      }}
    >
      <CardActionArea onClick={props.handleClick}>
        <div>{props.children}</div>
      </CardActionArea>
    </Card>
  );
};
