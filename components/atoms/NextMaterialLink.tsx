import React, { FC } from 'react'
import NextLink from 'next/link'
import { Link } from '@mui/material'

interface NextMaterialLinkProps {
  children: JSX.Element
  href: string
  prefetch?: boolean
  key?: any
}

export const NextMaterialLink: FC<NextMaterialLinkProps> = ({
  href,
  prefetch = false,
  key,
  children
}) => {
  return (
    <NextLink passHref key={key} href={href} prefetch={prefetch}>
      <Link>{children}</Link>
    </NextLink>
  )
}
