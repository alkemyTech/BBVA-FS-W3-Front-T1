import { Card, CardActionArea } from "@mui/material";

export const CustomCard = (props) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px;" 
      }}
    >
      <CardActionArea onClick={props.handleClick}>
        <div>{props.children}</div>
      </CardActionArea>
    </Card>
  );
};
