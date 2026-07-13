
import React from "react";
import styled from "styled-components";

const TermsAndConditions = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Terms & Conditions</Title>
        <Updated>Last Updated: July 12, 2026</Updated>

        <Section>
          <Heading>1. Acceptance of Terms</Heading>
          <Text>
            Welcome to EchoByte Digital Store. By accessing, browsing, purchasing
            from, or using this website, you acknowledge that you have read,
            understood, and agreed to be bound by these Terms and Conditions. If
            you do not agree with any part of these Terms, you should not use this
            website or purchase any products from us.
          </Text>
        </Section>

        <Section>
          <Heading>2. Our Services</Heading>
          <Text>
            EchoByte Digital Store provides digital educational products,
            primarily online courses. We reserve the right to modify, suspend,
            replace, or discontinue any course or service at any time without
            prior notice.
          </Text>
        </Section>

        <Section>
          <Heading>3. Eligibility</Heading>
          <Text>
            By using this website, you confirm that you are at least 18 years of
            age or are using the website under the supervision of a parent or
            legal guardian who accepts these Terms on your behalf.
          </Text>
        </Section>

        <Section>
          <Heading>4. Account Responsibility</Heading>
          <Text>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities carried out using your
            account. We are not liable for any loss arising from unauthorized
            access resulting from your failure to protect your login information.
          </Text>
        </Section>

        <Section>
          <Heading>5. Payments</Heading>
          <Text>
            All payments must be completed through our approved payment
            processors. Access to purchased courses is granted only after payment
            has been successfully verified. We reserve the right to cancel,
            refuse, or reverse any transaction suspected to involve fraud,
            chargebacks, unauthorized payments, or illegal activity.
          </Text>
        </Section>

        <Section>
          <Heading>6. Refund Policy</Heading>
          <Text>
            Due to the digital nature of our products, all sales are generally
            final once access has been granted. Refunds may only be considered in
            exceptional circumstances at our sole discretion where required by
            applicable law or where we determine that a technical issue on our
            part prevented delivery of the purchased course.
          </Text>
        </Section>

        <Section>
          <Heading>7. Intellectual Property</Heading>
          <Text>
            All courses, videos, documents, graphics, text, downloadable
            materials, branding, logos, software, and other content remain the
            exclusive intellectual property of EchoByte Digital Store or its
            licensors.
          </Text>

          <Text>
            You may not reproduce, copy, redistribute, upload, record, stream,
            translate, modify, resell, sublicense, publicly display, or create
            derivative works from any course content without our prior written
            permission.
          </Text>
        </Section>

        <Section>
          <Heading>8. License to Use</Heading>
          <Text>
            Purchasing a course grants you a limited, non-exclusive,
            non-transferable, revocable license for your personal educational use
            only. Ownership of the course or its contents is not transferred to
            you.
          </Text>
        </Section>

        <Section>
          <Heading>9. Prohibited Conduct</Heading>
          <Text>
            Users must not:
          </Text>

          <List>
            <li>Share purchased courses with others.</li>
            <li>Download or copy content without authorization.</li>
            <li>Attempt to bypass security or payment systems.</li>
            <li>Reverse engineer any software or platform features.</li>
            <li>Upload viruses or malicious code.</li>
            <li>Use automated tools to scrape website content.</li>
            <li>Impersonate another person.</li>
            <li>Use the platform for unlawful purposes.</li>
          </List>
        </Section>

        <Section>
          <Heading>10. Course Availability</Heading>
          <Text>
            We strive to provide continuous access to purchased courses.
            However, temporary interruptions may occur due to maintenance,
            technical failures, internet outages, or circumstances beyond our
            control. We do not guarantee uninterrupted availability.
          </Text>
        </Section>

        <Section>
          <Heading>11. Educational Disclaimer</Heading>
          <Text>
            Our courses are intended for educational purposes only. We do not
            guarantee employment, business success, income, certifications,
            examination results, promotions, or any specific outcome resulting
            from the use of our courses.
          </Text>
        </Section>

        <Section>
          <Heading>12. Limitation of Liability</Heading>
          <Text>
            To the maximum extent permitted by applicable law, EchoByte Digital
            Store, its owners, employees, instructors, affiliates, and partners
            shall not be liable for any direct, indirect, incidental,
            consequential, punitive, or special damages arising from your use of
            the website or any purchased course.
          </Text>
        </Section>

        <Section>
          <Heading>13. Indemnification</Heading>
          <Text>
            You agree to indemnify and hold harmless EchoByte Digital Store, its
            owners, employees, contractors, and affiliates from any claims,
            damages, losses, liabilities, costs, or legal expenses arising from
            your misuse of the website, violation of these Terms, or infringement
            of any third-party rights.
          </Text>
        </Section>

        <Section>
          <Heading>14. Privacy</Heading>
          <Text>
            We collect and process personal information in accordance with our
            Privacy Policy. By using our services, you consent to such
            collection, storage, and processing.
          </Text>
        </Section>

        <Section>
          <Heading>15. Suspension or Termination</Heading>
          <Text>
            We reserve the right to suspend or permanently terminate your account
            without prior notice if we believe you have violated these Terms,
            engaged in fraudulent activity, abused the platform, or infringed our
            intellectual property rights.
          </Text>
        </Section>

        <Section>
          <Heading>16. Changes to These Terms</Heading>
          <Text>
            We may revise these Terms at any time. Continued use of the website
            after changes have been published constitutes your acceptance of the
            revised Terms.
          </Text>
        </Section>

        <Section>
          <Heading>17. Governing Law</Heading>
          <Text>
            These Terms shall be governed by and interpreted in accordance with
            the applicable laws of the jurisdiction in which EchoByte Digital
            Store operates, without regard to conflict of law principles.
          </Text>
        </Section>

        <Section>
          <Heading>18. Contact Us</Heading>
          <Text>
            If you have any questions regarding these Terms and Conditions,
            please contact us through the contact information provided on our
            website.
          </Text>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default TermsAndConditions;

/* ==================== STYLES ==================== */

const Container = styled.div`
  min-height: 100vh;
  background: #111827;
  color: #fff;
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
  font-size: 1.4rem;
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
