import { Backdrop, CircularProgress } from '@mui/material'

export const Loader = ({loader}) => {
  return (
    <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress sx={{color:"#2BA0B5"}}/>
    </Backdrop>
  )
}