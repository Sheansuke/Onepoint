import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export default withClerkMiddleware((req: NextRequest) => {
  const { sessionId, userId, claims, getToken, orgId } = getAuth(req);

   if(!userId){
    
  } 
  // Do anything you need in your middleware. 
  
  return NextResponse.next();
});

// Stop Middleware running on static files like images
export const config = { matcher: '/((?!.*\\.).*)' }