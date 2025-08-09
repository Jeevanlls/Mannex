import { Treatments } from './types';

// Valid Base64 encoded 1x1 pixel images for placeholders.
const IMG_HAIR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg=='; // Blue
const IMG_ED = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhfv3eQAAAABJRU5ErkJggg=='; // Red
const IMG_PE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWK/vPwAE1gHE2vjIqAAAAABJRU5ErkJggg=='; // Orange
const IMG_WEIGHT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkaGD4DwACPQD/iA884wAAAABJRU5ErkJggg=='; // Green
const IMG_TESTOSTERONE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN49+z/fwAJ4wP9Br4PwgAAAABJRU5ErkJggg=='; // Yellow

export const TREATMENTS: Treatments = {
  'hair-loss': {
    name: 'Hair Loss',
    tagline: 'Reclaim Your Confidence. Tackle Hair Loss.',
    icon: 'fas fa-seedling',
    imageUrl: IMG_HAIR,
    products: [
      { name: 'The Complete Hair Plan', priceOneOff: '79', priceSub: '59', description: 'Our most effective duo: Finasteride pills and topical Minoxidil spray.', recommended: true, imageUrl: IMG_HAIR, patientLeaflet: { title: 'About The Complete Hair Plan', content: 'This plan combines Finasteride (an oral tablet that reduces the hormone DHT, a primary cause of male pattern baldness) and Minoxidil (a topical spray that stimulates hair follicles).\n\n**How to use:** Take one Finasteride tablet daily. Apply Minoxidil spray to the scalp twice a day.\n\n**Possible side effects:** Some users may experience scalp irritation from Minoxidil. A small percentage of men may experience sexual side effects from Finasteride. Consult a doctor if you have concerns.' }},
      { name: 'Topical Finasteride & Minoxidil Spray', priceOneOff: '65', priceSub: '45', description: 'A powerful 2-in-1 spray for targeted application.', recommended: false, imageUrl: IMG_HAIR },
    ],
    articles: [
      { id: 1, title: 'The Science Behind Minoxidil & Finasteride', category: 'SCIENCE', content: 'Minoxidil and Finasteride are two of the most widely recognized and FDA-approved treatments for androgenetic alopecia, or male pattern baldness. Minoxidil, often known by the brand name Rogaine, is a topical solution that works as a vasodilator. By widening blood vessels, it improves blood flow to hair follicles. This increased circulation delivers more oxygen and nutrients, which can revive shrunken follicles and stimulate new hair growth. Finasteride, on the other hand, is an oral medication that tackles the hormonal root of the problem. It works by inhibiting the enzyme 5-alpha-reductase, which converts testosterone into dihydrotestosterone (DHT). DHT is the primary hormone responsible for shrinking hair follicles and causing hair loss in genetically susceptible men. By reducing DHT levels, Finasteride helps to halt the progression of baldness and can lead to hair regrowth.' },
      { id: 2, title: '5 Common Myths About Hair Loss Debunked', category: 'LIFESTYLE', content: 'Myth 1: Wearing hats causes baldness. Fact: Unless a hat is so tight that it cuts off circulation, it will not cause hair loss. Myth 2: Only older men go bald. Fact: Hair loss can start as early as the late teens or early 20s. Myth 3: Washing your hair too often causes it to fall out. Fact: The hairs you see in the drain were likely already in the shedding phase. Normal washing does not cause hair loss. Myth 4: Hair loss comes from your mother\'s side. Fact: The gene for baldness can be inherited from either parent. Myth 5: Special shampoos can cure baldness. Fact: While some shampoos can improve scalp health and hair appearance, only FDA-approved medications like Finasteride and Minoxidil are clinically proven to treat hair loss.' },
      { id: 10, title: 'The Role of Diet in Hair Health', category: 'NUTRITION', content: 'A well-balanced diet is crucial for healthy hair. Nutrients like biotin, iron, zinc, and protein are the building blocks of hair. Iron deficiency (anemia) is a major cause of hair loss. Ensure your diet includes lean proteins, leafy greens, nuts, and beans. Vitamins C (which helps iron absorption) and D are also important for hair follicle health.' },
      { id: 11, title: 'Managing Stress to Prevent Hair Loss', category: 'WELLNESS', content: 'High levels of stress can trigger a condition called telogen effluvium, where a large number of hair follicles enter the resting (telogen) phase simultaneously, leading to widespread shedding. Managing stress through techniques like mindfulness, meditation, regular exercise, and adequate sleep can help mitigate this type of hair loss and support overall well-being.' },
    ],
    questionnaire: [
      { id: 'gender', type: 'radio', required: true, text: 'What sex were you assigned at birth?', options: [{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}], eligibilityRule: {ineligibleIf: 'Female', message: 'We\'re sorry, but our treatments are currently only licensed for individuals assigned male at birth.'}},
      { id: 'location', type: 'radio', required: true, text: 'Where are you experiencing hair loss?', options: [{value: 'Crown', label: 'On my crown'}, {value: 'Hairline', label: 'A receding hairline'}, {value: 'All over', label: 'Thinning all over'}, {value: 'Patches', label: 'In patches'}]},
      { id: 'duration', type: 'radio', required: true, text: 'How long have you been experiencing hair loss?', options: [{value: '<1 year', label: 'Less than a year'}, {value: '1-5 years', label: '1-5 years'}, {value: '5+ years', label: 'More than 5 years'}]},
      { id: 'allergies', type: 'radio', required: true, text: 'Are you allergic to Minoxidil, Finasteride, or any other medications?', options: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}], eligibilityRule: {ineligibleIf: 'Yes', message: 'Due to your allergies, we cannot safely prescribe this treatment online.'}},
      { id: 'conditions', type: 'radio', required: true, text: 'Do you have any serious medical conditions, particularly related to your heart, liver, or kidneys?', options: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}], eligibilityRule: {ineligibleIf: 'Yes', message: 'To ensure your safety, we recommend you discuss treatment options with your GP given your medical history.'}},
    ],
    followUpQuestionnaire: [
        { id: 'details_allergies', type: 'textarea', required: true, text: 'You mentioned you have allergies. Could you please provide more details about the specific medication and the nature of your reaction? This information will be reviewed by our clinician.'},
        { id: 'details_conditions', type: 'textarea', required: true, text: 'You mentioned a history of medical conditions. Please provide more specifics about the condition and any treatments you are receiving. This information is crucial for our clinician to make a safe assessment.'},
    ]
  },
  'erectile-dysfunction': {
    name: 'Erectile Dysfunction',
    tagline: 'Get Back to Your Best. Effective ED Solutions.',
    icon: 'fas fa-heart-pulse',
    imageUrl: IMG_ED,
    products: [
      { name: 'Sildenafil (As-needed)', priceOneOff: '90', priceSub: '70', description: 'The classic solution. Works for up to 4 hours.', recommended: true, imageUrl: IMG_ED, patientLeaflet: { title: 'About Sildenafil', content: 'Sildenafil is a PDE5 inhibitor used to treat ED. It works by increasing blood flow to the penis.\n\n**How to use:** Take one tablet approximately 30-60 minutes before sexual activity. Do not take more than one dose in 24 hours.\n\n**Possible side effects:** Common side effects include headache, flushing, and indigestion. Do not take with nitrates.' } },
      { name: 'Tadalafil (Daily)', priceOneOff: '110', priceSub: '85', description: 'A low-dose daily pill for spontaneity.', recommended: false, imageUrl: IMG_ED },
    ],
    articles: [
      { id: 4, title: 'Understanding Sildenafil (Viagra) vs. Tadalafil (Cialis)', category: 'MEDICATION', content: 'Sildenafil and Tadalafil are both PDE5 inhibitors used to treat ED, but they have key differences. Sildenafil is taken as-needed, typically works within 30-60 minutes, and lasts for about 4-6 hours. Tadalafil also comes in an as-needed form that lasts up to 36 hours, earning it the nickname "the weekend pill." It is also available as a lower-dose daily medication, which allows for more spontaneity.' },
      { id: 5, title: 'The Link Between Heart Health and ED', category: 'HEALTH', content: 'Erectile dysfunction can be an early warning sign of underlying cardiovascular issues. The blood vessels in the penis are smaller than those in the heart, so they can show signs of disease (like atherosclerosis) sooner. If you have ED, it\'s crucial to have your heart health, blood pressure, and cholesterol checked by a doctor.' },
      { id: 12, title: 'Lifestyle Changes That Can Improve ED', category: 'LIFESTYLE', content: 'Beyond medication, several lifestyle adjustments can significantly improve erectile function. These include regular cardiovascular exercise (like jogging or swimming), maintaining a healthy weight, quitting smoking, reducing alcohol intake, and managing stress. A heart-healthy diet, such as the Mediterranean diet, has also been shown to be beneficial.' },
    ],
    questionnaire: [
      { id: 'symptoms', type: 'radio', required: true, text: 'How often do you experience issues with getting or maintaining an erection?', options: [{value: 'Rarely', label: 'Rarely'}, {value: 'Sometimes', label: 'About half the time'}, {value: 'Frequently', label: 'Most of the time or always'}]},
      { id: 'heart_conditions', type: 'radio', required: true, text: 'Have you ever been diagnosed with any of the following: heart attack, stroke, angina (chest pain), or irregular heartbeat?', options: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}], eligibilityRule: {ineligibleIf: 'Yes', message: 'Given your cardiovascular history, it is not safe to prescribe ED medication online.'}},
      { id: 'blood_pressure', type: 'radio', required: true, text: 'Do you have very low blood pressure or uncontrolled high blood pressure?', options: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}], eligibilityRule: {ineligibleIf: 'Yes', message: 'Blood pressure issues can be a contraindication for ED medication.'}},
      { id: 'medications', type: 'radio', required: true, text: 'Are you currently taking any medication containing nitrates (e.g., for chest pain) or alpha-blockers?', options: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}], eligibilityRule: {ineligibleIf: 'Yes', message: 'Taking ED medication with nitrates can cause a dangerous drop in blood pressure. We cannot safely prescribe for you.'}},
    ],
     followUpQuestionnaire: [
        { id: 'details_heart_conditions', type: 'textarea', required: true, text: 'You mentioned a history of heart conditions. Could you please provide more details about the specific condition, the date of diagnosis, and any treatments you are receiving? This information will be reviewed by our clinician.'},
        { id: 'details_blood_pressure', type: 'textarea', required: true, text: 'You mentioned issues with blood pressure. Please provide recent readings if you have them, and list any medications you take for it. This information is crucial for our clinician to make a safe assessment.'},
    ]
  },
  'premature-ejaculation': {
    name: 'Premature Ejaculation',
    tagline: 'Take Control of Your Timing and Performance.',
    icon: 'fas fa-clock',
    imageUrl: IMG_PE,
    products: [
      { name: 'Climax Delay Spray', priceOneOff: '40', priceSub: '29', description: 'A lidocaine-based spray for reduced sensitivity.', recommended: false, imageUrl: IMG_PE },
      { name: 'Sertraline (Daily)', priceOneOff: '60', priceSub: '45', description: 'A daily treatment to help you gain control.', recommended: true, imageUrl: IMG_PE },
    ],
    articles: [
        { id: 6, title: 'Behavioral Techniques to Improve Stamina', category: 'TECHNIQUES', content: 'Practical exercises and methods to last longer, such as the "stop-start" method and the "squeeze" technique, can be highly effective. These techniques help you recognize the point of no return and build control over time.' },
        { id: 7, title: 'The Role of Sertraline in Treating PE', category: 'MEDICATION', content: 'Sertraline is an SSRI (selective serotonin reuptake inhibitor) that can increase the time to ejaculation as a side effect. It is often prescribed off-label in low doses to help men gain better control over their timing.' },
    ],
    questionnaire: [
      { id: 'frequency', type: 'radio', required: true, text: 'How often do you feel you ejaculate sooner than you or your partner would like?', options: [{value: 'Rarely', label: 'Rarely'}, {value: 'Sometimes', label: 'About half the time'}, {value: 'Frequently', label: 'Most of the time or always'}]},
      { id: 'duration', type: 'radio', required: true, text: 'On average, how long does intercourse last before ejaculation?', options: [{value: '<1 min', label: 'Less than 1 minute'}, {value: '1-3 mins', label: '1-3 minutes'}, {value: '3+ mins', label: 'More than 3 minutes'}]},
      { id: 'other_meds', type: 'radio', required: true, text: 'Are you currently taking any other antidepressant medications (SSRIs, MAOIs)?', options: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}], eligibilityRule: {ineligibleIf: 'Yes', message: 'As you are already taking related medication, we cannot safely prescribe another.'}},
    ]
  },
   'weight-management': {
    name: 'Weight Management',
    tagline: 'A Modern, Medically-Guided Approach to Weight Loss.',
    icon: 'fas fa-weight-scale',
    imageUrl: IMG_WEIGHT,
    products: [
      { name: 'The MANNEX Weight Loss Program', priceOneOff: '250', priceSub: '199', description: 'Medically-supervised program including GLP-1 medication.', recommended: true, imageUrl: IMG_WEIGHT },
    ],
    articles: [
      { id: 8, title: 'How GLP-1 Medications Revolutionize Weight Loss', category: 'SCIENCE', content: 'GLP-1 receptor agonists are a class of medications that mimic a natural hormone, helping to regulate appetite and food intake. They work by slowing down stomach emptying, which makes you feel fuller for longer, and by signaling to the brain to reduce hunger. This leads to reduced calorie consumption and significant weight loss for many individuals when combined with diet and exercise.' },
      { id: 13, title: 'Understanding Your Metabolism', category: 'HEALTH', content: 'Metabolism is the process by which your body converts what you eat and drink into energy. Your basal metabolic rate (BMR) is the number of calories you burn at rest. Factors like age, sex, muscle mass, and genetics influence your BMR. While you can\'t change your genetics, you can boost your metabolism through building muscle with strength training and regular physical activity.' },
    ],
    questionnaire: [
      { id: 'bmi_calculator', type: 'bmi', required: true, text: 'Let\'s calculate your Body Mass Index (BMI) to determine if this treatment is suitable for you.'},
      { id: 'thyroid', type: 'radio', required: true, text: 'Have you ever had a personal or family history of thyroid cancer or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)?', options: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}], eligibilityRule: {ineligibleIf: 'Yes', message: 'Due to this medical history, GLP-1 medications are not suitable for you.'}},
      { id: 'pancreatitis', type: 'radio', required: true, text: 'Have you ever been diagnosed with pancreatitis?', options: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}], eligibilityRule: {ineligibleIf: 'Yes', message: 'A history of pancreatitis is a contraindication for our weight loss medication.'}},
    ]
  },
  'low-testosterone': {
    name: 'Low Testosterone',
    tagline: 'Optimize Your Energy, Drive, and Vitality.',
    icon: 'fas fa-bolt',
    imageUrl: IMG_TESTOSTERONE,
    products: [
      { name: 'Testosterone Replacement Therapy (TRT)', priceOneOff: '150', priceSub: '120', description: 'Clinically-managed TRT to restore optimal levels.', recommended: true, imageUrl: IMG_TESTOSTERONE },
    ],
    articles: [
      { id: 9, title: 'Symptoms and Causes of Low T', category: 'HEALTH', content: 'Recognizing the signs of low testosterone, which can include chronic fatigue, low libido, difficulty concentrating, loss of muscle mass, and mood changes, is the first step. Causes can range from natural aging to underlying medical conditions.' },
      { id: 14, title: 'The Importance of Blood Tests for Low T', category: 'DIAGNOSIS', content: 'Self-diagnosing Low T based on symptoms alone is unreliable. The only way to confirm a deficiency is through a blood test, typically done in the morning when testosterone levels are highest. A doctor will look at your total testosterone, free testosterone, and other related hormone levels to make an accurate diagnosis before considering Testosterone Replacement Therapy (TRT).' },
    ],
    questionnaire: [
      { id: 'blood_test', type: 'radio', required: true, text: 'Have you had a blood test within the last 6 months confirming you have low testosterone levels?', options: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}]},
      { id: 'symptoms', type: 'checkbox', required: true, text: 'Which of the following symptoms are you experiencing? (Select all that apply)', options: [{value: 'fatigue', label: 'Chronic fatigue'}, {value: 'low_libido', label: 'Low libido'}, {value: 'mood_changes', label: 'Mood changes / irritability'}, {value: 'muscle_loss', label: 'Loss of muscle mass'}]},
      { id: 'prostate', type: 'radio', required: true, text: 'Have you ever been diagnosed with prostate cancer?', options: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}], eligibilityRule: {ineligibleIf: 'Yes', message: 'A history of prostate cancer is a contraindication for Testosterone Replacement Therapy.'}},
    ]
  }
};

export const ALL_ARTICLES = Object.values(TREATMENTS).flatMap(t => t.articles);