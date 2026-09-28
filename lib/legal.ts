/**
 * Content for the two legal pages (Terms & Refund Policy, Privacy Policy),
 * supplied by the client and reproduced verbatim (CLAUDE.md §10 — wording is
 * not ours to edit). Kept out of content.ts, which otherwise holds every
 * other page's copy, because these two documents are long and structured
 * quite differently (numbered clauses, sub-lists) from the rest of the site;
 * splitting them out keeps content.ts itself readable.
 *
 * Rendered by <LegalDocument> (components/legal-document.tsx).
 */

/** One paragraph, an unordered list, a bold lead-in line with no number of
 * its own, or the grievance email as a live mailto: link. */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "sub"; text: string }
  | { type: "email" };

export type LegalSection = {
  /** Carries its own number, exactly as given — e.g. "1. Definitions". */
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  title: string;
  subtitle: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  /** A closing line outside the numbered sections, e.g. the Privacy Policy's
   * cross-reference to the Terms page. */
  closing?: string;
};

export const TERMS_DOC: LegalDoc = {
  title: "Delhi Arts and Health Festival",
  subtitle: "Registration Terms and Conditions, Refund Policy, and Transfer Policy",
  lastUpdated: "3 September 2026",
  intro: [
    'These terms apply to anyone who registers or pays for any event, session, workshop, activation, or programme offered by the Delhi Arts and Health Festival ("the Festival", "DAHF"). By completing a registration or making a payment, you confirm that you have read, understood, and agreed to these terms. If you do not agree, please do not register.',
    'The Festival is produced by Delhi Arts and Health Festival, referred to here as "we", "us", and "our". You, the person registering or paying, are referred to as "you" and "your".',
  ],
  sections: [
    {
      heading: "1. Definitions",
      blocks: [
        {
          type: "ul",
          items: [
            "Registration means the process of signing up and, where a fee applies, paying for a place at a Festival event.",
            "Registrant means the person named in a registration.",
            "Event means any single session, workshop, activation, performance, talk, or other activity that forms part of the Festival programme.",
            "Fee means the amount payable for a registration, in Indian Rupees, as displayed at the time of registration.",
            "Payment gateway means the third party payment service used to process your payment.",
          ],
        },
      ],
    },
    {
      heading: "2. Eligibility and registration",
      blocks: [
        {
          type: "p",
          text: "2.1. You confirm that the information you provide at registration, including your name, email address, phone number, and any health or accessibility information you choose to share, is true, complete, and current.",
        },
        {
          type: "p",
          text: "2.2. A registration is confirmed only once payment has been received in full, where a fee applies, and you have received a confirmation from us. Until then, a place is not held.",
        },
        {
          type: "p",
          text: "2.3. If a registrant is under 18 years of age, registration must be completed by a parent or legal guardian, who accepts these terms on the young person's behalf and is responsible for their participation and supervision, unless the Event is specifically designed and staffed for unaccompanied young people and this is stated in the Event listing.",
        },
        {
          type: "p",
          text: "2.4. Some Events have limited capacity. A confirmed registration secures your place for the specific Event, date, and time you registered for, and for that Event only.",
        },
      ],
    },
    {
      heading: "3. Fees, payment, and transactions",
      blocks: [
        {
          type: "p",
          text: "3.1. All fees are quoted in Indian Rupees and are payable in full at the time of registration.",
        },
        {
          type: "p",
          text: "3.2. Fees are inclusive of applicable taxes where taxes are charged. Any taxes will be shown before you complete payment.",
        },
        {
          type: "p",
          text: "3.3. Payments are processed by a third party payment gateway. Your use of the gateway is also subject to the gateway's own terms and privacy policy. We do not store your full card or bank details.",
        },
        {
          type: "p",
          text: "3.4. We are not responsible for delays, failures, or interruptions caused by the payment gateway, your bank, or your network. Where a technical failure affects your payment, please contact us using the details in Section 13 and we will help you resolve it.",
        },
        {
          type: "p",
          text: "3.5. Failed and duplicate transactions. If your account is debited but your registration is not confirmed, or if you are charged more than once for the same registration, this is a transaction error and not a refund request under Section 4. Contact us with your transaction reference and we will verify the records and return any amount wrongly charged, subject to confirmation from the payment gateway and bank.",
        },
        {
          type: "p",
          text: "3.6. If you receive an order reference, confirmation number, or similar detail as part of your registration, please keep it confidential and do not share it with anyone who is not acting on your behalf.",
        },
      ],
    },
    {
      heading: "4. Refund Policy",
      blocks: [
        {
          type: "p",
          text: "4.1. All registration fees are non-refundable. Once a registration is confirmed and payment is made, the fee will not be refunded, in whole or in part, for any reason within your control. This includes, without limitation:",
        },
        {
          type: "ul",
          items: [
            "a decision not to attend, or a change of mind;",
            "non-attendance, late arrival, or early departure;",
            "attending only part of an Event;",
            "a scheduling clash on your side;",
            "travel, weather, illness, or personal circumstances that prevent you from attending;",
            "dissatisfaction with an Event, where the Event was delivered substantially as described.",
          ],
        },
        {
          type: "p",
          text: "4.2. This non-refundable policy does not affect the transaction error provisions in Section 3.5, which are always honoured.",
        },
        {
          type: "p",
          text: "4.3. If we cancel an Event. If we cancel a paid Event entirely, and we are not able to offer you a comparable alternative session or a rescheduled date, we will offer you the choice of either a credit towards another Festival Event of equivalent value, or a refund of the fee paid for the cancelled Event. This is the only circumstance in which a fee is refundable. Refunds under this clause are limited to the fee paid and do not extend to any other costs you may have incurred, such as travel or accommodation.",
        },
        {
          type: "p",
          text: "4.4. Changes that do not entitle you to a refund are set out in Section 6.",
        },
      ],
    },
    {
      heading: "5. Transfer Policy",
      blocks: [
        {
          type: "p",
          text: "5.1. All registrations are non-transferable. A confirmed registration is personal to the named registrant and cannot be transferred to another person, resold, or exchanged.",
        },
        {
          type: "p",
          text: "5.2. A registration cannot be transferred to a different Event, date, time, or venue. If you wish to attend a different Event, you will need to register for it separately, subject to availability.",
        },
        {
          type: "p",
          text: "5.3. Where we reschedule or relocate an Event under Section 6, your existing registration remains valid for the rescheduled or relocated Event. This is a change made by us and is not a transfer requested by you.",
        },
      ],
    },
    {
      heading: "6. Changes, rescheduling, and cancellation by us",
      blocks: [
        {
          type: "p",
          text: "6.1. The Festival is delivered across multiple venues and dates and depends on artists, facilitators, partners, and public conditions in Delhi. We may need to make changes.",
        },
        {
          type: "p",
          text: "6.2. We reserve the right, without this entitling you to a refund, to:",
        },
        {
          type: "ul",
          items: [
            "change the programme, including the artists, facilitators, or content of an Event;",
            "change the date, time, or duration of an Event;",
            "change the venue, including moving an outdoor Event to an indoor alternate venue;",
            "limit capacity or manage access for reasons of safety, accessibility, or compliance.",
          ],
        },
        {
          type: "p",
          text: "6.3. Air quality and public conditions. Events held in Delhi in December may be affected by air quality measures, including restrictions under the Graded Response Action Plan, and by other directions from public authorities. Where such conditions affect an outdoor Event, we may move it indoors, reschedule it, or shorten it. Your registration remains valid, and these changes do not entitle you to a refund.",
        },
        {
          type: "p",
          text: "6.4. We will make reasonable efforts to notify registered participants of significant changes using the contact details you provided. Please make sure your contact details are accurate and check your email and messages ahead of the Event.",
        },
        {
          type: "p",
          text: "6.5. Full cancellation of a paid Event by us is dealt with under Section 4.3.",
        },
      ],
    },
    {
      heading: "7. Participant conduct",
      blocks: [
        {
          type: "p",
          text: "7.1. The Festival is a shared space for people of many backgrounds, roles, and states of health. You agree to behave respectfully towards other participants, artists, facilitators, staff, volunteers, and venue personnel.",
        },
        {
          type: "p",
          text: "7.2. We may refuse entry to, or remove from an Event, any person whose behaviour is unsafe, threatening, abusive, discriminatory, or disruptive, or who does not follow reasonable instructions from Festival staff or venue personnel. No refund is due in these circumstances.",
        },
        {
          type: "p",
          text: "7.3. You agree to follow the rules and safety instructions of each venue.",
        },
      ],
    },
    {
      heading: "8. Health, wellbeing, and safety",
      blocks: [
        {
          type: "p",
          text: "8.1. Many Festival Events are participatory and may involve physical movement, creative activity, group interaction, or reflection on personal or emotional themes. Your participation is voluntary and is at your own discretion.",
        },
        {
          type: "p",
          text: "8.2. You are responsible for considering your own physical and mental health before taking part. If you have a health condition, an injury, or any concern about whether an activity is suitable for you, please consider it carefully and seek advice from a qualified professional where appropriate. Where an Event requires it, you may be asked to share relevant information so that facilitators can support you safely.",
        },
        {
          type: "p",
          text: "8.3. Festival Events are not a substitute for medical or clinical care. Sessions offered as part of the Festival, including any that draw on creative arts therapies in a festival or community setting, are offered for participation and engagement. They are not a diagnosis, a course of treatment, or emergency care, and they do not create a clinician and patient relationship unless an Event is specifically described as a clinical service and delivered under the appropriate clinical governance.",
        },
        {
          type: "p",
          text: "8.4. If you are experiencing a medical or mental health emergency, please contact the emergency services or a qualified health professional. Festival staff can help you find support on the day, and will do so without steering you towards any single commercial provider.",
        },
      ],
    },
    {
      heading: "9. Accessibility",
      blocks: [
        {
          type: "p",
          text: "9.1. We are committed to making the Festival as accessible as we reasonably can. If you have an access requirement, please tell us at registration or contact us using the details in Section 13, with as much notice as possible, so that we can try to make suitable arrangements.",
        },
        {
          type: "p",
          text: "9.2. We will make reasonable efforts to meet access requests, though we cannot guarantee that every arrangement can be made at every venue.",
        },
      ],
    },
    {
      heading: "10. Photography, film, and recording",
      blocks: [
        {
          type: "p",
          text: "10.1. Festival Events may be photographed, filmed, or recorded by us or by people we authorise, for the purpose of documenting, evaluating, and promoting the Festival.",
        },
        {
          type: "p",
          text: "10.2. By attending, you understand that you may appear in these images or recordings. If you do not wish to be photographed or recorded, please tell the staff or facilitator at the Event, and we will make reasonable efforts to respect this, particularly in sessions of a personal or sensitive nature.",
        },
        {
          type: "p",
          text: "10.3. Please do not photograph, film, or record other participants without their consent, and please follow any recording restrictions specific to an Event or venue.",
        },
      ],
    },
    {
      heading: "11. Personal data and privacy",
      blocks: [
        {
          type: "p",
          text: "11.1. We collect and use the information you provide in order to process your registration, communicate with you about the Event, run the Festival safely, and evaluate and improve it. We handle your personal data in line with applicable Indian data protection law.",
        },
        {
          type: "p",
          text: "11.2. Any health or accessibility information you choose to share is treated with particular care and used only for the purpose for which you provided it.",
        },
        {
          type: "p",
          text: "11.3. Full details of how we collect, use, store, and share your personal data, and of your rights, are set out in our Privacy Policy.",
        },
      ],
    },
    {
      heading: "12. Intellectual property and liability",
      blocks: [
        {
          type: "p",
          text: "12.1. The content of the Festival, including its programme, materials, branding, and website content, belongs to us or to the respective artists and contributors, and may not be copied or reused without permission.",
        },
        {
          type: "p",
          text: "12.2. To the fullest extent permitted by law, our liability to you in connection with your registration and attendance is limited to the fee you paid for the relevant Event. We are not liable for indirect or consequential losses, or for loss or damage to your personal belongings at a venue.",
        },
        {
          type: "p",
          text: "12.3. Nothing in these terms limits any liability that cannot be limited under applicable law.",
        },
        {
          type: "p",
          text: "12.4. You agree to take reasonable care of yourself, of other participants, and of venue property, and to be responsible for any loss or damage you cause through your own act or omission.",
        },
      ],
    },
    {
      heading: "13. Grievance redressal and contact",
      blocks: [
        {
          type: "p",
          text: "13.1. If you have a question or a complaint about your registration, a payment, or an Event, please contact:",
        },
        { type: "email" },
        {
          type: "p",
          text: "13.2. We aim to acknowledge complaints within 4 working days and to resolve them within a reasonable time.",
        },
      ],
    },
    {
      heading: "14. Governing law and disputes",
      blocks: [
        { type: "p", text: "14.1. These terms are governed by the laws of India." },
        {
          type: "p",
          text: "14.2. The courts at Delhi will have jurisdiction over any dispute arising out of or in connection with these terms, your registration, or your attendance.",
        },
      ],
    },
    {
      heading: "15. Changes to these terms",
      blocks: [
        {
          type: "p",
          text: "We may update these terms from time to time. The version that applies to your registration is the version published on our website at the time you registered. Please review these terms before each registration.",
        },
      ],
    },
  ],
};

