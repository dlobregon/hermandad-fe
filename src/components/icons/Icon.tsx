import React from 'react'
import HamburguerMenu from './HamburgerMenu'
import HomeIcon from './HomeIcon'
import CloseMenu from './CloseMenu'
import TurnoBase from './TurnoBase'
import UserIcon from './UserIcon'

const icons = {
  home: <HomeIcon />,
  menu: <HamburguerMenu />,
  closeMenu: <CloseMenu />,
  people: <UserIcon />,
  turno: <TurnoBase />
} as const

interface IconProperties {
  name: keyof typeof icons
}
const Icon: React.FC<IconProperties> = (props: IconProperties) => {
  const { name } = props
  return (
  <>
   {icons[name]}
  </>
  )
}

export default Icon
