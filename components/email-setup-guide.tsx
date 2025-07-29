export default function EmailSetupGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">📧 Newsletter Email Setup Guide</h1>

      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">⚠️ Current Status</h2>
          <p className="text-yellow-700">
            Your newsletter is currently only logging to the console. No actual emails are being sent.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">🚀 Setup Real Email Delivery</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-blue-700">Step 1: Install Resend</h3>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">npm install resend</code>
            </div>

            <div>
              <h3 className="font-semibold text-blue-700">Step 2: Get Resend API Key</h3>
              <ol className="list-decimal list-inside text-sm space-y-1 ml-4">
                <li>
                  Go to{" "}
                  <a href="https://resend.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                    resend.com
                  </a>
                </li>
                <li>Sign up for a free account</li>
                <li>Go to API Keys section</li>
                <li>Create a new API key</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-blue-700">Step 3: Add Environment Variable</h3>
              <p className="text-sm mb-2">
                Add this to your <code>.env.local</code> file:
              </p>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm block">RESEND_API_KEY=re_your_api_key_here</code>
            </div>

            <div>
              <h3 className="font-semibold text-blue-700">Step 4: Update Email Addresses</h3>
              <p className="text-sm mb-2">In the newsletter action, replace:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>
                  <code>newsletter@yourdomain.com</code> → Your verified domain email
                </li>
                <li>
                  <code>admin@yourdomain.com</code> → Your admin email address
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-700">Step 5: Verify Your Domain (Optional)</h3>
              <p className="text-sm">For better deliverability, verify your domain in Resend dashboard</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-green-800 mb-2">✅ What Happens After Setup</h2>
          <ul className="list-disc list-inside text-green-700 space-y-1">
            <li>Subscribers receive a welcome email immediately</li>
            <li>You get notified of new subscriptions</li>
            <li>All emails are tracked in Resend dashboard</li>
            <li>Professional email templates are used</li>
          </ul>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🔍 Current Behavior</h2>
          <p className="text-gray-700 mb-2">Right now, when someone subscribes:</p>
          <ol className="list-decimal list-inside text-gray-600 space-y-1 ml-4">
            <li>Form submission is processed</li>
            <li>Email is logged to your server console</li>
            <li>Success message is shown to user</li>
            <li>
              <strong>No actual email is sent</strong>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
