<main></main>;
import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-3xl font-extrabold">Privacy Policy</h1>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">1. Information We Collect</h2>
        <p>
          We may collect and process the following information about you:
          <ul>
            <li>Information you provide when using our website.</li>
            <li>
              Information collected through cookies and similar technologies.
            </li>
            <li>Any other information you choose to send us.</li>
          </ul>
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">
          2. How We Use Your Information
        </h2>
        <p>
          We use the information we collect for various purposes, including:
          <ul>
            <li>Providing and maintaining our services.</li>
            <li>Improving our website and user experience.</li>
            <li>Sending you updates and promotional materials.</li>
          </ul>
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">3. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track the activity
          on our website and store certain information. You can instruct your
          browser to refuse all cookies or to indicate when a cookie is being
          sent.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">4. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. Please note
          that we have no control over the content and practices of these sites
          and cannot be responsible for their privacy policies.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">5. Security</h2>
        <p>
          We value your trust in providing us your personal information, and we
          are committed to using industry-standard measures to protect it.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">
          6. Changes to This Privacy Policy
        </h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at <a href="mailto:your@email.com">your@email.com</a>.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
