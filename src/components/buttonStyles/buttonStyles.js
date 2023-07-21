import { styled } from "@mui/system";
import { Button } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#2BA0B5",
  "&:hover": {
    backgroundColor: "#1C6875",
  },
}));

export default StyledButton;
