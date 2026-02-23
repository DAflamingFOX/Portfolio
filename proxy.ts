import { NextRequest, NextResponse } from "next/server";
import { checkSubdomainRedirects } from "./lib/redirects";

export function proxy(request: NextRequest) {
    const redirectResponse = checkSubdomainRedirects(request)

    if (redirectResponse) {
        return redirectResponse
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}