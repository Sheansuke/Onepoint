import { FC, ReactElement, useCallback } from 'react'

interface NavListItemProps {
  icon?: ReactElement
  text: string
  href?: string
}

export const NavListItem: FC<NavListItemProps> = ({ icon, text,href }) => {
  // this functions closed drawer with the input checkbox id = sideMenu
  const handleClick = useCallback(() => {
    const sideMenu = document.getElementById('sideMenu') as HTMLInputElement
    sideMenu.checked = false
  }, [])

  return (
    <li>
      <a type="button" onClick={handleClick} className="text-lg" href={href}>
        {icon && icon}
        {text}
      </a>
    </li>
  )
}
