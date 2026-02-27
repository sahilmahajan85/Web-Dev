import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactS(){
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_phmed1c', 'template_71d9ip9', form.current, {
        publicKey: 'hap2asLEDkuZtjmbN',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    
        
  );
};


    
