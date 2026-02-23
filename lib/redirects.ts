import { NextRequest, NextResponse } from "next/server"

const SUBDOMAIN_REDIRECTS: Record<string, string> = {
    'blog': '/blog',
    'projects': '/projects',
    'resume': '/resume',
    'contact': '/contact_me',
    'hello': '/contact_me',
}

export function checkSubdomainRedirects(request: NextRequest) {
    const host = request.headers.get('host')
    if (!host) return null

    for (const [subdomain, targetPath] of Object.entries(SUBDOMAIN_REDIRECTS)) {

        // Check if host starts with "subdomain." (e.g., "blog.")
        const prefix = `${subdomain}.`

        if (host.startsWith(prefix)) {
            const newHost = host.replace(prefix, '')

            const url = request.nextUrl.clone()
            const protocol = url.protocol

            const dest = new URL(
                `${protocol}//${newHost}${targetPath}${url.pathname}${url.search}`
            )

            return NextResponse.redirect(dest)
        }
    }

    // Return null if no subdomain matched
    return null
}