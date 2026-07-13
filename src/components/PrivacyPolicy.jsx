
import React from "react";
import styled from "styled-components";

const PrivacyPolicy = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Privacy Policy</Title>
        <Updated>Last Updated: July 12, 2026</Updated>

        <Section>
          <Heading>1. Introduction</Heading>
          <Text>
            Welcome to EchoByte Digital Store. Your privacy is important to us.
            This Privacy Policy explains how we collect, use, store, and protect
            your personal information when you visit our website, purchase our
            online courses, or interact with our services.
          </Text>
        </Section>

        <Section>
          <Heading>2. Information We Collect</Heading>

          <SubHeading>Personal Information</SubHeading>
          <List>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing information</li>
            <li>Country or region</li>
          </List>

          <SubHeading>Technical Information</SubHeading>
          <List>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Website usage statistics</li>
          </List>
        </Section>

        <Section>
          <Heading>3. How We Use Your Information</Heading>

          <Text>Your information may be used to:</Text>

          <List>
            <li>Process your purchases.</li>
            <li>Create your student account.</li>
            <li>Provide access to purchased courses.</li>
            <li>Verify payments.</li>
            <li>Send purchase confirmations.</li>
            <li>Respond to customer support requests.</li>
            <li>Improve our website and services.</li>
            <li>Prevent fraud and unauthorized activities.</li>
            <li>Comply with legal obligations.</li>
          </List>
        </Section>

        <Section>
          <Heading>4. Payment Information</Heading>

          <Text>
            Payments are processed through trusted third-party payment providers.
            We do not store your debit card, credit card, or bank account
            details on our servers.
          </Text>

          <Text>
            We may receive payment confirmation details such as transaction
            references, payment status, payment method, and payer information
            necessary to complete your purchase.
          </Text>
        </Section>

        <Section>
          <Heading>5. Cookies</Heading>

          <Text>
            Our website uses cookies and similar technologies to improve your
            browsing experience, remember your preferences, maintain your login
            session, and analyze website traffic.
          </Text>

          <Text>
            You can control or disable cookies through your browser settings,
            although doing so may affect certain website features.
          </Text>
        </Section>

        <Section>
          <Heading>6. Information Sharing</Heading>

          <Text>
            We do not sell, rent, or trade your personal information.
          </Text>

          <Text>Your information may only be shared with:</Text>

          <List>
            <li>Payment service providers.</li>
            <li>Email delivery providers.</li>
            <li>Cloud hosting providers.</li>
            <li>Analytics providers.</li>
            <li>Law enforcement where legally required.</li>
          </List>
        </Section>

        <Section>
          <Heading>7. Data Security</Heading>

          <Text>
            We implement reasonable technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </Text>

          <Text>
            While we strive to protect your information, no method of internet
            transmission or electronic storage can be guaranteed to be 100%
            secure.
          </Text>
        </Section>

        <Section>
          <Heading>8. Data Retention</Heading>

          <Text>
            We retain your information only for as long as necessary to provide
            our services, maintain business records, comply with legal
            obligations, resolve disputes, and enforce our agreements.
          </Text>
        </Section>

        <Section>
          <Heading>9. Your Rights</Heading>

          <Text>
            Depending on your location and applicable law, you may have the
            right to:
          </Text>

          <List>
            <li>Access your personal information.</li>
            <li>Correct inaccurate information.</li>
            <li>Request deletion of your information.</li>
            <li>Withdraw consent where applicable.</li>
            <li>Object to certain processing activities.</li>
            <li>Request a copy of your personal data.</li>
          </List>
        </Section>

        <Section>
          <Heading>10. Third-Party Services</Heading>

          <Text>
            Our website may integrate third-party services including payment
            processors, analytics providers, email services, and cloud storage
            providers. These services operate under their own privacy policies,
            and we encourage you to review them.
          </Text>
        </Section>

        <Section>
          <Heading>11. Children's Privacy</Heading>

          <Text>
            Our services are not directed toward children under the age required
            by applicable law to use our services independently. We do not
            knowingly collect personal information from children without
            appropriate authorization where required.
          </Text>
        </Section>

        <Section>
          <Heading>12. International Users</Heading>

          <Text>
            If you access our services from outside the country in which we
            operate, your information may be transferred to and processed in
            jurisdictions with different data protection laws.
          </Text>
        </Section>

        <Section>
          <Heading>13. Policy Updates</Heading>

          <Text>
            We may update this Privacy Policy from time to time. Any changes
            will be published on this page together with the updated effective
            date.
          </Text>
        </Section>

        <Section>
          <Heading>14. Contact Us</Heading>

          <Text>
            If you have questions about this Privacy Policy or how your personal
            information is handled, please contact us through the contact
            details available on our website.
          </Text>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default PrivacyPolicy;

/* ================= STYLES ================= */

const Container = styled.div`
  min-height: 100vh;
  background: #111827;
  color: white;
  padding: 120px 20px 60px;
`;

const Wrapper = styled.div`
  max-width: 950px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Updated = styled.p`
  color: #9ca3af;
  margin-bottom: 50px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Heading = styled.h2`
  color: #22c55e;
  margin-bottom: 15px;
`;

const SubHeading = styled.h3`
  color: white;
  margin: 20px 0 10px;
`;

const Text = styled.p`
  color: #d1d5db;
  line-height: 1.9;
  margin-bottom: 15px;
`;

const List = styled.ul`
  color: #d1d5db;
  line-height: 2;
  padding-left: 20px;
`;

