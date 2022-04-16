import React from 'react'
import { SignedIn } from '@clerk/nextjs';

export const SignedInWrapper: React.FC = ({ children }) => {

    return (
        <SignedIn >{children}</SignedIn>
    )
}

