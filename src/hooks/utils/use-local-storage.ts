'use client'

import { useState, useEffect, useCallback } from 'react'

// eslint-disable-next-line no-unused-vars
type SetValue<T> = T | ((_prevValue: T) => T)

export function useLocalStorage<T>(
    key: string,
    initialValue: T
    // eslint-disable-next-line no-unused-vars
): [T, (_newValue: SetValue<T>) => void, () => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue
        }
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    const setValue = useCallback(
        (_newValue: SetValue<T>) => {
            try {
                const valueToStore = _newValue instanceof Function ? _newValue(storedValue) : _newValue
                setStoredValue(valueToStore)
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore))
                }
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error)
            }
        },
        [key, storedValue]
    )

    const removeValue = useCallback(() => {
        try {
            setStoredValue(initialValue)
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key)
            }
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error)
        }
    }, [key, initialValue])

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    setStoredValue(JSON.parse(e.newValue))
                } catch (error) {
                    console.warn(`Error parsing localStorage value for key "${key}":`, error)
                }
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [key])

    return [storedValue, setValue, removeValue]
}
