import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-blue-800 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-lg font-bold">Terms of Service</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-20">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h2>

            <p className="text-gray-600 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h3>
              <p className="text-gray-700 mb-4">
                By accessing and using Mentora (the "App"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use the App.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. User Accounts</h3>
              <p className="text-gray-700 mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information during registration and to update it as needed.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Paid Services</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>Payment Processing:</strong> All payments are processed through Razorpay. By making a purchase, you authorize us to charge the specified amount to your chosen payment method.
                </p>
                <p>
                  <strong>Pricing:</strong> Prices are subject to change. Current pricing for test series is:
                </p>
                <ul className="list-disc list-inside ml-2 space-y-2">
                  <li>Lucent Test Series: ₹59</li>
                  <li>Ghatnachakra Test Series: ₹59</li>
                </ul>
                <p>
                  <strong>No Refunds:</strong> All purchases are non-refundable except where required by law. Access to purchased test series is provided immediately upon successful payment.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. User Conduct</h3>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                <li>Use the App for any unlawful purposes</li>
                <li>Share your account access with others</li>
                <li>Attempt to gain unauthorized access to the App</li>
                <li>Transmit harmful or malicious code</li>
                <li>Harass or abuse other users</li>
                <li>Copy or redistribute content without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h3>
              <p className="text-gray-700 mb-4">
                All content, including questions, answers, and educational materials provided through the App, are the intellectual property of Mentora or its content providers. You may not reproduce, modify, or distribute this content without explicit permission.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. Disclaimer of Warranties</h3>
              <p className="text-gray-700 mb-4">
                The App is provided "AS IS" without warranties of any kind. We do not guarantee that the App will be error-free, uninterrupted, or that all content is accurate. We are not liable for any damages arising from your use of the App.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h3>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by law, Mentora shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the App.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">8. Termination</h3>
              <p className="text-gray-700 mb-4">
                We reserve the right to terminate or suspend your account at any time if you violate these Terms of Service or engage in any prohibited conduct. Upon termination, your right to access purchased content may be revoked.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">9. Changes to Terms</h3>
              <p className="text-gray-700 mb-4">
                We may update these Terms of Service at any time. Your continued use of the App following any changes constitutes your acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us through the App's support channels.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                By using Mentora, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
