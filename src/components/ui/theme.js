import { createTheme } from '@mui/material/styles'

import colors from './colors'

export default createTheme({
    palette: {
        // common: {
        //     main: `${arcBean}`,
        //     arcOrange: `${arcOrange}`
        // },
        primary: {
            main: `${colors.navGreyBlack}`
        }
    },
    typography: {
        fontWeightRegular: 300
    }
})