import { Box, Button, Typography } from '@mui/material'
import { NavBar } from '@organism/NavBar'
import dynamic from 'next/dynamic'
import React, { FC } from 'react'

interface ContentLayoutProps {
  children?: React.ReactNode | React.ReactNode[]
  title?: string
}

export const ContentLayout: FC<ContentLayoutProps> = ({ children,title }) => {
  return (
    <Box
      sx={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 20px'
      }}
    >
      <Typography variant="h1" component="h1" fontWeight="bold">
        {title ?? ""}
      </Typography>
      {children}
    </Box>
  )
}
