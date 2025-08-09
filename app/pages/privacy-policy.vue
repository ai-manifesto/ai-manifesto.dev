<template>
  <main>
    <h1 class="h2">
      Privacy Policy
    </h1>
    
    <div class="prose max-w-4xl">
      <p><strong>Last updated:</strong> 2025-08-09</p>
      
      <h2>1. Introduction</h2>
      <p>
        This privacy policy explains how we collect, use, and protect your personal information when you visit ai-manifesto.dev (the "Site"). 
        This Site is operated as a <strong>non-commercial project</strong> and we are committed to protecting your privacy in accordance with the 
        General Data Protection Regulation (GDPR) and other applicable privacy laws. We do not collect data for commercial purposes or analytics tracking.
      </p>
      
      <h2>2. Data Controller</h2>
      <p>
        The data controller for this website is the AI Manifesto project:<br />
        <NuxtLink
          to="https://github.com/orgs/ai-manifesto"
          target="_blank"
          rel="noopener"
          external
        >
          AI Manifesto Organization on GitHub
        </NuxtLink>
      </p>
      
      <h2>3. Information We Collect</h2>
      
      <h3>3.1 Information You Provide</h3>
      <ul>
        <li><strong>GitHub OAuth:</strong> When you sign up via GitHub, we receive only your public profile information including: username, display name, email address (if public), avatar URL, and profile URL. We do not access private repositories or any private data.</li>
        <li><strong>LinkedIn OAuth:</strong> When you sign up via LinkedIn, we receive only your public profile information including: name, profile picture, and public profile URL. We do not access your connections, private messages, or any private data.</li>
        <li><strong>Communications:</strong> When you contact us via email, we collect your email address and the content of your message.</li>
      </ul>
      
      <h3>3.2 Information Automatically Collected</h3>
      <ul>
        <li><strong>No Analytics Tracking:</strong> We do not use any analytics services, tracking cookies, or data collection tools. This is a privacy-first, non-commercial project.</li>
        <li><strong>Technical Data:</strong> Our hosting provider Vercel may collect minimal technical information such as IP addresses and access logs solely for security and performance purposes.</li>
      </ul>
      
      <h2>4. Legal Basis for Processing</h2>
      <p>We process your personal data based on the following legal grounds:</p>
      <ul>
        <li><strong>Consent:</strong> When you voluntarily sign the manifesto using OAuth authentication</li>
        <li><strong>Legitimate Interest:</strong> For website security and performance (minimal technical logs only)</li>
        <li><strong>Legal Obligation:</strong> When required to comply with applicable laws</li>
      </ul>
      
      <h2>5. Privacy Levels</h2>
      <p>When signing the manifesto, you can choose from three privacy levels:</p>
      <ul>
        <li><strong>Full Profile:</strong> Display your full name, optional profile picture, and clickable link to your profile</li>
        <li><strong>First Name Only:</strong> Display only your first name and optional profile picture, without any profile link</li>
        <li><strong>Anonymous:</strong> Display "Anonymous Supporter" with a generic avatar and no profile link</li>
      </ul>
      <p>You can control whether to show your profile picture for all non-anonymous privacy levels.</p>

      <h2>6. How We Use Your Information</h2>
      <p>We use your information only to:</p>
      <ul>
        <li>Display your public profile information in the signees list according to your chosen privacy level</li>
        <li>Authenticate users through GitHub or LinkedIn OAuth</li>
        <li>Respond to your inquiries and communications</li>
        <li>Ensure website security and prevent abuse</li>
        <li>Comply with legal obligations</li>
      </ul>
      <p><strong>We do not:</strong> sell your data or use it for any commercial purposes.</p>

      <h2>7. Data Sharing and Third Parties</h2>
      <p>We share your data with the following third-party services necessary for website operation:</p>
      
      <h3>7.1 GitHub</h3>
      <p>
        For user authentication. We only access your public profile information. GitHub's privacy policy applies: 
        <NuxtLink
          to="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
          target="_blank"
          rel="noopener"
          external
        >
          GitHub Privacy Statement
        </NuxtLink>
      </p>
      
      <h3>7.2 LinkedIn</h3>
      <p>
        For user authentication. We only access your public profile information. LinkedIn's privacy policy applies: 
        <NuxtLink
          to="https://www.linkedin.com/legal/privacy-policy"
          target="_blank"
          rel="noopener"
          external
        >
          LinkedIn Privacy Policy
        </NuxtLink>
      </p>
      
      <h3>7.3 Supabase</h3>
      <p>
        Our database hosting provider that stores signee information securely. Supabase's privacy policy applies: 
        <NuxtLink
          to="https://supabase.com/privacy"
          target="_blank"
          rel="noopener"
          external
        >
          Supabase Privacy Policy
        </NuxtLink>
      </p>
      
      <h3>7.4 Vercel</h3>
      <p>
        Our hosting provider processes minimal technical data for website delivery and security. Vercel's privacy policy applies: 
        <NuxtLink
          to="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener"
          external
        >
          Vercel Privacy Policy
        </NuxtLink>
      </p>
      
      <h2>8. Data Retention</h2>
      <ul>
        <li><strong>Signee Data:</strong> Retained until you request deletion or remove your signature</li>
        <li><strong>Email Communications:</strong> Retained for up to 2 years or until deletion is requested</li>
        <li><strong>Technical Logs:</strong> Retained by Vercel according to their retention policies (typically 30 days)</li>
        <li><strong>No Analytics Data:</strong> We don't collect any analytics or tracking data</li>
      </ul>
      
      <h2>9. Your Rights Under GDPR</h2>
      <p>You have the following rights regarding your personal data:</p>
      <ul>
        <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
        <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
        <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
        <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
        <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
        <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
        <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
      </ul>
      
      <p>
        To exercise these rights, please contact us at <NuxtLink to="mailto:mail@ai-manifesto.dev">
          mail@ai-manifesto.dev
        </NuxtLink>.
      </p>
      
      <h2>10. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, 
        alteration, disclosure, or destruction. This includes:
      </p>
      <ul>
        <li>HTTPS encryption for all data transmission</li>
        <li>Secure OAuth authentication through GitHub and LinkedIn</li>
        <li>Database hosted on Supabase with enterprise-grade security</li>
        <li>Regular security updates and monitoring</li>
        <li>Data minimization - we only collect what's necessary</li>
      </ul>
      
      <h2>11. International Data Transfers</h2>
      <p>
        Your data may be transferred to and processed in countries outside the European Economic Area (EEA), 
        including the United States (Vercel, GitHub, Supabase). These transfers are based on adequacy decisions, 
        standard contractual clauses, or other appropriate safeguards as required by GDPR.
      </p>
      
      <h2>12. Cookies and Tracking</h2>
      <p>
        This website does not use tracking cookies or analytics. GitHub and LinkedIn OAuth may set necessary session cookies 
        for authentication purposes only. We do not track individual users or collect behavioral data.
      </p>
      
      <h2>13. Non-Commercial Nature</h2>
      <p>
        This is a <strong>non-commercial, open-source project</strong> dedicated to promoting responsible AI development practices. 
        We do not monetize user data, display advertisements, or use data for any commercial purposes. 
        The source code is available at: <NuxtLink
          to="https://github.com/orgs/ai-manifesto"
          target="_blank"
          rel="noopener"
          external
        >
          AI Manifesto GitHub Organization
        </NuxtLink>
      </p>
      
      <h2>14. Changes to This Privacy Policy</h2>
      <p>
        We may update this privacy policy from time to time. Any changes will be posted on this page with an updated 
        "Last updated" date. For significant changes, we may provide additional notice.
      </p>
      
      <h2>15. Contact Information</h2>
      <p>
        If you have any questions about this privacy policy or our data practices, please contact us:
      </p>
      <ul>
        <li>
          Email: <NuxtLink to="mailto:mail@ai-manifesto.dev">
            mail@ai-manifesto.dev
          </NuxtLink>
        </li>
        <li>
          Website: <NuxtLink to="/">
            ai-manifesto.dev
          </NuxtLink>
        </li>
        <li>
          GitHub: <NuxtLink
            to="https://github.com/orgs/ai-manifesto"
            target="_blank"
            rel="noopener"
            external
          >
            AI Manifesto Organization
          </NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>
