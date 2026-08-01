import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 10px 25px rgba(96, 165, 250, 0.3);
  }
  50% {
    box-shadow: 0 15px 35px rgba(168, 85, 247, 0.5);
  }
`;

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #e4ecf3;
  color: #111827;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-out;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.6);
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(2px);
  }

  @media (min-width: 768px) {
    padding: 80px 40px;
  }
`;

const HeroContentBox = styled.div`
  position: relative;
  z-index: 10;
  padding: 20px;
  border-radius: 16px;
  max-width: 650px;
  margin: 0 10px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  margin-bottom: 12px;

  @media (min-width: 640px) {
    font-size: 2.4rem;
  }
`;

const StaticTitleText = styled.span`
  color: #111827;
  font-style: italic;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const GradientTitleText = styled.span`
  background: linear-gradient(to right, #2563eb, #4f46e5, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-style: italic;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.9);
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
  display: inline-block;
`;

const SubtitleText = styled.p`
  color: #374151;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.6;
  margin-bottom: 12px;

  @media (min-width: 640px) {
    font-size: 0.9rem;
  }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;

  @media (min-width: 640px) {
    padding: 32px;
  }
`;

const BodyText = styled.p`
  color: #4b5563;
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 640px) {
    font-size: 0.95rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FeatureCard = styled(GlassCard)`
  padding: 24px 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const EmojiIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 4px;
`;

const FeatureTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 1.05rem;
  }
`;

const FeatureDescription = styled.p`
  color: #4b5563;
  font-size: 0.8rem;
  line-height: 1.6;
  margin: 0;
`;

const ActionButton = styled.a`
  display: inline-block;
  width: 100%;
  text-decoration: none;
  box-sizing: border-box;

  @media (min-width: 640px) {
    width: auto;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(to right, #2563eb, #9333ea);
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  animation: ${pulseGlow} 3s infinite;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 25px rgba(147, 51, 234, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 640px) {
    width: auto;
    font-size: 0.9rem;
    padding: 14px 28px;
  }
`;

const SecondaryButton = styled(StyledButton)`
  background: linear-gradient(to right, #4f46e5, #9333ea);
  padding: 10px 20px;
  font-size: 0.8rem;
`;

const LargeActionButton = styled(StyledButton)`
  font-weight: 700;
  font-size: 0.85rem;
  padding: 14px 28px;

  @media (min-width: 640px) {
    font-size: 0.95rem;
  }
`;

const CalloutText = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.6;
  max-width: 550px;
  margin: 0 auto;

  @media (min-width: 640px) {
    font-size: 0.85rem;
  }
`;

// Component
const VirtualAssistantPromo = () => {
  const enrollmentUrl = 'https://chat.whatsapp.com/JJwtnyd8MRs1f04mSrTAMi?s=cl&p=a&ilr=1&amv=1';

  // useEffect(() => {
  //   // Direct same-tab redirection on page load
  //   window.location.href = enrollmentUrl;
  // }, [enrollmentUrl]);

  return (
    <PageContainer>
      <ContentWrapper>
        
        {/* Hero Banner Section */}
        <HeroSection>
          <HeroContentBox>
            <Title>
              <StaticTitleText>VIRTUAL ASSISTANT</StaticTitleText>{' '}
              <GradientTitleText>TRAINING</GradientTitleText>
            </Title>
            
            <SubtitleText>
              Have you ever wished you could earn money from the comfort of your home without needing years of experience?
            </SubtitleText>

            <ActionButton href={enrollmentUrl} target="_blank" rel="noopener noreferrer">
              <StyledButton>
                <span>Enroll Today</span>
                <span>🚀</span>
              </StyledButton>
            </ActionButton>
          </HeroContentBox>
        </HeroSection>

        {/* Value Proposition Section */}
        <GlassCard>
          <BodyText>
            If you&apos;re a woman looking for a flexible skill that can open doors to remote job opportunities, then this is for you.
          </BodyText>
          <BodyText>
            I created this Virtual Assistant Course to teach you the practical skills businesses are looking for—from email and calendar management to client communication, organization, and the tools virtual assistants use every day.
          </BodyText>
          
          <div style={{ marginTop: '8px' }}>
            <ActionButton href={enrollmentUrl} target="_blank" rel="noopener noreferrer">
              <SecondaryButton>
                <span>Secure Your Spot</span>
                <span>💼</span>
              </SecondaryButton>
            </ActionButton>
          </div>
        </GlassCard>

        {/* Features Grid */}
        <GridContainer>
          <FeatureCard>
            <EmojiIcon>🕒</EmojiIcon>
            <FeatureTitle>Learn At Your Own Pace</FeatureTitle>
            <FeatureDescription>
              You can learn at your own pace on our online platform. Once you enroll, you&apos;ll get your own account and can start learning immediately, anytime and anywhere.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <EmojiIcon>📜</EmojiIcon>
            <FeatureTitle>Certificate of Participation</FeatureTitle>
            <FeatureDescription>
              And when you complete the course, you&apos;ll receive an official Certificate of Participation to recognize your learning journey and boost your profile.
            </FeatureDescription>
          </FeatureCard>
        </GridContainer>

        {/* Bottom CTA Section */}
        <GlassCard style={{ padding: '32px 20px' }}>
          <Title style={{ fontSize: '1.4rem', fontFamily: 'system-ui, sans-serif', fontWeight: 'bold' }}>
            Ready to Create More Flexibility in Your Life? ✨
          </Title>
          <BodyText>
            Don&apos;t keep waiting for the perfect opportunity. Start building a skill that can help you work remotely and create more flexibility in your life.
          </BodyText>
          <CalloutText>
            Click the link below, enroll today, and take the first step toward becoming a confident Virtual Assistant. I can&apos;t wait to welcome you inside the course!
          </CalloutText>

          <div style={{ marginTop: '12px', width: '100%' }}>
            <ActionButton href={enrollmentUrl} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
              <LargeActionButton>
                <span>Enroll in the Virtual Assistant Course Now</span>
                <span>🚀</span>
              </LargeActionButton>
            </ActionButton>
          </div>
        </GlassCard>

      </ContentWrapper>
    </PageContainer>
  );
};

export default VirtualAssistantPromo;