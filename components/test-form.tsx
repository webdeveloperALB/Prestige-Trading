"use client"

import { useActionState } from "react"
import { testAction } from "@/app/actions/test-action"

export default function TestForm() {
  const [state, action, isPending] = useActionState(testAction, null)

  return (
    <div className="p-4">
      <h2>Test Form</h2>
      <form action={action}>
        <input type="email" name="email" placeholder="test@example.com" required />
        <button type="submit" disabled={isPending}>
          {isPending ? "Testing..." : "Test"}
        </button>
      </form>

      {state && (
        <div className="mt-4">
          <p>Success: {state.success ? "Yes" : "No"}</p>
          <p>Message: {state.message}</p>
        </div>
      )}
    </div>
  )
}
