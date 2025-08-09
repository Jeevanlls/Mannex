export interface Suggestion {
  title: string;
  prompt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
  suggestions?: Suggestion[];
}

export interface TreatmentArticle {
  id: number;
  title: string;
  category: string;
  content: string;
}

export interface TreatmentProduct {
  name: string;
  priceOneOff: string;
  priceSub: string;
  description: string;
  recommended: boolean;
  imageUrl?: string;
  patientLeaflet?: {
    title: string;
    content: string;
  }
}

// --- New Types for Dynamic Questionnaire ---

export interface QuestionOption {
  value: string;
  label: string;
  /** If selecting this option leads to another question, specify its ID here. */
  followUpQuestionId?: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'radio' | 'checkbox' | 'text' | 'textarea' | 'bmi';
  options?: QuestionOption[];
  /** A rule to check if a specific answer makes the user ineligible. */
  eligibilityRule?: {
    ineligibleIf: any; // The value that makes them ineligible (e.g., 'Yes')
    message: string;   // The message to show if they are ineligible
  };
  required: boolean;
}

export type Questionnaire = Question[];

// --- Updated Treatment Type ---

export interface Treatment {
  name: string;
  tagline: string;
  icon: string; // Font Awesome class
  imageUrl?: string;
  articles: TreatmentArticle[];
  products: TreatmentProduct[];
  questionnaire: Questionnaire;
  followUpQuestionnaire?: Questionnaire;
}

export interface Treatments {
  [key: string]: Treatment;
}