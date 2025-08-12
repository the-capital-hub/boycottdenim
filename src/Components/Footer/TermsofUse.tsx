"use client";

import React, { useState } from 'react';
import { ArrowUp, Check } from 'lucide-react';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      id: 'account',
      title: '1. Your Account',
      content: `If you are using the Boycott website, you will be responsible for maintaining the confidentiality of your personal account and password for restricting the access to your computer and this prevents un authorized access to your personal account. Please agree to accept the responsibility for all the activities that occurs under your personal account or password. Try to take necessary steps to make sure that the password is kept confidential and secured and inform us immediately there is any reason to believe that your personal password has become familiar to anyone else, if the password is being, if it is likely to be, please use in an un authorized pattern. Also ensure that the details which is provided with us are accurate and complete, inform us immediately if there is any changes to the information which is provided at the time of registration. Individuals can access and update the information which is provided us within the account area of the website. Boycott reserves the right to refuse the access to the website, to terminate the accounts, to remove or edit contents any time without noticing the team.`
    },
    {
      id: 'privacy',
      title: '2. Privacy Terms',
      content: `Review our Privacy Notice mentioned, which also maintains your visit to Boycott, in order to understand the practices. The basic personal information or data provided to us by you during the course of usage of Boycott is confidential and in accordance with the Privacy Notice and also applicable to laws and regulations. If you object your information being transferred or used, do not use the website at all.`
    },
    {
      id: 'eplatform',
      title: '3. e-Platform Communication',
      content: `Agree, understand and acknowledge that the Boycott website is an online platform which enables individuals to purchase products which is listed on the Boycott website at the price listed there in at any time and from any location as well. You further accept and also acknowledge that Boycott is only a facilitator and cannot be a party to or control in any manner and any transactions on the website.`
    },
    // Add all other sections similarly...
    {
      id: 'cancellation',
      title: 'Boycott Cancellation',
      content: `You can easily cancel your online order before the item has been shipped and your order amount will be refunded. If the item you have booked has been shipped and not been delivered, you even still cancel the order. Here your amount refund will be processed only once we receive the item back from the courier depot. Finally order cannot be cancelled when the item is delivered to the customer.`
    },
    {
      id: 'returns',
      title: 'Boycott Return Policy',
      content: `Return option is applicable only after delivery, if and only if product received is defective, damaged or not as described. If customer has received a damaged or defective product or not as described, you can raise a return request on the website within the returns Policy period. In a rare event of the replacement being defective, damaged or not as described on the product page, we will provide full refund once we receive the product.`
    }
  ];

  return (
    <div className="bg-[#f9f9fb] min-h-screen font-sans text-[#3e3e3e]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Conditions of Use</h1>
        
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <p className="mb-4">
            Please read the above conditions in detail before using the Boycott website. By using Boycott website, you can signify your agreement which is bounded by these conditions.
          </p>
          <p className="mb-4">
            In addition to these, when you are using any current or future Boycott service, you will also be subjected to the terms and conditions which is applicable to that Boycott Service. If these Conditions of Use are inconsistent with the terms, the Terms will control.
          </p>
          <p>
            These "Conditions of Use" will constitute an electronic record with the meaning of the applicable law, and this electronic record is generated by a computer system software and it will not require any physical or digital signatures.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left font-medium"
                onClick={() => toggleSection(section.id)}
              >
                <span>{section.title}</span>
                <span className={`transform transition-transform ${activeSection === section.id ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div className={`px-4 pb-4 ${activeSection === section.id ? 'block' : 'hidden'}`}>
                <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Acceptance of Terms</h2>
          <div className="flex items-start">
            <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <p>
              By accessing or using the Boycott website, you agree to be bound by these Conditions of Use and our Privacy Policy. If you do not agree to all of these terms and conditions, do not use this website.
            </p>
          </div>
        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#3e3e3e] text-white p-3 rounded-full shadow-lg hover:bg-[#2e2e2e] transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default TermsAndConditions;