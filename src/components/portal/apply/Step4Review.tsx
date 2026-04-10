import type { PartnerApplication } from '../../../types/portal';

interface Props {
  data: PartnerApplication;
  onEdit: (step: number) => void;
}

function FileList({ files }: { files: (File | null)[] }) {
  const validFiles = files.filter((f): f is File => f !== null);
  if (validFiles.length === 0) return <span className="text-slate-400 italic">Not provided</span>;
  return (
    <ul className="space-y-1">
      {validFiles.map((f, i) => (
        <li key={i} className="text-sm text-slate-600 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {f.name}
        </li>
      ))}
    </ul>
  );
}

function SectionHeader({ title, step, onEdit }: { title: string; step: number; onEdit: (s: number) => void }) {
  return (
    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">{title}</h3>
      <button
        type="button"
        onClick={() => onEdit(step)}
        className="text-xs font-medium text-[#009A35] hover:text-[#008A2E] transition-colors"
      >
        Edit
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="py-2 grid grid-cols-3 gap-4">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-sm text-slate-900 col-span-2">{value || <span className="text-slate-400 italic">Not provided</span>}</dd>
    </div>
  );
}

export default function Step4Review({ data, onEdit }: Props) {
  const { step1, step2, step3 } = data;

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-1">Review Your Application</h2>
      <p className="text-sm text-slate-500 mb-6">
        Please review all information before submitting. Click "Edit" on any section to make changes.
      </p>

      <div className="space-y-8">
        {/* Section 1 */}
        <div>
          <SectionHeader title="Primary Account Representative" step={0} onEdit={onEdit} />
          <dl className="divide-y divide-slate-100">
            <Row label="Email" value={step1.email} />
            <Row label="Name" value={`${step1.firstName} ${step1.surname}`} />
            <Row label="Email address" value={step1.emailAddress} />
            <Row label="Mobile" value={step1.mobile} />
            <Row label="National ID / Passport" value={<FileList files={[step1.nationalId]} />} />
            <Row label="Proof of residence" value={<FileList files={[step1.proofOfResidence]} />} />
            <Row label="Bank confirmation letter" value={<FileList files={[step1.bankConfirmationLetter]} />} />
          </dl>
        </div>

        {/* Section 2 */}
        <div>
          <SectionHeader title="Company Details" step={1} onEdit={onEdit} />
          <dl className="divide-y divide-slate-100">
            <Row label="Company name" value={step2.registeredName} />
            <Row label="Registration number" value={step2.registrationNumber} />
            <Row label="Trading as" value={step2.tradingAsName} />
            <Row label="Country" value={step2.countryOfRegistration} />
            <Row label="Primary activity" value={step2.primaryBusinessActivity} />
            <Row label="Registration certificate" value={<FileList files={[step2.businessRegistrationCert]} />} />
            <Row label="Directors' IDs" value={<FileList files={step2.directorsId} />} />
            <Row label="Directors' proof of address" value={<FileList files={step2.directorsProofOfAddress} />} />
          </dl>
        </div>

        {/* Section 3 */}
        <div>
          <SectionHeader title="Shareholder Details" step={2} onEdit={onEdit} />
          <dl className="divide-y divide-slate-100">
            <Row label="Shareholding evidence" value={<FileList files={[step3.shareholdingEvidence]} />} />
            <Row label="Shareholders' IDs" value={<FileList files={step3.shareholdersId} />} />
            <Row label="Shareholders' proof of address" value={<FileList files={step3.shareholdersProofOfAddress} />} />
            <Row label="PEP declaration" value={step3.isPep === null ? '' : step3.isPep ? 'Yes' : 'No'} />
            {step3.isPep && <Row label="PEP details" value={step3.pepDetails} />}
          </dl>
        </div>
      </div>
    </div>
  );
}
