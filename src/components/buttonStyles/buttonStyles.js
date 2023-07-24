import { styled } from "@mui/system";
import { Button } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#2BA0B5",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#1C6875",
  },
}));

StyledButton.defaultProps = {
  variant: "contained",
};

export default StyledButton;
