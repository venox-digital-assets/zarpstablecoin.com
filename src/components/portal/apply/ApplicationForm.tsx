import { useState } from 'react';
import type { PartnerApplication, RepresentativeDetails, CompanyDetails, ShareholderDetails } from '../../../types/portal';
import StepIndicator from './StepIndicator';
import Step1Representative from './Step1Representative';
import Step2Company from './Step2Company';
import Step3Shareholders from './Step3Shareholders';
import Step4Review from './Step4Review';
import Button from '../ui/Button';
import Card from '../ui/Card';

const steps = ['Representative', 'Company', 'Shareholders', 'Review'];

const initialStep1: RepresentativeDetails = {
  email: '',
  firstName: '',
  surname: '',
  emailAddress: '',
  mobile: '',
  nationalId: null,
  proofOfResidence: null,
  bankConfirmationLetter: null,
};

const initialStep2: CompanyDetails = {
  registeredName: '',
  registrationNumber: '',
  tradingAsName: '',
  countryOfRegistration: '',
  primaryBusinessActivity: '',
  businessRegistrationCert: null,
  directorsId: [],
  directorsProofOfAddress: [],
};

const initialStep3: ShareholderDetails = {
  shareholdingEvidence: null,
  shareholdersId: [],
  shareholdersProofOfAddress: [],
  isPep: null,
  pepDetails: '',
};

function validateStep1(data: RepresentativeDetails): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.email) errors.email = 'Email is required';
  if (!data.firstName) errors.firstName = 'First name is required';
  if (!data.surname) errors.surname = 'Surname is required';
  if (!data.emailAddress) errors.emailAddress = 'Email address is required';
  if (!data.mobile) errors.mobile = 'Mobile number is required';
  if (!data.nationalId) errors.nationalId = 'National ID or passport is required';
  if (!data.proofOfResidence) errors.proofOfResidence = 'Proof of residence is required';
  return errors;
}

function validateStep2(data: CompanyDetails): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.registeredName) errors.registeredName = 'Company name is required';
  if (!data.registrationNumber) errors.registrationNumber = 'Registration number is required';
  if (!data.countryOfRegistration) errors.countryOfRegistration = 'Country is required';
  if (!data.primaryBusinessActivity) errors.primaryBusinessActivity = 'Business activity is required';
  if (!data.businessRegistrationCert) errors.businessRegistrationCert = 'Registration certificate is required';
  if (data.directorsId.length === 0) errors.directorsId = "Directors' ID documents are required";
  if (data.directorsProofOfAddress.length === 0) errors.directorsProofOfAddress = "Directors' proof of address is required";
  return errors;
}

function validateStep3(data: ShareholderDetails): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.shareholdingEvidence) errors.shareholdingEvidence = 'Shareholding evidence is required';
  if (data.shareholdersId.length === 0) errors.shareholdersId = "Shareholders' ID documents are required";
  if (data.shareholdersProofOfAddress.length === 0) errors.shareholdersProofOfAddress = "Shareholders' proof of address is required";
  if (data.isPep === null) errors.isPep = 'This field is required';
  if (data.isPep && !data.pepDetails) errors.pepDetails = 'Please provide PEP details';
  return errors;
}

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [step1, setStep1] = useState<RepresentativeDetails>(initialStep1);
  const [step2, setStep2] = useState<CompanyDetails>(initialStep2);
  const [step3, setStep3] = useState<ShareholderDetails>(initialStep3);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const data: PartnerApplication = { step1, step2, step3 };

  const validateCurrent = (): boolean => {
    let stepErrors: Record<string, string> = {};
    if (currentStep === 0) stepErrors = validateStep1(step1);
    else if (currentStep === 1) stepErrors = validateStep2(step2);
    else if (currentStep === 2) stepErrors = validateStep3(step3);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const next = () => {
    if (validateCurrent()) {
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
      setErrors({});
    }
  };

  const prev = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
    setErrors({});
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setErrors({});
  };

  const handleSubmit = () => {
    console.log('Application submitted:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto text-center py-12">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[#009A35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Application Submitted</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          Thank you for your application. Our team will review your submission and get back to you within 3-5 business days.
          You will receive a confirmation email shortly.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#009A35] hover:bg-[#008A2E] transition-colors"
        >
          Return to Home
        </a>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <StepIndicator steps={steps} currentStep={currentStep} />

      {currentStep === 0 && <Step1Representative data={step1} onChange={setStep1} errors={errors} />}
      {currentStep === 1 && <Step2Company data={step2} onChange={setStep2} errors={errors} />}
      {currentStep === 2 && <Step3Shareholders data={step3} onChange={setStep3} errors={errors} />}
      {currentStep === 3 && <Step4Review data={data} onEdit={goToStep} />}

      {Object.keys(errors).length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">Please fix the errors above before continuing.</p>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {currentStep > 0 ? (
          <Button variant="outline" onClick={prev}>Back</Button>
        ) : (
          <div />
        )}
        {currentStep < steps.length - 1 ? (
          <Button onClick={next}>Continue</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit Application</Button>
        )}
      </div>
    </Card>
  );
}
