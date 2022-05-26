import { FC } from 'react';
import NextLink from 'next/link'

interface NextMaterialLinkProps {
  children: JSX.Element
  href: string
  underline?: boolean
}

export const NextMaterialLink: FC<NextMaterialLinkProps> = ({
  href,
  children
}) => {
  return (
    <NextLink passHref  href={href}>
      {children}
    </NextLink>
  )
}
