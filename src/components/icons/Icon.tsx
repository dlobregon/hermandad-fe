import React from 'react'
import HamburguerMenuIcon from './HamburgerMenuIcon'
import HomeIcon from './HomeIcon'
import CloseMenuIcon from './CloseMenuIcon'
import TurnoBaseIcon from './TurnoBaseIcon'
import UserIcon from './UserIcon'
import DevotoIcon from './DevotoIcon'
import BackArrowIcon from './BackArrowIcon'

const icons = {
  home: <HomeIcon />,
  menu: <HamburguerMenuIcon />,
  closeMenu: <CloseMenuIcon />,
  people: <UserIcon />,
  turno: <TurnoBaseIcon />,
  devoto: <DevotoIcon />,
  backArrow: <BackArrowIcon />
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
