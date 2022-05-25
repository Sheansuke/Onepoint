import { FC } from 'react';
import NextLink from 'next/link'

interface NextMaterialLinkProps {
  children: JSX.Element
  href: string
  prefetch?: boolean
  key?: any
  underline?: boolean
}

export const NextMaterialLink: FC<NextMaterialLinkProps> = ({
  href,
  prefetch = true,
  key,
  children
}) => {
  return (
    <NextLink passHref key={key} href={href} prefetch={prefetch}>
      {children}
    </NextLink>
  )
}
