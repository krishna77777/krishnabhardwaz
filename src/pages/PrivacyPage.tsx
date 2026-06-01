import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-blue-800 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-lg font-bold">Privacy Policy</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-20">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>

            <p className="text-gray-600 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h3>
              <p className="text-gray-700 mb-4">
                Mentora ("we", "us", "our", or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h3>
              <div className="text-gray-700 space-y-4">
                <div>
                  <p className="font-semibold mb-2">Personal Information:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Email address</li>
                    <li>Password (encrypted)</li>
                    <li>User profile information</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Payment Information:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Purchase history and transaction records</li>
                    <li>Payment method details (processed through Razorpay)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Usage Data:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Quiz and test answers</li>
                    <li>Score and performance data</li>
                    <li>Time spent on tests</li>
                    <li>App usage patterns</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h3>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                <li>Provide and maintain the App and its services</li>
                <li>Process purchases and send transaction receipts</li>
                <li>Personalize your learning experience</li>
                <li>Send you updates and notifications about your progress</li>
                <li>Improve and optimize the App's functionality</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Payment Processing</h3>
              <p className="text-gray-700 mb-4">
                We use Razorpay for payment processing. Your payment information is handled securely by Razorpay according to their privacy policy. We do not store your complete payment card details. For more information, visit <a href="https://razorpay.com/privacy" className="text-blue-600 hover:underline">Razorpay's Privacy Policy</a>.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h3>
              <p className="text-gray-700 mb-4">
                We employ industry-standard security measures to protect your personal information, including encryption and secure databases. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. Third-Party Services</h3>
              <p className="text-gray-700 mb-4">
                Our App uses third-party services such as Supabase (database) and Razorpay (payments). These services have their own privacy policies, and we encourage you to review them:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                <li><a href="https://supabase.com/privacy" className="text-blue-600 hover:underline">Supabase Privacy Policy</a></li>
                <li><a href="https://razorpay.com/privacy" className="text-blue-600 hover:underline">Razorpay Privacy Policy</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h3>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">8. Cookies and Tracking</h3>
              <p className="text-gray-700 mb-4">
                The App may use cookies and local storage to enhance your experience, remember login information, and track app usage. You can control cookie settings through your device settings.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">9. Children's Privacy</h3>
              <p className="text-gray-700 mb-4">
                The App is intended for users who are 13 years of age or older. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information and terminate the child's account.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">10. Changes to This Policy</h3>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy in the App with a new "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">11. Contact Us</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us through the App's support channels.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                By using Mentora, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
