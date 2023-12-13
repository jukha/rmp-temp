import { Link } from "react-router-dom";

function TermsOfUse() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-3xl font-extrabold">Terms of Use</h1>
      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">
          1. Intellectual Property Rights
        </h2>
        <p>
          The content, design, and functionality of the Website are the
          intellectual property of [Your Company] and are protected by
          applicable copyright and trademark laws. You may not reproduce,
          distribute, or display any portion of the Website without our prior
          written consent.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">2. User Conduct</h2>
        <p>
          When using the Website, you agree to:
          <ul>
            <li>Abide by all applicable laws and regulations.</li>
            <li>Avoid engaging in any unlawful or harmful activities.</li>
            <li>Respect the privacy and rights of other users.</li>
          </ul>
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">3. Content</h2>
        <p>
          We may provide information, materials, or other content on the
          Website. While we strive for accuracy, we do not warrant the
          completeness or accuracy of any information on the Website.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">4. Privacy</h2>
        <p>
          Your use of the Website is also governed by our Privacy Policy, which
          can be found{" "}
          <Link className="underline" to="/privacy-policy">
            here
          </Link>
          .
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">5. Limitation of Liability</h2>
        <p>
          In no event shall [Your Company] be liable for any indirect,
          consequential, or incidental damages arising out of the use or
          inability to use the Website.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">6. Modifications</h2>
        <p>
          We reserve the right to modify these Terms at any time. By continuing
          to use the Website after changes are posted, you accept the modified
          Terms.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">7. Termination</h2>
        <p>
          We may terminate or suspend your access to the Website without prior
          notice for any violation of these Terms.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">8. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of [Your Jurisdiction], and you submit to the exclusive jurisdiction
          of the courts in that jurisdiction.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:your@email.com">your@email.com</a>.
        </p>
      </section>
    </main>
  );
}

export default TermsOfUse;
