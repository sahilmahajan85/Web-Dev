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
    
        <div className="contact" id="contact">
            <h1>Contact Me</h1>
            <div className="social">
                <div className="links">
              <div className="inlin"><i class="fa-solid fa-phone" id='lar'></i><p className="sty">+91 8103426353</p> </div> 
              <div className="inlin"> <i class="fa-brands fa-linkedin" id='lar'></i><a href="https://www.linkedin.com/in/sahil-mahajan-9b03552b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Linkedin</a>  </div>
              <div className="inlin"> <i class="fa-regular fa-envelope" id='lar'></i> <p  className="sty">mahajan.sd0108@gmail.com</p></div>
              <div className="inlin"> <i class="fa-brands fa-github" id='lar'></i><a href="https://github.com/sahilmahajan85/Projects.git">Github</a></div> 
            </div>
           
 <div className="inpu">
    <div className="space">
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input id='in1' type="text" name="name" /><br />
      <label>Email</label>
      <input id='in2' type="email" name="email" /><br />
      <label>Message</label>
      <textarea name="message" /><br />
      <input id='sub' type="submit" value="Send" />
    </form>
    </div>
   </div>
   </div>
   <hr color="black" />
   <div className="bottom">
   <h4>Designed & Developed by Sahil Mahajan</h4>
   <h4><i class="fa-regular fa-copyright"></i>2025 Sahil Mahajan. All rights reserved</h4>
   </div>
   <hr color="black" />
   </div>
  );
};

    