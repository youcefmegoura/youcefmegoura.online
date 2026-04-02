'use client'

import Clarity from '@microsoft/clarity'
import { useEffect } from 'react'

export function ClarityProvider() {
    useEffect(() => {
        const id = process.env.NEXT_PUBLIC_CLARITY_ID
        if (!id || process.env.NODE_ENV !== 'production') return
        Clarity.init(id)
    }, [])

    return null
}