import dynamic from 'next/dynamic'
import React from 'react'

export const Codepen = dynamic<{ className?: string }>(
    async () => await import('@icons/codepen.svg'),
    {
      loading: () => <span />,
      ssr: false
    }
)

export const ExternalLink = dynamic<{ className?: string }>(
    async () => await import('@icons/external-link.svg'),
    {
      loading: () => <span />,
      ssr: false
    }
)

export const Folder = dynamic<{ className?: string }>(
    async () => await import('@icons/folder.svg'),
    {
      loading: () => <span />,
      ssr: false
    }
)

export const Github = dynamic(
    async () => await import('@icons/github.svg'),
    {
        loading: () => <span />,
        ssr: false
    }
)

export const LinkedIn = dynamic<{ className?: string }>(
    async () => await import('@icons/linkedin.svg'),
    {
      loading: () => <span />,
      ssr: false
    }
)

export function IconMapper (icon: string): React.ReactElement | null {
    switch (icon) {
        case 'codepen':
            return <Codepen />
        
        case 'external-link':
            return <ExternalLink />

        case 'folder':
            return <Folder />

        case 'github':
            return  <Github />
            
        case 'linkedin':
            return <LinkedIn /> 

        default:
            return null
    }
}