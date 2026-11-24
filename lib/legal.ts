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
  | { type: "email" }
  /** Lettered sub-clauses — (a), (b), … — with the letter kept as given. */
  | { type: "items"; items: { label: string; text: string }[] };

export type LegalSection = {
  /** Carries its own number, exactly as given — e.g. "1. Definitions". */
  heading: string;
  /** Starts a new part of the document ("Part B: …"), shown above this
   * section as a larger heading. */
  part?: string;
  /** Set for a section in another language, e.g. "hi" for the Hindi House
   * Rules, so screen readers switch voice. */
  lang?: string;
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

const p = (text: string): LegalBlock => ({ type: "p", text });

/** Lettered sub-clauses, lettered (a), (b), … in order, as in the source. */
const lettered = (texts: string[]): LegalBlock => ({
  type: "items",
  items: texts.map((text, i) => ({ label: `(${String.fromCharCode(97 + i)})`, text })),
});

export const TERMS_DOC: LegalDoc = {
  title: "Delhi Arts and Health Festival",
  subtitle: "Terms and Conditions and Code of Conduct",
  lastUpdated: "24 November 2026",
  intro: [
    "2 to 6 December 2026  |  NIV Art Centre and Surtal Amphitheatre, New Delhi",
    "Part A: House Rules (English and Hindi)  |  Part B: Terms and Conditions of Entry",
  ],
  sections: [
    {
      part: "Part A: House Rules",
      heading: "House Rules",
      blocks: [
        p(`Welcome to the Delhi Arts and Health Festival. To keep the festival safe and welcoming for everyone, we ask all guests to observe the following rules. Entry is free of charge and is granted on the condition that these rules are followed.`),
        {
          type: "ul",
          items: [
            `Please register in advance, and carry your registration confirmation and a valid government photo ID.`,
            `Bags and belongings may be checked at entry. The organisers reserve the right of admission.`,
            `Alcohol, illegal drugs and tobacco are not permitted anywhere on the festival premises. This includes smoking, vaping and chewing tobacco.`,
            `Please do not attend under the influence of alcohol or drugs. Guests who appear intoxicated will be asked to leave.`,
            `Any medicine you bring must be accompanied by a valid prescription in your name, or in the name of the person in your care. Medicines without a prescription will be held at the first aid desk until you leave.`,
            `Weapons, sharp objects, fireworks, glass bottles and other hazardous items are not permitted.`,
            `We ask everyone to treat fellow guests, artists, staff and volunteers with respect. Harassment, discrimination, abuse or intimidation of any kind will not be tolerated.`,
            `False alarms, pushing, crowding, or any behaviour that may cause panic or put others at risk are strictly prohibited.`,
            `Kindly ask before photographing or filming anyone. Recording personal stories shared in sessions is not permitted.`,
            `Guests under 18 must be accompanied by a parent, guardian or authorised adult at all times.`,
            `Please follow the instructions of the festival team, venue staff and security at all times, particularly in an emergency.`,
            `Personal belongings remain the responsibility of their owners.`,
            `If you feel unwell or overwhelmed, please visit the Quiet Corner or speak to any volunteer. Support is available throughout festival hours.`,
            `Purchases from stalls and exhibitions are made directly between the seller and the buyer. The organisers are not responsible for any sale.`,
          ],
        },
        p(`Guests who do not follow these rules may be asked to leave the festival. These House Rules summarise the Terms and Conditions of Entry in Part B, which apply to every guest.`),
        p(`Thank you for helping us keep DAHF a safe and caring space for all.`),
      ],
    },
    {
      heading: "भाग A: फ़ेस्टिवल के नियम",
      lang: "hi",
      blocks: [
        p(`दिल्ली आर्ट्स एंड हेल्थ फ़ेस्टिवल में आपका स्वागत है। फ़ेस्टिवल को सभी के लिए सुरक्षित और आत्मीय बनाए रखने के लिए हम सभी अतिथियों से अनुरोध करते हैं कि वे नीचे दिए गए नियमों का पालन करें। प्रवेश निःशुल्क है, और इन नियमों के पालन की शर्त पर दिया जाता है।`),
        {
          type: "ul",
          items: [
            `कृपया पहले से पंजीकरण करें, और अपना पंजीकरण पुष्टि संदेश तथा कोई मान्य सरकारी फ़ोटो पहचान पत्र साथ रखें।`,
            `प्रवेश के समय बैग और सामान की जाँच की जा सकती है। प्रवेश का अधिकार आयोजकों के पास सुरक्षित है।`,
            `फ़ेस्टिवल परिसर में कहीं भी शराब, अवैध नशीले पदार्थ और तंबाकू की अनुमति नहीं है। इसमें धूम्रपान, वेपिंग और चबाने वाला तंबाकू भी शामिल है।`,
            `कृपया शराब या किसी नशीले पदार्थ के प्रभाव में फ़ेस्टिवल में न आएँ। नशे में प्रतीत होने वाले अतिथियों से परिसर छोड़ने के लिए कहा जाएगा।`,
            `आप जो भी दवा साथ लाएँ, उसके साथ आपके नाम का, या आपकी देखरेख में आए व्यक्ति के नाम का, मान्य डॉक्टरी पर्चा (प्रिस्क्रिप्शन) होना अनिवार्य है। बिना पर्चे वाली दवाएँ आपके जाने तक फ़र्स्ट एड डेस्क पर रखी जाएँगी।`,
            `हथियार, धारदार वस्तुएँ, पटाखे, काँच की बोतलें और अन्य ख़तरनाक वस्तुएँ लाने की अनुमति नहीं है।`,
            `हम सभी से अनुरोध करते हैं कि साथी अतिथियों, कलाकारों, स्टाफ़ और वॉलंटियर्स के साथ सम्मानपूर्वक व्यवहार करें। किसी भी प्रकार का उत्पीड़न, भेदभाव, दुर्व्यवहार या धमकी बर्दाश्त नहीं की जाएगी।`,
            `झूठी चेतावनी देना, धक्का-मुक्की करना, भीड़ लगाना, या ऐसा कोई भी व्यवहार जिससे घबराहट फैले या दूसरों को ख़तरा हो, सख़्त वर्जित है।`,
            `कृपया किसी की फ़ोटो या वीडियो लेने से पहले उनकी अनुमति लें। सत्रों में साझा की गई निजी कहानियों को रिकॉर्ड करने की अनुमति नहीं है।`,
            `18 वर्ष से कम आयु के अतिथि हर समय माता-पिता, अभिभावक या किसी अधिकृत वयस्क के साथ रहें।`,
            `कृपया हर समय फ़ेस्टिवल टीम, स्थल के स्टाफ़ और सुरक्षाकर्मियों के निर्देशों का पालन करें, विशेषकर आपात स्थिति में।`,
            `निजी सामान की ज़िम्मेदारी उसके मालिक की होगी।`,
            `यदि आप अस्वस्थ या बहुत बेचैन महसूस करें, तो कृपया क्वाइट कॉर्नर पर जाएँ या किसी भी वॉलंटियर से बात करें। फ़ेस्टिवल के दौरान सहायता हर समय उपलब्ध है।`,
            `स्टॉल और प्रदर्शनियों से की गई ख़रीदारी सीधे विक्रेता और ख़रीदार के बीच होती है। किसी भी बिक्री के लिए आयोजक ज़िम्मेदार नहीं हैं।`,
          ],
        },
        p(`इन नियमों का पालन न करने वाले अतिथियों से फ़ेस्टिवल छोड़ने के लिए कहा जा सकता है। ये नियम भाग B में दिए गए प्रवेश के नियमों और शर्तों का सारांश हैं, जो हर अतिथि पर लागू होते हैं और [link] पर उपलब्ध हैं। यदि हिंदी और अंग्रेज़ी संस्करण में कोई अंतर हो, तो अंग्रेज़ी संस्करण मान्य होगा।`),
        p(`DAHF को सभी के लिए एक सुरक्षित और संवेदनशील स्थान बनाए रखने में सहयोग के लिए धन्यवाद।`),
      ],
    },
    {
      part: "Part B: Terms and Conditions of Entry and Code of Conduct",
      heading: "1. Definitions and interpretation",
      blocks: [
        p(`1.1 In these Terms, unless the context requires otherwise:`),
        lettered([
          `"Applicable Law" means all laws, rules, regulations, notifications and orders in force in India, including those in force in the National Capital Territory of Delhi;`,
          `"Attendee" means any person who registers for, is admitted to, or is present at the Festival, and includes a Minor;`,
          `"Festival" means the Delhi Arts and Health Festival 2026, held from 2 to 6 December 2026, together with all sessions, workshops, performances, exhibitions, installations and activities forming part of it;`,
          `"Festival Premises" means NIV Art Centre, Surtal Amphitheatre and any other place used by the Organiser for the Festival, including all entrances, queues, grounds, toilets and parking areas, during Festival hours;`,
          `"Festival Team" means the staff, volunteers, contractors, facilitators, artists and security personnel engaged by the Organiser, and the Wellbeing Support Team;`,
          `"Minor" means a person who has not attained the age of eighteen (18) years;`,
          `"Organiser" means [legal name of entity or fiscal host], having its registered office at [registered address], which produces the Festival in association with the Global South Arts and Health Initiative, and includes its successors and permitted assigns. "We", "us" and "our" refer to the Organiser;`,
          `"Prohibited Items" means the items listed in Clause 5.2;`,
          `"Prohibited Substances" means alcohol in any form; any narcotic drug or psychotropic substance within the meaning of the Narcotic Drugs and Psychotropic Substances Act, 1985, other than medicine carried in accordance with Clause 6; and tobacco and nicotine products of any kind;`,
          `"Responsible Adult" has the meaning given in Clause 4.2;`,
          `"Terms" means these Terms and Conditions of Entry and Code of Conduct, including the House Rules in Part A;`,
          `"Venue Operator" means the owner or operator of any Festival Premises, including NIV Art Centre and, in respect of Surtal Amphitheatre, the New Delhi Municipal Council; and`,
          `"Wellbeing Support Team" means the mental health professionals engaged through the Festival's mental healthcare partner to staff the Quiet Corner and provide immediate wellbeing support.`,
        ]),
        p(`1.2 Headings are for convenience only and do not affect interpretation. Words in the singular include the plural and vice versa. The words "include" and "including" are to be read without limitation.`),
        p(`1.3 The House Rules in Part A summarise these Terms. In the event of any inconsistency between Part A and Part B, Part B shall prevail.`),
      ],
    },
    {
      heading: "2. Acceptance of terms",
      blocks: [
        p(`2.1 Admission to the Festival is free of charge. Admission is a revocable licence granted by the Organiser, subject to these Terms.`),
        p(`2.2 By registering for the Festival, collecting a pass or wristband, or entering the Festival Premises, whichever occurs first, the Attendee agrees to be bound by these Terms. Any person who does not accept these Terms shall not enter the Festival Premises.`),
        p(`2.3 These Terms shall be read together with the Organiser's Privacy Policy, available at [link], and the rules of each Venue Operator. Where a provision of these Terms is inconsistent with a rule of a Venue Operator, the more restrictive provision shall apply.`),
        p(`2.4 A person who registers another person warrants that they are authorised to do so, or that they are that person's parent or legal guardian, and shall ensure that person's compliance with these Terms.`),
      ],
    },
    {
      heading: "3. Registration and admission",
      blocks: [
        p(`3.1 Registration is required for admission. The Organiser may, at its discretion, admit unregistered persons, subject to capacity.`),
        p(`3.2 Each registration is personal to the Attendee and is non-transferable. A registration shall not be sold, resold or exchanged for value, and any registration so dealt with shall be void.`),
        p(`3.3 Attendees shall carry proof of registration and a valid government-issued photo identity document, and shall produce them on request by the Festival Team.`),
        p(`3.4 Admission to the Festival, and to any session, is subject to capacity. Registration does not guarantee admission to any particular session. The Organiser may close any space once it reaches capacity.`),
        p(`3.5 As a condition of entry, Attendees consent to reasonable security screening of their bags and belongings at the point of entry and at any time on the Festival Premises. An Attendee who declines screening may be refused admission.`),
        p(`3.6 The Organiser reserves the right of admission. The Organiser may refuse admission to, or require the departure of, any person where it reasonably considers this necessary for safety, security or the proper conduct of the Festival, or where that person has breached these Terms.`),
        p(`3.7 Re-entry on the same day is permitted on production of the Festival pass.`),
        p(`3.8 The Organiser shall not refuse admission to any person on the ground of disability, religion, caste, sex, gender identity, sexual orientation, age, language or appearance. The Organiser shall endeavour to provide reasonable accommodation to Attendees with disabilities, consistent with the Rights of Persons with Disabilities Act, 2016. However, assistance animals accompanying persons with disabilities are not permitted.`),
      ],
    },
    {
      heading: "4. Minors",
      blocks: [
        p(`4.1 A Minor may attend the Festival only if registered by a parent or legal guardian, who accepts these Terms on the Minor's behalf.`),
        p(`4.2 A Minor shall remain under the supervision of a responsible adult at all times on the Festival Premises, being a parent, a legal guardian, or the designated leader of a group registered in advance with the Organiser (the "Responsible Adult").`),
        p(`4.3 The Responsible Adult shall be solely responsible for the safety, conduct and belongings of the Minor, and for the Minor's compliance with these Terms.`),
        p(`4.4 Sessions designated "18+" in the Festival programme are restricted to adults. Minors shall not be admitted to such sessions, whether or not accompanied.`),
        p(`4.5 Schools, organisations and other groups shall register in advance and nominate a group leader, who shall remain responsible for the group throughout its attendance.`),
        p(`4.6 Where a Minor is found unaccompanied, the Festival Team may take the Minor to the help desk and contact the Responsible Adult. Where the Responsible Adult cannot be located within a reasonable time, the Organiser may inform the police.`),
      ],
    },
    {
      heading: "5. Prohibited substances and prohibited items",
      blocks: [
        p(`5.1 The Festival is an alcohol-free, drug-free and tobacco-free event. No person shall bring, possess, consume, supply, sell or purchase any Prohibited Substance on the Festival Premises. This includes smoking or vaping of any kind, and the use of chewing tobacco, gutkha or any other tobacco or nicotine product.`),
        p(`5.2 No person shall bring onto the Festival Premises any of the following (the "Prohibited Items"):`),
        lettered([
          `weapons of any kind, including firearms, knives and blades, and any article capable of being used as a weapon;`,
          `fireworks, flares, smoke devices, and flammable, explosive or otherwise hazardous substances;`,
          `glass bottles and glass containers;`,
          `laser pointers, air horns, whistles, and personal loudspeakers or sound amplification equipment;`,
          `drones or other unmanned aerial devices, save with the prior written approval of the Organiser;`,
          `animals, other than assistance animals; and`,
          `any other article which the Festival Team reasonably considers may endanger any person or property, or disrupt the Festival.`,
        ]),
        p(`5.3 No person shall enter or remain on the Festival Premises while under the influence of alcohol or any narcotic drug or psychotropic substance. Where the Festival Team reasonably believes that a person is so intoxicated, the Organiser may refuse that person admission or require that person to leave, and may arrange assistance where the person appears unwell.`),
        p(`5.4 Before forming the belief referred to in Clause 5.3, the Festival Team shall take reasonable steps to establish whether the person's presentation may arise from a disability, medical condition, medication or emotional distress. A disability or medical condition shall not, of itself, constitute grounds for refusing admission.`),
        p(`5.5 The Organiser may confiscate any Prohibited Substance or Prohibited Item. Any article which it is unlawful to possess shall not be returned and may be handed over to the police. The Organiser shall not be liable for any loss of, or damage to, any article confiscated under this Clause.`),
        p(`5.6 Attendees are reminded that the consumption of liquor in a public place is an offence under section 40 of the Delhi Excise Act, 2009, and that smoking in public places, including open auditoriums, is prohibited under the Cigarettes and Other Tobacco Products (Prohibition of Advertisement and Regulation of Trade and Commerce, Production, Supply and Distribution) Act, 2003.`),
      ],
    },
    {
      heading: "6. Medicines",
      blocks: [
        p(`6.1 An Attendee may bring medicine onto the Festival Premises only if:`),
        lettered([
          `the medicine is for the personal use of the Attendee, or of a Minor or other person in the Attendee's care;`,
          `the Attendee carries a valid prescription, issued by a registered medical practitioner in the name of the person for whom the medicine is intended; and`,
          `the quantity carried does not exceed that reasonably required for the duration of the visit.`,
        ]),
        p(`6.2 Medicines should be kept in their original packaging. The Festival Team may ask to see the relevant prescription during security screening or at any time on the Festival Premises.`),
        p(`6.3 Medicine that is not accompanied by a valid prescription shall not be carried on the Festival Premises. The Attendee may either leave it outside the Festival Premises or deposit it at the first aid desk, where it shall remain available to the Attendee under supervision and shall be returned on the Attendee's departure.`),
        p(`6.4 Attendees who may require assistance with medication, including insulin, inhalers or adrenaline auto-injectors, are requested to inform the first aid team on arrival. The Festival Team shall not administer any medicine to an Attendee, save as part of first aid rendered by trained personnel.`),
      ],
    },
    {
      heading: "7. Code of conduct",
      blocks: [
        p(`7.1 Every Attendee shall conduct themselves with courtesy and respect towards other Attendees, artists, facilitators, the Festival Team and members of the public.`),
        p(`7.2 Without limiting Clause 7.1, no Attendee shall, on the Festival Premises or in any online space operated by the Organiser in connection with the Festival:`),
        lettered([
          `harass any person, including by sexual harassment, unwelcome physical contact, stalking or following, or by continuing to contact any person after being asked to stop;`,
          `use or threaten violence against, abuse, or intimidate any person;`,
          `engage in hate speech, or discriminate against any person on the basis of disability, religion, caste, sex, gender identity, sexual orientation, ethnicity, language, age, body or appearance;`,
          `disclose the sexual orientation, gender identity, health information or personal account of any other person without that person's consent;`,
          `knowingly raise a false alarm, make a false report of fire, explosives, a threat or a medical emergency, or otherwise act in a manner intended or likely to cause panic, alarm or a crowd surge;`,
          `push, rush or crowd other persons, or obstruct any entrance, exit, aisle or emergency route;`,
          `intentionally disrupt any session, performance or activity, or fail to leave a session when requested to do so by the facilitator or the Festival Team;`,
          `damage, deface, remove or interfere with any property, equipment, signage, artwork or installation;`,
          `enter any area designated as restricted, including staff-only and backstage areas;`,
          `without the prior written consent of the Organiser, sell, advertise or market any goods or services, solicit donations, recruit, canvass, collect signatures, distribute printed or promotional material, display banners or placards, or organise any gathering;`,
          `hold themselves out as able to diagnose, treat or cure any condition, or offer therapy, healing or health services to other Attendees, whether for consideration or otherwise;`,
          `act in breach of Applicable Law; or`,
          `incite or encourage any other person to do any of the foregoing.`,
        ]),
        p(`7.3 Any concern may be reported to any member of the Festival Team, at the help desk. Reports shall be handled in confidence, save where disclosure is necessary to protect any person or is required by law.`),
      ],
    },
    {
      heading: "8. Wellbeing and nature of the programme",
      blocks: [
        p(`8.1 The Festival programme includes activities that engage with emotion, memory, identity and health. The Organiser recognises that Attendees may experience distress during the Festival.`),
        p(`8.2 Conduct arising from emotional distress, a disability or a medical condition shall not be treated as a breach of Clause 7, and shall be met with appropriate care, save where such conduct presents a risk to the safety of the Attendee or of any other person.`),
        p(`8.3 Wellbeing support is available at the Quiet Corner during Festival hours. Such support is provided by the Wellbeing Support Team, is limited to immediate support and signposting, and does not constitute assessment, diagnosis, treatment or ongoing care. Any information provided about further support shall include a range of options, and the Attendee shall remain free to choose any provider.`),
        p(`8.4 Where the Festival Team reasonably believes that an Attendee is at risk of harm to themselves or to others, the Organiser may, in the interest of that Attendee and of others, move the Attendee to a safe space, contact the Attendee's emergency contact, and summon emergency services. The Attendee consents to such action being taken.`),
        p(`8.5 Festival sessions, including sessions led by therapists, counsellors or health professionals, are artistic, educational and community activities. They are not therapy, counselling, medical treatment or a substitute for professional care. Participation does not create a therapist-client, counsellor-client or doctor-patient relationship between the Attendee and the Organiser or any facilitator, and no Attendee shall rely on any session in place of professional advice.`),
        p(`8.6 Outside Festival hours, Attendees may contact Tele MANAS, the national tele mental health helpline, on 14416 or 1800 891 4416. In an emergency, Attendees should call 112.`),
      ],
    },
    {
      heading: "9. Participation and assumption of risk",
      blocks: [
        p(`9.1 Participation in any session or activity is voluntary. An Attendee may decline to take part in, or withdraw from, any activity at any time.`),
        p(`9.2 Certain activities involve physical movement, dance, sound, the use of art materials, or time outdoors. Each Attendee is responsible for assessing their own fitness to take part, and shall inform the facilitator, before the activity begins, of any condition or circumstance relevant to their safe participation, including injury, pregnancy, cardiac or respiratory conditions, sensory sensitivity or allergy.`),
        p(`9.3 Any activity involving physical contact shall take place only with the express consent of each participant, which may be withdrawn at any time.`),
        p(`9.4 Art materials shall be used in accordance with the facilitator's instructions. The Organiser shall not be liable for any staining of, or damage to, clothing or personal effects.`),
        p(`9.5 Attendees shall not disclose, outside a session, any personal account shared by another participant in that session in a manner that identifies that participant.`),
        p(`9.6 Surtal Amphitheatre is an open-air venue with tiered steps and uneven surfaces, and is exposed to cold, rain and variable air quality. Attendees shall take due care when moving within it, particularly after dark or in wet conditions.`),
        p(`9.7 A facilitator may limit numbers, refuse late admission, or require any person to leave a session where reasonably necessary for the safety or proper conduct of the session.`),
        p(`9.8 Each Attendee acknowledges that attendance at a public event, and participation in creative, physical and reflective activities, carries inherent risks, including minor injury, physical strain, emotional discomfort, exposure to weather and air pollution, and loss of personal belongings. Subject to Clause 14.4, each Attendee attends and participates voluntarily and at their own risk.`),
      ],
    },
    {
      heading: "10. Photography, recording and personal data",
      blocks: [
        p(`10.1 The Organiser will photograph and film the Festival for documentation, reporting and promotion, including on its website and social media channels and in reports to funders and partners.`),
        p(`10.2 The Organiser shall respect the choice indicated by each Attendee at registration as to being photographed or filmed. An Attendee who has opted out should collect an identifying [lanyard or sticker] at the help desk. The Organiser shall make reasonable efforts to exclude such Attendees from its photographs and recordings, but does not guarantee that an Attendee will not appear incidentally in an image of a crowd.`),
        p(`10.3 An Attendee may withdraw consent to the use of their image at any time by writing to [email]. The Organiser shall remove the relevant material from channels under its control within [seven (7)] working days of receiving the request. Withdrawal shall not affect material printed or distributed before the request was received.`),
        p(`10.4 Photography and recording are not permitted in the Quiet Corner, in any session designated as a no-photography session, or wherever a facilitator so requests.`),
        p(`10.5 Attendees may take photographs for personal, non-commercial use only, and shall obtain the consent of any person before photographing or filming them. Attendees shall not photograph or film any person in distress or receiving first aid or support, any participant sharing a personal account, or any Minor without the consent of that Minor's Responsible Adult.`),
        p(`10.6 No Attendee shall record, livestream or publish any performance, talk, workshop or artwork, in whole or in substantial part, without the prior written consent of the Organiser and of the artist concerned.`),
        p(`10.7 The Organiser processes personal data in accordance with its Privacy Policy and the Digital Personal Data Protection Act, 2023. The Organiser does not sell personal data, and does not share personal data with sponsors for their marketing purposes.`),
      ],
    },
    {
      heading: "11. Intellectual property",
      blocks: [
        p(`11.1 All intellectual property in the Festival's name, branding, content and programme materials belongs to the Organiser, and all intellectual property in performances and artworks belongs to the Organiser or to the artist concerned, as the case may be.`),
        p(`11.2 Artwork made by an Attendee in a session belongs to that Attendee, save where it is contributed to a collective artwork or installation. By contributing to a collective artwork or installation, the Attendee grants the Organiser a non-exclusive, royalty-free and perpetual licence to retain, display, photograph and reproduce that contribution for non-commercial purposes connected with the Festival.`),
      ],
    },
    {
      heading: "12. Health, safety and emergencies",
      blocks: [
        p(`12.1 Attendees shall comply at all times with the instructions of the Festival Team, the staff of the Venue Operators, security personnel, the police and emergency services, including any instruction to move, wait, keep clear of an area, or evacuate.`),
        p(`12.2 In an emergency, Attendees shall proceed calmly to the nearest marked exit or assembly point and shall not return for personal belongings.`),
        p(`12.3 First aid is available on the Festival Premises at [location]. Attendees shall report any injury, illness or hazard to the Festival Team without delay.`),
        p(`12.4 Each Attendee authorises the Organiser to arrange first aid and, where the Festival Team considers it necessary, to summon emergency medical assistance for the Attendee. Any medical treatment beyond first aid, including ambulance and hospital charges, shall be at the Attendee's own cost.`),
        p(`12.5 Unattended bags and articles may be removed and, where necessary, handed over to the police.`),
        p(`12.6 Attendees with respiratory or cardiac conditions are advised to check air quality before travelling and to carry any protective equipment they require.`),
      ],
    },
    {
      heading: "13. Programme changes, cancellation and force majeure",
      blocks: [
        p(`13.1 The Organiser may change the programme, artists, timings, sessions and venues at any time, including on the day, and will publish such changes on [website and social media channels] and notify registered Attendees by WhatsApp or email.`),
        p(`13.2 The Organiser may postpone, relocate, shorten or cancel any session, any day, or the Festival, in whole or in part, where it considers this necessary or advisable, including by reason of restrictions under the Graded Response Action Plan or other air quality measures, adverse weather, safety or security advice, directions of the police or any government authority, the unavailability of any venue or artist, civil disturbance, epidemic, or any other event beyond its reasonable control (each a "Force Majeure Event").`),
        p(`13.3 The Organiser shall not be liable for any failure or delay in performing any obligation under these Terms caused by a Force Majeure Event. As admission is free of charge, the Organiser shall not be liable for any travel, accommodation or other cost incurred by any Attendee by reason of any change, postponement or cancellation.`),
      ],
    },
    {
      heading: "14. Limitation of liability",
      blocks: [
        p(`14.1 The Organiser shall take reasonable care in the organisation of the Festival.`),
        p(`14.2 To the fullest extent permitted by Applicable Law, neither the Organiser nor its co-producers, partners, sponsors, Venue Operators, facilitators, artists, staff, volunteers or agents (together, the "Festival Parties") shall be liable to any Attendee for any loss, damage, injury, illness, cost or expense arising out of or in connection with the Attendee's attendance at or participation in the Festival, including any of the following:`),
        lettered([
          `the loss or theft of, or damage to, personal belongings;`,
          `any loss attributable to the Attendee's own acts or omissions, health condition, or failure to comply with these Terms or with any instruction given under them;`,
          `any act or omission of another Attendee or of any third party;`,
          `any change, postponement or cancellation under Clause 13;`,
          `the goods and services of independent stallholders and vendors, who shall be solely responsible for them, as set out in Clause 14.6; and`,
          `any indirect, incidental or consequential loss, including loss of income or opportunity.`,
        ]),
        p(`14.3 Nothing in these Terms shall exclude or limit any liability for death or personal injury caused by the gross negligence or wilful misconduct of the Organiser, or any other liability which cannot lawfully be excluded or limited.`),
        p(`14.4 Attendees are responsible for their personal belongings at all times. No cloakroom or locker facility is provided. Lost property found on the Festival Premises will be held for will be held for reasonable amount of time and after said time the organization will have a lien on said item according to the Indian contract act 1872.`),
        p(`14.5 Sales on the Festival Premises. Any goods, food, artworks or services offered for sale at stalls, exhibitions or elsewhere on the Festival Premises are sold by the relevant stallholder, exhibitor or artist (the "Seller") in its own name and on its own account. Any contract of sale is made solely between the Seller and the buyer. The Organiser is not a party to any such sale, does not act as agent for any Seller, and accepts no responsibility or liability for the description, quality, safety, pricing, payment, delivery, refund, exchange or warranty of anything sold, or for any dispute arising from a sale. All claims relating to a sale shall be made directly against the Seller.`),
      ],
    },
    {
      heading: "15. Indemnity",
      blocks: [
        p(`15.1 Each Attendee shall indemnify and keep indemnified the Organiser against all claims, losses, damages, costs and expenses, including reasonable legal fees, incurred by the Organiser arising from the Attendee's breach of these Terms or of Applicable Law, or from any wilful or negligent act or omission of the Attendee on the Festival Premises.`),
        p(`15.2 A parent, legal guardian or Responsible Adult shall indemnify the Organiser on the same terms in respect of any Minor in their care.`),
      ],
    },
    {
      heading: "16. Enforcement and removal",
      blocks: [
        p(`16.1 Where an Attendee breaches these Terms, the Organiser may take such action as it considers proportionate, including:`),
        lettered([
          `a request to stop, or a verbal reminder;`,
          `a formal warning;`,
          `exclusion from a session, an area, or the Festival for the remainder of the day;`,
          `exclusion from the Festival for its remaining duration and cancellation of the Attendee's registration;`,
          `exclusion from future events organised by the Organiser; and`,
          `referral of the matter to the police or any other competent authority.`,
        ]),
        p(`16.2 In the case of a serious breach, including violence, threats, harassment, possession of a weapon or Prohibited Substance, or conduct intended to cause panic, the Organiser may proceed directly to exclusion or referral to the police without prior warning.`),
        p(`16.3 Upon a request to leave, the licence granted under Clause 2.1 shall stand revoked, and the Attendee shall leave the Festival Premises promptly and peacefully. Removal would be carried out lawfully, proportionately and without unnecessary force, humiliation or discriminatory treatment. The Organiser may seek the assistance of the Venue Operator's security personnel or the police to give effect to such a request.`),
        p(`16.4 Before excluding any Attendee, the Festival Team shall have regard to Clause 8.2. Where an excluded Attendee appears to be intoxicated or unwell, the Organiser shall take reasonable steps to ensure that the Attendee leaves safely, including by contacting the Attendee's emergency contact.`),
        p(`16.5 Decisions under Clauses 16.1(c) to 16.1(f) shall be taken by the duty manager designated by the Organiser for the relevant day, or by any other person authorised by the Organiser, and shall be final for that day. The Attendee may request a review of any such decision by writing to the Grievance Officer under Clause 17.`),
        p(`16.6 No refund, compensation or other remedy shall be due to any person who is refused admission or excluded under these Terms.`),
        p(`16.7 The Organiser may keep a confidential record of incidents, which shall be disclosed only as required by law or as necessary to protect the safety of any person.`),
      ],
    },
    {
      heading: "17. Grievance redressal",
      blocks: [
        p(`17.1 Concerns on the day may be raised at the help desk at each venue or with any member of the Festival Team.`),
        p(`17.2 Complaints of harassment shall be escalated to police authorities or relevant legal authorities by the individual’s discretion.`),
        p(`17.3 Any other grievance, including any request relating to personal data, may be addressed to the Grievance Officer email: grievances.dahf@gmail.com. The Grievance Officer shall acknowledge each grievance within 3 working days of receipt and shall endeavour to resolve it within 20 days of receipt.`),
      ],
    },
    {
      heading: "18. General",
      blocks: [
        p(`18.1 Amendment. The Organiser may amend these Terms at any time before or during the Festival. The version published at https://www.delhiartsandhealthfestival.com/terms on the date of attendance shall apply. The Organiser shall notify registered Attendees of any material amendment.`),
        p(`18.2 Severability. If any provision of these Terms is held to be invalid or unenforceable, that provision shall be enforced to the maximum extent permissible, and the remaining provisions shall continue in full force and effect.`),
        p(`18.3 Waiver. No failure or delay by the Organiser in exercising any right under these Terms shall operate as a waiver of that right.`),
        p(`18.4 Entire agreement. These Terms, together with the Privacy Policy and the rules of the Venue Operators, constitute the entire agreement between the Organiser and the Attendee in relation to the Festival, and supersede all prior terms relating to the Festival.`),
        p(`18.5 Language. These Terms are made in English. Any translation is provided for convenience only. In the event of any inconsistency, the English version shall prevail.`),
        p(`18.6 Governing law and jurisdiction. These Terms shall be governed by and construed in accordance with the laws of India. Subject to Clause 17, the courts at New Delhi shall have exclusive jurisdiction over any dispute arising out of or in connection with these Terms or the Festival.`),
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
