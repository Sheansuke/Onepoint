import React from 'react'
import { SignedOut } from '@clerk/nextjs';

export const SignedOutWrapper: React.FC = ({ children }) => {
    return (
        <SignedOut>{children}</SignedOut>
    )
}

