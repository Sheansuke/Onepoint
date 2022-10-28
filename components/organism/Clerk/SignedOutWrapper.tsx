import React from 'react'
import { SignedOut } from '@clerk/nextjs'

export const SignedOutWrapper: React.FC<{ children: JSX.Element }> = ({
  children
}) => {
  return <SignedOut >{children}</SignedOut>
}
