import { Typography } from '@mui/material'
import React from 'react'

const CopyRight = (props) => {
    return (
        <a
            href="https://github.com/AneeshKumar"   // change to your GitHub / LinkedIn
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
        >
            <Typography
                variant="body2"
                fontWeight="600"
                align="center"
                {...props}
                sx={{
                    color: '#1976d2',
                    cursor: 'pointer',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                }}
            >
                {new Date().getFullYear()} © Developed by Aneesh Kumar
            </Typography>
        </a>
    )
}

export default CopyRight