import React, { useState } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #111827;
  color: white;
  padding: 5rem 1rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #1f2937;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #4b5563;
  background-color: #374151;
  color: white;
  margin-bottom: 1.5rem;

  ::placeholder {
    color: #9ca3af;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #4b5563;
  background-color: #374151;
  color: white;
  margin-bottom: 1.5rem;

  ::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: #facc15;
  color: black;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fde047;
  }
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: #d1d5db;
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 1.125rem;
  color: #facc15;
`;

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    Swal.fire({ text: 'Please wait...' });
    Swal.showLoading();

    try {
    //   const res = await fetch('https://echobyteconcept.vercel.app/api/contact', {
             const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('Message sent!');
        setForm({ name: '', email: '', phone: '', message: '' });
        Swal.fire({
          text: 'Congratulations, your message has been sent and we shall get back to you as soon as possible. Thanks',
          icon: 'success',
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      setStatus('Something went wrong. Please try again.');
      Swal.fire({ icon: 'error', text: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <Section>
      <Title>Contact Us Now</Title>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="phone"
            placeholder="Your Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />
          <Button type="submit">Send Message</Button>
        </form>

        <ContactInfo>
          📞 +234 706 348 0314 &nbsp;|&nbsp; 📧 echobyteconcept@gmail.com
        </ContactInfo>

        {status && <StatusMessage>{status}</StatusMessage>}
      </FormWrapper>
    </Section>
  );
};

export default ContactForm;

