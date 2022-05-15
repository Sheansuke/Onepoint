import { IconProps, ListItem, ListItemText } from '@mui/material'
import { FC, ReactElement } from 'react';

interface NavListItemProps {
  onClick?: () => void
  icon?: ReactElement<IconProps>
  text: string
}

export const NavListItem: FC<NavListItemProps> = ({onClick,icon,text}) => {
  return (
    <ListItem button aria-label='icono' onClick={onClick}>
      {icon && icon}
      <ListItemText primary={text ?? "No text"} sx={{ ml: 1 }} />
    </ListItem>
  )
}
