import { useEffect } from 'react'

const subscribers: Record<string, Function> = {}

const subscribe = (event: string, callback: Function) => {
    subscribers[event] = callback
    return () => {
        delete subscribers[event]
    }
}

export const emit = (event: string, ...args: any) => {
    if (subscribers[event]) {
        subscribers[event](...args)
    }
}

export const useEventbus = (event: string, callback: Function, deps = []) => {
    useEffect(() => subscribe(event, callback), deps)
}