"use client"

import type React from "react"

// Custom React hooks for CRM

import { useState, useCallback, useEffect } from "react"
import { apiCall } from "./auth-client"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiCall("/auth/me")
        setUser(response.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading }
}

export function useFetch<T>(url: string, skip = false) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (skip) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await apiCall(url)
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, skip])

  return { data, loading, error, setData }
}

export function useForm<T extends Record<string, any>>(initialValues: T, onSubmit: (values: T) => Promise<void>) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Partial<T>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setValues((prev) => ({ ...prev, [name]: value }))
      if (errors[name as keyof T]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    },
    [errors],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      try {
        await onSubmit(values)
      } catch (err) {
        setErrors({ [Object.keys(values)[0] as keyof T]: "Submission failed" })
      } finally {
        setLoading(false)
      }
    },
    [values, onSubmit],
  )

  return { values, errors, loading, handleChange, handleSubmit, setValues }
}
