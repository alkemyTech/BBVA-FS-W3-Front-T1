import { styled } from "@mui/system";
import { Button } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(40, 62, 81,0.9 )",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "rgba(75, 121, 161, 0.9)",
  },
}));

StyledButton.defaultProps = {
  variant: "contained",
};

export default StyledButton;
