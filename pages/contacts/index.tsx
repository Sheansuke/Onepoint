import {
  CodeOutlined,
  ContactPhoneOutlined,
  EmailOutlined
} from '@mui/icons-material'
import { Card, Grid, SxProps, Theme, Typography } from '@mui/material'
import { CSSProperties } from '@mui/styled-engine'
import { ContentLayout } from '@organism/layouts/ContentLayout'
import React, { FC } from 'react'

interface ContactsPageProps {
  // name?: string;
}

const styles: { [key: string]: CSSProperties | SxProps<Theme> } = {
  infoContainer: {
    textAlign: 'center',
    
  },
  icon: {
    fontSize: 50,

  },
  card: {
      height: 150,
      
     
  }
}

const ContactsPage: FC<ContactsPageProps> = () => {
  return (
    <ContentLayout title="Contactos">
      <Grid container spacing={5} mt={2}>
        {/* NUMEROS */}
        <Grid item sx={styles.infoContainer} xs={12} md={4}>
          <Card sx={styles.card}>
            <ContactPhoneOutlined sx={styles.icon} color="primary" />
            <Typography variant="h2" fontWeight="bold">
              Telefonos
            </Typography>
            <Typography variant="subtitle1">829-689-8329</Typography>
            <Typography variant="subtitle1">829-420-9077</Typography>
          </Card>
        </Grid>

        {/* CORREOS */}
        <Grid item sx={styles.infoContainer} xs={12} md={4}>
          <Card sx={styles.card}>
            <EmailOutlined sx={styles.icon} color="primary"  />
            <Typography variant="h2" fontWeight="bold">
              Emails
            </Typography>
            <Typography variant="subtitle1">onepointrd@gmail.com</Typography>
          </Card>
        </Grid>

        {/* DESARROLLADOR WEB */}
        <Grid item sx={styles.infoContainer} xs={12} md={4}>
          <Card sx={styles.card}>
            <CodeOutlined sx={styles.icon} color="primary"  />
            <Typography variant="h2" fontWeight="bold">
              Desarrollador web
            </Typography>
            <Typography variant="subtitle1">suerojean@gmail.com</Typography>
          </Card>
        </Grid>
      </Grid>
    </ContentLayout>
  )
}

export default ContactsPage
