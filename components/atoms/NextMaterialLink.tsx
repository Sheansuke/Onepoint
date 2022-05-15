import { FC } from 'react';
import NextLink from 'next/link'
import { Link } from '@mui/material'

interface NextMaterialLinkProps {
  children: JSX.Element
  href: string
  prefetch?: boolean
  key?: any
  underline?: boolean
}

export const NextMaterialLink: FC<NextMaterialLinkProps> = ({
  href,
  prefetch = false,
  key,
  underline = false,
  children
}) => {
  return (
    <NextLink passHref key={key} href={href} prefetch={prefetch}>
      <Link underline={underline ? "always" : "none"}>{children}</Link>
    </NextLink>
  )
}