export const PRIVACY_DOC: LegalDoc = {
  title: "Delhi Arts and Health Festival",
  subtitle: "Privacy Policy",
  lastUpdated: "3 September 2026",
  intro: [
    'This policy explains what personal data the Delhi Arts and Health Festival ("the Festival", "DAHF", "we", "us", "our") collects about you, why we collect it, what we do with it, who we share it with, how long we keep it, and the rights you have over it.',
    "The Festival is produced by Delhi Arts and Health Festival, which is responsible for deciding how and why your personal data is used. In the language of India's Digital Personal Data Protection Act 2023, we are the Data Fiduciary and you are the Data Principal.",
    "If anything here is unclear, please contact us using the details in Section 12.",
  ],
  sections: [
    {
      heading: "1. Who this policy applies to",
      blocks: [
        {
          type: "p",
          text: "This policy applies to everyone whose personal data we handle, including people who register for or attend Festival events, visit our website, take part in our activations, respond to our surveys and evaluations, or contact us.",
        },
      ],
    },
    {
      heading: "2. What data we collect",
      blocks: [
        { type: "sub", text: "Information you give us when you register or get in touch:" },
        {
          type: "ul",
          items: [
            "your name;",
            "your contact details, such as email address and phone number;",
            "your age, or confirmation that you are old enough to register, and a parent or guardian's details where the registrant is under 18;",
            "accessibility requirements you choose to share so that we can support your participation;",
            "health or wellbeing information you choose to share where an event asks for it, so that facilitators can include you safely;",
            "anything else you choose to tell us in a message or a form.",
          ],
        },
        { type: "sub", text: "Payment information:" },
        {
          type: "p",
          text: "when you pay a fee, your payment is handled by a third party payment gateway. We receive confirmation that a payment succeeded, along with basic transaction references. We do not collect or store your full card or bank account details.",
        },
        { type: "sub", text: "Feedback and evaluation information:" },
        {
          type: "p",
          text: "responses to surveys, feedback forms, and wellbeing measures that we use to understand and improve the Festival and to build knowledge in the field. This is dealt with in more detail in Section 6.",
        },
        { type: "sub", text: "Photographs, film, and recordings:" },
        {
          type: "p",
          text: "images and recordings made at events, in which you may appear. How we use these is set out in Section 7.",
        },
        { type: "sub", text: "Information collected automatically when you use our website:" },
        {
          type: "p",
          text: "basic technical information such as your device type, browser, and general usage, collected through cookies and similar tools. See Section 9.",
        },
      ],
    },
    {
      heading: "3. Why we use your data, and on what basis",
      blocks: [
        { type: "p", text: "We use your personal data to:" },
        {
          type: "ul",
          items: [
            "process your registration and confirm your place;",
            "communicate with you about an event you have registered for, including changes and safety information;",
            "run events safely and meet accessibility and support needs;",
            "handle payments, keep financial records, and resolve payment queries;",
            "understand, evaluate, improve the Festival, and report on it;",
            "respond to your questions, requests, and complaints;",
            "meet our legal and regulatory obligations.",
          ],
        },
        {
          type: "p",
          text: "We rely mainly on your consent, which you give when you register or when you choose to share information with us. We also process data where we need to in order to meet a legal obligation or to protect someone's safety. You can withdraw your consent at any time, as explained in Section 10. Withdrawing consent does not affect anything we did lawfully before you withdrew it, and in some cases it may mean we can no longer provide a place or a service.",
        },
        {
          type: "p",
          text: "We will not use your data for a new purpose that is unrelated to the ones above without telling you and, where required, asking for your consent.",
        },
      ],
    },
    {
      heading: "4. Health, wellbeing, and accessibility information",
      blocks: [
        {
          type: "p",
          text: "Any health, wellbeing, or accessibility information you share with us is treated with particular care.",
        },
        {
          type: "ul",
          items: [
            "We collect it only where you choose to give it, or where an event genuinely needs it to include you safely.",
            "We use it only for the purpose for which you gave it, such as arranging support or adapting an activity.",
            "We limit who can see it to the people who need it to arrange that support.",
            "We do not use it to make decisions about you beyond your participation, and we do not pass it to sponsors or partners.",
          ],
        },
        {
          type: "p",
          text: "If you tell us something that leads us to believe there is a serious risk to your safety or to someone else's, we may share what is necessary with an appropriate service or professional in order to help. Where we do this, we act in your interests and we do not direct you towards any single commercial provider.",
        },
      ],
    },
    {
      heading: "5. Children's data",
      blocks: [
        {
          type: "p",
          text: "Where a registrant is under 18, we require a parent or legal guardian to register and to consent to the collection and use of the young person's data. We do not knowingly use children's data in ways that could harm their wellbeing, and we do not carry out behavioural tracking of children or direct advertising at them. A parent or guardian may contact us at any time to access, correct, or ask us to delete their child's data.",
        },
      ],
    },
    {
      heading: "6. Feedback, evaluation, and research",
      blocks: [
        {
          type: "p",
          text: "Understanding whether the Festival works, and contributing to knowledge about arts and health in the Global South, is part of why the Festival exists. To do this we collect feedback and, in some activities, wellbeing measures.",
        },
        {
          type: "ul",
          items: [
            "For our own reports and for sharing what we learn, we combine and anonymise responses so that individual people cannot be identified.",
            "Where we want to use information that could identify you for a specific research study, we will ask for your separate and specific consent for that study, and you are free to say no without affecting your participation in the Festival.",
            "Formal research that forms part of the Festival's clinical programme is carried out under the review and approval of an independent ethics committee, and is governed by the terms of that approval.",
          ],
        },
      ],
    },
    {
      heading: "7. Photographs, film, and recordings",
      blocks: [
        {
          type: "p",
          text: "We photograph, film, and record some events to document, evaluate, and promote the Festival. You may appear in this material, and we may use it on our website, in reports, on social media, and in future Festival communications.",
        },
        {
          type: "p",
          text: "If you do not want to be photographed or recorded, please tell the staff or facilitator at the event, and we will make reasonable efforts to respect this, particularly in sessions of a personal or sensitive nature. You can also ask us later to stop using an identifiable image of you in material we control, and we will make reasonable efforts to do so, though we may not be able to recover material already published or shared by others.",
        },
      ],
    },
    {
      heading: "8. Who we share your data with",
      blocks: [
        {
          type: "p",
          text: "We do not sell your personal data, and we do not share it with sponsors or partners for their own marketing.",
        },
        { type: "p", text: "We share data only in these situations:" },
        {
          type: "ul",
          items: [
            "Service providers who act for us. We use trusted providers to run the Festival, such as a payment gateway to process payments, online form and survey tools to collect registrations and feedback, a website host, and email and communication tools. They may only use your data to provide their service to us, under our instructions.",
            "Partners delivering an event with us. Where a specific event is delivered together with a partner and they need your details to run it, we share only what is necessary for that event, and we tell you where this applies.",
            "Legal and safety reasons. We may share data where the law requires it, to respond to a valid request from an authority, or to protect the safety of a person as described in Section 4.",
          ],
        },
        {
          type: "p",
          text: "Some of our service providers may store or process data on systems located outside India. Where this happens, we take reasonable steps to see that your data remains protected and is handled in line with this policy and with applicable law.",
        },
      ],
    },
    {
      heading: "9. Cookies and website data",
      blocks: [
        {
          type: "p",
          text: "Our website uses cookies and similar tools to help it work properly and to understand how it is used. You can control cookies through your browser settings. Turning some cookies off may affect how parts of the website work. Further detail is available at [link to cookie information, if you publish one].",
        },
      ],
    },
    {
      heading: "10. Your rights",
      blocks: [
        { type: "p", text: "Under Indian data protection law, you have the right to:" },
        {
          type: "ul",
          items: [
            "access the personal data we hold about you and information about how we use it;",
            "correct or update data that is inaccurate or incomplete;",
            "ask us to erase your data where it is no longer needed for the purpose you gave it;",
            "withdraw consent you previously gave;",
            "nominate another person to exercise your rights on your behalf in the event of your death or incapacity;",
            "raise a grievance with us about how we handle your data.",
          ],
        },
        {
          type: "p",
          text: "To exercise any of these rights, contact us using the details in Section 12. We will respond within a reasonable time. If you are not satisfied with how we have handled your concern, you may escalate it to the Data Protection Board of India.",
        },
      ],
    },
    {
      heading: "11. How long we keep your data, and how we protect it",
      blocks: [
        { type: "p", text: "We keep your personal data only for as long as we need it." },
        {
          type: "ul",
          items: [
            "Registration and contact details are kept for the current Festival cycle and for a reasonable period afterwards so that we can plan future editions, unless you ask us to delete them sooner.",
            "Financial and transaction records are kept for as long as we are required to keep them under tax and accounting law.",
            "Feedback and evaluation responses are anonymised once the relevant evaluation is complete, after which they can no longer be linked to you.",
            "Photographs and recordings may be kept in the Festival's archive, subject to your right to ask us to stop using an identifiable image of you.",
          ],
        },
        {
          type: "p",
          text: "We take reasonable technical and organisational steps to keep your data secure and to limit access to it. No system can be guaranteed to be completely secure, but we work to protect your data and to respond promptly if something goes wrong. If a data breach is likely to affect you, we will act in line with our legal obligations, which may include notifying you and the Data Protection Board of India.",
        },
      ],
    },
    {
      heading: "12. Contact and grievances",
      blocks: [
        {
          type: "p",
          text: "If you have a question, a request about your data, or a complaint, please contact:",
        },
        { type: "email" },
        {
          type: "p",
          text: "We will acknowledge your request and aim to resolve it within a reasonable time.",
        },
      ],
    },
    {
      heading: "13. Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "We may update this policy from time to time. The version published on our website is the current one, and we will show the date it was last updated at the top. Where a change is significant, we will make reasonable efforts to bring it to your attention.",
        },
      ],
    },
  ],
  closing: "This policy should be read together with our Registration Terms and Conditions.",
};
