import NewsletterForm from "@/components/newsletter-form"

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Stay Updated</h1>
          <p className="text-xl text-gray-600">Join thousands of subscribers who get our latest content first.</p>
        </div>

        <NewsletterForm />

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What you'll get:</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Weekly Updates</h3>
              <p className="text-gray-600">Latest news and insights delivered every week.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Exclusive Content</h3>
              <p className="text-gray-600">Access to subscriber-only articles and resources.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">No Spam</h3>
              <p className="text-gray-600">We respect your inbox. Quality over quantity.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
