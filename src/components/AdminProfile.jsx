



// import React, { useContext, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
// import Swal from 'sweetalert2';
// import { Context } from './Context';

// // --- Styled Components (Dashboard Feel) ---
// const PageContainer = styled.div`
//   min-height: 100vh;
//   background-color: #111827;
//   padding: 2rem;
//   display: flex;
//   justify-content: center;
// `;

// const DashboardCard = styled.div`
//   background-color: #1f2937;
//   border-radius: 1.5rem;
//   padding: 2.5rem;
//   max-width: 600px;
//   width: 100%;
//   border: 1px solid #374151;
//   box-shadow: 0 10px 25px rgba(0,0,0,0.2);
// `;

// const HeaderSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1.5rem;
//   margin-bottom: 2rem;
//   padding-bottom: 1.5rem;
//   border-bottom: 1px solid #374151;
// `;

// const Avatar = styled.div`
//   background-color: #facc15;
//   color: #111827;
//   font-weight: 800;
//   border-radius: 1rem;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.8rem;
// `;

// const DetailRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 0;
//   border-bottom: 1px solid #374151;
// `;

// const Label = styled.span`
//   color: #9ca3af;
//   font-size: 0.9rem;
//   text-transform: uppercase;
//   letter-spacing: 0.05em;
// `;

// const Value = styled.span`
//   color: white;
//   font-weight: 500;
// `;

// const ActionGroup = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

// const EditButton = styled.button`
//   background: ${(props) => (props.primary ? "#facc15" : "#374151")};
//   color: ${(props) => (props.primary ? "#111827" : "white")};
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 0.5rem;
//   cursor: pointer;
//   font-weight: 600;
//   font-size: 0.85rem;
//   transition: 0.2s;
//   &:hover { opacity: 0.9; }
// `;

