import { styled } from "@mui/system";
import { Button } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(75, 121, 161, 0.9)",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#2279A1",
  },
}));

StyledButton.defaultProps = {
  variant: "contained",
};

export default StyledButton;
