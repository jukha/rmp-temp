import React from "react";

function SiteGuidelines() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-3xl font-extrabold">Site Guidelines</h1>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">The Site/App</h2>
        <p>
          [Company Name] is [brief description]. Our mission is to [mission
          statement].
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">How We Work</h2>
        <p>
          [Company Name] has a team of moderators who read every [specific
          content] submitted. We have defined site guidelines to help reinforce
          our mission and ensure our decisions around moderation are 100%
          consistent, regardless of [user or role]. Our moderators are experts
          on our guidelines and will remove any content that doesn’t comply.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">Guidelines</h2>
        <h3 className="mb-2">Student Guidelines:</h3>
        <ul>
          <li>Be honest in your [specific content].</li>
          <li>
            When you are [specific content], it’s often helpful to provide both
            pros and cons.
          </li>
          {/* ... add more guidelines as needed */}
        </ul>

        <h3 className="mb-2">Prohibited Content:</h3>
        <p>Comments that contain the following will be removed:</p>
        <ul>
          <li>Profanity, name-calling, and/or vulgarity.</li>
          <li>Identifiable information about [specific roles].</li>
          {/* ... add more prohibited content as needed */}
        </ul>

        <h3 className="mb-2">Professor Guidelines:</h3>
        <p>
          This is an anonymous website where [students] can share their
          [experiences]. [Additional professor guidelines]
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">
          Flagging a [specific content]
        </h2>
        <p>
          If you see [specific content] that you believe violates these Site
          Guidelines, please [provide instructions]. Such [specific content]
          will be evaluated by the Site's personnel. Please do not flag
          [specific content] just because you disagree with it.
        </p>
      </section>

      {/* ... Additional sections as needed, e.g., "Some Legal Stuff," "Reservation of Rights" */}

      <section className="mb-4">
        <h2 className="mb-2 text-xl font-medium">Contact Information</h2>
        <p>
          If you have any questions about these Site Guidelines, please contact
          us at <a href="mailto:your@email.com">your@email.com</a>.
        </p>
      </section>
    </main>
  );
}

export default SiteGuidelines;
