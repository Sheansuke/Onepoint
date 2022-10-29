import { FC, ReactElement, useCallback } from 'react'

interface NavListItemProps {
  icon?: ReactElement
  text: string
}

export const NavListItem: FC<NavListItemProps> = ({ icon, text }) => {
  // this functions closed drawer with the input checkbox id = sideMenu
  const handleClick = useCallback(() => {
    const sideMenu = document.getElementById('sideMenu') as HTMLInputElement
    sideMenu.checked = false
  }, [])

  return (
    <li>
      <a type="button" onClick={handleClick} className="text-lg">
        {icon && icon}
        {text}
      </a>
    </li>
  )
}