// // --- Component ---
// const AdminProfile = () => {
//   const {user, setUser, setRole} = useContext(Context);
//   const [phone, setPhone] = useState('');
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
//         if (docSnap.exists()) {
//           setPhone(docSnap.data().phone || '');
//           setRole(docSnap.data().role || "");
//         }
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handlePhoneSave = async () => {
//     try {
//       await updateDoc(doc(db, 'users', user.uid), { phone: phone });
//       Swal.fire({ icon: 'success', title: 'Updated!', text: 'Phone number updated.' });
//       setIsEditing(false);
//     } catch (err) {
//       Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update.' });
//     }
//   };

//   if (!user) return <PageContainer><DashboardCard>Loading Account Data...</DashboardCard></PageContainer>;

//   return (
//     <PageContainer>
//       <DashboardCard>
//         <HeaderSection>
//           <Avatar>{user?.displayName?.charAt(0) || 'U'}</Avatar>
//           <div>
//             <h2 style={{ margin: 0, color: 'white' }}>{user.displayName}</h2>
//             <p style={{ margin: 0, color: '#facc15' }}>Account Profile</p>
//           </div>
//         </HeaderSection>

//         <DetailRow>
//           <Label>Email Address</Label>
//           <Value>{user.email}</Value>
//         </DetailRow>

//         <DetailRow>
//           <Label>Phone Number</Label>
//           {isEditing ? (
//             <ActionGroup>
//               <input 
//                 style={{ background: '#374151', border: '1px solid #4b5563', color: 'white', borderRadius: '4px', padding: '5px' }}
//                 value={phone} 
//                 onChange={(e) => setPhone(e.target.value)} 
//               />
//               <EditButton primary onClick={handlePhoneSave}>Save</EditButton>
//               <EditButton onClick={() => setIsEditing(false)}>Cancel</EditButton>
//             </ActionGroup>
//           ) : (
//             <ActionGroup>
//               <Value>{phone || 'Not Set'}</Value>
//               <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
//             </ActionGroup>
//           )}
//         </DetailRow>

//         <DetailRow>
//           <Label>Account Created</Label>
//           <Value>{new Date(user.metadata.creationTime).toLocaleDateString()}</Value>
//         </DetailRow>
//       </DashboardCard>
//     </PageContainer>
//   );
// };

// export default AdminProfile;



import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // adjust path as needed
import Swal from 'sweetalert2';
import {
  FaPen,
  FaCheck,
  FaTimes,
  FaGraduationCap,
  FaGift,
  FaSignOutAlt,
  FaWallet,
  FaChartLine,
  FaCopy,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaIdBadge,
} from 'react-icons/fa';
import { Context } from './Context';

/* ------------------------------------------------------------------ */
/*  Theme tokens — matches the existing dashboard palette exactly      */
/* ------------------------------------------------------------------ */
const bg = '#111827';
const panel = '#1f2937';
const panelAlt = '#243044';
const border = '#374151';
const accent = '#facc15';
const accentDim = 'rgba(250, 204, 21, 0.12)';
const textMain = '#f9fafb';
const textMuted = '#9ca3af';
const success = '#34d399';

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${bg};
  color: ${textMain};
  width: 100%;
  padding: 1.5rem;

  @media (max-width: 428px) {
    padding: 0.75rem;
  }
`;

const Grid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

/* ------------------------------------------------------------------ */
/*  "Balance card" — the banking-app hero element                     */
/* ------------------------------------------------------------------ */
const BalanceCard = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1f2937 0%, #17202e 60%, #111827 100%);
  border: 1px solid ${border};
  border-radius: 1.25rem;
  padding: 1.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

  &::after {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: ${accentDim};
    filter: blur(10px);
  }
`;

const CardTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const IdentityBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;


  @media (max-width: 480px) {
  flex-direction: column;
  align-items: flex-start;
  }
`;

const Avatar = styled.div`
  background: linear-gradient(135deg, ${accent}, #eab308);
  color: #111827;
  font-weight: 800;
  border-radius: 9999px;
  width: 54px;
  height: 54px;
  min-width: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  text-transform: uppercase;
  box-shadow: 0 4px 14px rgba(250, 204, 21, 0.35);
`;

const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${textMain};
`;

const RoleTag = styled.span`
  font-size: 0.75rem;
  color: ${accent};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
`;

const StatusPill = styled.span`
  background: rgba(52, 211, 153, 0.12);
  color: ${success};
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: 9999px;
  border: 1px solid rgba(52, 211, 153, 0.3);
  white-space: nowrap;
`;

const MemberIdRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  color: ${textMuted};
  font-size: 0.8rem;
  position: relative;
  z-index: 1;
`;

const IconButtonGhost = styled.button`
  background: transparent;
  border: none;
  color: ${textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 0.8rem;

  &:hover {
    color: ${accent};
  }
`;

/* ------------------------------------------------------------------ */
/*  Quick actions — the row of round icon buttons banking apps use    */
/* ------------------------------------------------------------------ */
const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1.5rem;
  position: relative;
  z-index: 1;
`;

const QuickActionButton = styled.button`
  background: ${(props) => (props.$danger ? 'rgba(248,113,113,0.08)' : '#111827')};
  border: 1px solid ${(props) => (props.$danger ? 'rgba(248,113,113,0.35)' : border)};
  border-radius: 0.9rem;
  padding: 0.9rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: ${(props) => (props.$danger ? '#f87171' : textMain)};
  transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${(props) => (props.$danger ? '#f87171' : accent)};
    background: ${(props) => (props.$danger ? 'rgba(248,113,113,0.14)' : '#161f2e')};
  }

  span {
    font-size: 0.78rem;
    font-weight: 600;
  }
`;

const QuickActionIconWrap = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.$danger ? 'rgba(248,113,113,0.14)' : accentDim)};
  color: ${(props) => (props.$danger ? '#f87171' : accent)};
  font-size: 1rem;
`;

/* ------------------------------------------------------------------ */
/*  Generic panel used for stats / account details                    */
/* ------------------------------------------------------------------ */
const Panel = styled.div`
  background: ${panel};
  border: 1px solid ${border};
  border-radius: 1.1rem;
  padding: 1.4rem;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.1rem;
`;

const PanelTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${textMain};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PanelLink = styled.button`
  background: none;
  border: none;
  color: ${accent};
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

/* ------------------------------------------------------------------ */
/*  Course statistics                                                  */
/* ------------------------------------------------------------------ */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StatTile = styled.div`
  background: ${panelAlt};
  border: 1px solid ${border};
  border-radius: 0.85rem;
  padding: 0.9rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  color: ${accent};
`;

const StatLabel = styled.div`
  font-size: 0.72rem;
  color: ${textMuted};
  margin-top: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 9999px;
  background: #111827;
  margin-top: 1.1rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(90deg, ${accent}, #eab308);
  width: ${(props) => props.$pct}%;
  transition: width 0.4s ease;
`;

const ProgressCaption = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${textMuted};
  margin-top: 0.5rem;
`;

/* ------------------------------------------------------------------ */
/*  Account details rows                                               */
/* ------------------------------------------------------------------ */
const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${border};

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${textMuted};
  font-size: 0.85rem;
`;

const DetailValue = styled.div`
  color: ${textMain};
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EditInput = styled.input`
  padding: 0.4rem 0.65rem;
  border-radius: 0.5rem;
  border: 1px solid ${border};
  background: #111827;
  color: white;
  font-size: 0.85rem;
  width: 140px;
`;

const InlineIconButton = styled.button`
  background: ${(props) => (props.$primary ? accent : 'transparent')};
  color: ${(props) => (props.$primary ? '#111827' : textMuted)};
  border: ${(props) => (props.$primary ? 'none' : `1px solid ${border}`)};
  border-radius: 0.5rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;

  &:hover {
    opacity: 0.85;
  }
`;

/* ------------------------------------------------------------------ */
/*  Referral banner                                                    */
/* ------------------------------------------------------------------ */
const ReferralBanner = styled.div`
  background: linear-gradient(135deg, ${accentDim}, transparent);
  border: 1px dashed ${accent};
  border-radius: 1rem;
  padding: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ReferralText = styled.div`
  font-size: 0.85rem;
  color: ${textMuted};

  strong {
    color: ${textMain};
    display: block;
    font-size: 0.95rem;
    margin-bottom: 0.15rem;
  }
`;

const ReferralButton = styled.button`
  background: ${accent};
  color: #111827;
  border: none;
  padding: 0.55rem 1.1rem;
  border-radius: 0.6rem;
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #eab308;
  }
`;

const LoadingWrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${bg};
  color: ${textMain};
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/*  Props (all optional, wire these to your router / sidebar so the   */
/*  quick actions actually navigate — see notes at bottom of file):    */
/*    onNavigateCourses()  -> open "My Courses"                        */
/*    onNavigateReferral() -> open the referral page                   */
/*    onLogout()           -> your existing logout handler             */
/* ------------------------------------------------------------------ */
const AdminProfile = ({ onNavigateCourses, onNavigateReferral, onLogout }) => {
  const { user, setUser, setRole } = useContext(Context);
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [courseStats, setCourseStats] = useState({
    enrolled: 0,
    completed: 0,
    inProgress: 0,
  });
  const [referralCode, setReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPhone(data.phone || '');
          setRole(data.role || '');

          // These field names should match whatever you already store
          // per-user in Firestore for courses / referrals. Falls back
          // gracefully to 0 if the fields don't exist yet.
          setCourseStats({
            enrolled: data.coursesEnrolled ?? data.enrolledCount ?? 0,
            completed: data.coursesCompleted ?? data.completedCount ?? 0,
            inProgress: data.coursesInProgress ?? 0,
          });
          setReferralCode(data.referralCode || currentUser.uid.slice(0, 8).toUpperCase());
          setReferralCount(data.referralCount ?? 0);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePhoneSave = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        phone: phone,
      });

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Phone number updated successfully.',
      });

      setIsEditing(false);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update phone number.',
      });
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
      return;
    }
    // Fallback logout if no handler was passed in as a prop
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: 'You will need to log in again to access your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#facc15',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out',
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth).then(() => {
          Swal.fire({
            title: 'Logged Out',
            text: 'You have been logged out successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
        });
      }
    });
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Referral code copied to clipboard.',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (!user) {
    return (
      <LoadingWrap>
        <h2>Loading User...</h2>
      </LoadingWrap>
    );
  }

  const totalCourses = courseStats.enrolled || 0;
  const completedPct =
    totalCourses > 0 ? Math.round((courseStats.completed / totalCourses) * 100) : 0;

  return (
    <PageContainer>
      <Grid>
        {/* LEFT COLUMN */}
        <Column>
          <BalanceCard>
            <CardTopRow>
              <IdentityBlock>
                <Avatar>{user?.displayName?.charAt(0) || 'U'}</Avatar>
                <NameBlock>
                  <Name>Welcome To Your Dashboard</Name>
                 <Name style={{fontSize: '0.9rem'}}> Hi, {user?.displayName?.split(' ')[0] || ''}</Name>
                  <RoleTag>Member Account</RoleTag>
                </NameBlock>
              </IdentityBlock>
              <StatusPill>Active</StatusPill>
            </CardTopRow>

            <MemberIdRow>
              <FaIdBadge />
              Member ID: {user.uid.slice(0, 10).toUpperCase()}
              <IconButtonGhost
                onClick={() => {
                  navigator.clipboard.writeText(user.uid);
                  Swal.fire({
                    icon: 'success',
                    title: 'Copied!',
                    timer: 1200,
                    showConfirmButton: false,
                  });
                }}
              >
                <FaCopy />
              </IconButtonGhost>
            </MemberIdRow>
            <br/>
<h3 style={{textAlign: 'center'}}>------- Start Learning -------</h3>
            <QuickActions>
              <QuickActionButton onClick={onNavigateCourses}>
                <QuickActionIconWrap>
                  <FaGraduationCap />
                </QuickActionIconWrap>
                <span>My Courses</span>
                <span>(Start Learning)</span>
              </QuickActionButton>

              <QuickActionButton onClick={onNavigateReferral}>
                <QuickActionIconWrap>
                  <FaGift />
                </QuickActionIconWrap>
                <span>Referral</span>
              </QuickActionButton>

              <QuickActionButton $danger onClick={handleLogoutClick}>
                <QuickActionIconWrap $danger>
                  <FaSignOutAlt />
                </QuickActionIconWrap>
                <span>Log Out</span>
              </QuickActionButton>
            </QuickActions>
          </BalanceCard>

          <Panel>
            <PanelHeader>
              <PanelTitle>
                <FaChartLine /> Course Statistics
              </PanelTitle>
              <PanelLink onClick={onNavigateCourses}>View all</PanelLink>
            </PanelHeader>

            <StatsGrid>
              <StatTile>
                <StatValue>{courseStats.enrolled}</StatValue>
                <StatLabel>Enrolled</StatLabel>
              </StatTile>
              <StatTile>
                <StatValue>{courseStats.inProgress}</StatValue>
                <StatLabel>In Progress</StatLabel>
              </StatTile>
              <StatTile>
                <StatValue>{courseStats.completed}</StatValue>
                <StatLabel>Completed</StatLabel>
              </StatTile>
            </StatsGrid>

            <ProgressTrack>
              <ProgressFill $pct={completedPct} />
            </ProgressTrack>
            <ProgressCaption>
              <span>Overall completion</span>
              <span>{completedPct}%</span>
            </ProgressCaption>
          </Panel>

          <ReferralBanner>
            <ReferralText>
              <strong>Invite friends, earn rewards</strong>
              {referralCount} successful referral{referralCount === 1 ? '' : 's'} so far · code{' '}
              {referralCode}
            </ReferralText>
            <ReferralButton onClick={onNavigateReferral}>
              <FaGift style={{ marginRight: '0.4rem' }} />
              Go to Referrals
            </ReferralButton>
          </ReferralBanner>
        </Column>

        {/* RIGHT COLUMN */}
        <Column>
          <Panel>
            <PanelHeader>
              <PanelTitle>
                <FaWallet /> Account Details
              </PanelTitle>
            </PanelHeader>

            <DetailRow>
              <DetailLabel>
                <FaEnvelope /> Email
              </DetailLabel>
              <DetailValue>{user.email}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>
                <FaPhone /> Phone
              </DetailLabel>
              {isEditing ? (
                <DetailValue>
                  <EditInput
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoFocus
                  />
                  <InlineIconButton $primary onClick={handlePhoneSave}>
                    <FaCheck />
                  </InlineIconButton>
                  <InlineIconButton onClick={() => setIsEditing(false)}>
                    <FaTimes />
                  </InlineIconButton>
                </DetailValue>
              ) : (
                <DetailValue>
                  {phone || 'Not Provided'}
                  <InlineIconButton onClick={() => setIsEditing(true)}>
                    <FaPen />
                  </InlineIconButton>
                </DetailValue>
              )}
            </DetailRow>

            <DetailRow>
              <DetailLabel>
                <FaCalendarAlt /> Joined
              </DetailLabel>
              <DetailValue>
                {new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </DetailValue>
            </DetailRow>
          </Panel>

          <Panel>
            <PanelHeader>
              <PanelTitle>
                <FaGift /> Referral Snapshot
              </PanelTitle>
            </PanelHeader>
            <StatsGrid style={{ gridTemplateColumns: '1fr 1fr' }}>
              <StatTile>
                <StatValue>{referralCount}</StatValue>
                <StatLabel>Referrals</StatLabel>
              </StatTile>
              <StatTile>
                <StatValue style={{ fontSize: '1.1rem' }}>{referralCode}</StatValue>
                <StatLabel>Your Code</StatLabel>
              </StatTile>
            </StatsGrid>
            <ReferralButton
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={handleCopyReferral}
            >
              <FaCopy style={{ marginRight: '0.4rem' }} />
              Copy Referral Code
            </ReferralButton>
          </Panel>
        </Column>
      </Grid>
    </PageContainer>
  );
};

export default AdminProfile;

/* --------------------------------------------------------------------
   HOW TO WIRE THE NEW BUTTONS INTO AdminDashboard.jsx (no logic moved
   or duplicated — this just passes your existing handlers down as
   props so the profile page's Logout / My Courses / Referral buttons
   work exactly like the sidebar items already do):

   case 'profile':
     return (
       <AdminProfile
         onNavigateCourses={() => handleMenuClick('transactions')}
         onNavigateReferral={() => handleMenuClick('referral')}
         onLogout={handleLogout}
       />
     );

   If you don't yet have a 'referral' menu case / component, add one
   the same way 'transactions' is set up, then point onNavigateReferral
   at it. Until then the button will simply do nothing since
   onNavigateReferral will be undefined — everything else keeps working.
-------------------------------------------------------------------- */
