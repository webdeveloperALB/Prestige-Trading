"use server"

export async function testAction(prevState: any, formData: FormData) {
  console.log("Server action called!")

  const email = formData.get("email")
  console.log("Email received:", email)

  return {
    success: true,
    message: "Test successful!",
  }
}
