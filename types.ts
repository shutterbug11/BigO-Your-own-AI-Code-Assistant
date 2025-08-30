export type FeatureKey =
  | 'requirementValidation'
  | 'onboardingAssistance'
  | 'generativeTesting'
  | 'socraticFeedback';

export interface Feature {
  key: FeatureKey;
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface RequirementValidationResult {
  summary: string;
  isMet: boolean;
  discrepancies: string[];
}

export interface OnboardingAssistanceResult {
  comments: string;
  documentation: string;
}

export interface GenerativeTestingResult {
  tests: { type: string; code: string }[];
  evaluation: string;
}

export interface SocraticFeedbackResult {
  questions: string[];
}

export interface ReviewResult {
  requirementValidation?: RequirementValidationResult;
  onboardingAssistance?: OnboardingAssistanceResult;
  generativeTesting?: GenerativeTestingResult;
  socraticFeedback?: SocraticFeedbackResult;
}

export interface ReviewItem {
  id: string;
  code: string;
  features: FeatureKey[];
  result: ReviewResult;
  timestamp: string;
  language: string;
  summary: string;
}