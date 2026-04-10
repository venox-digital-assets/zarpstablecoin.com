import type { RepresentativeDetails } from '../../../types/portal';
import Input from '../ui/Input';
import FileUpload from '../ui/FileUpload';

interface Props {
  data: RepresentativeDetails;
  onChange: (data: RepresentativeDetails) => void;
  errors: Record<string, string>;
}

export default function Step1Representative({ data, onChange, errors }: Props) {
  const update = (field: keyof RepresentativeDetails, value: string | File | null | File[]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-1">Primary Account Representative</h2>
      <p className="text-sm text-slate-500 mb-6">
        Please provide the details of the individual who will be responsible for managing your account and authorising ZARP transactions.
      </p>

      <div className="space-y-5">
        <Input
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => update('email', e.currentTarget.value)}
          required
          error={errors.email}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="First / given name(s)"
            value={data.firstName}
            onChange={(e) => update('firstName', e.currentTarget.value)}
            required
            error={errors.firstName}
          />
          <Input
            label="Surname / last name"
            value={data.surname}
            onChange={(e) => update('surname', e.currentTarget.value)}
            required
            error={errors.surname}
          />
        </div>

        <Input
          label="Email address"
          type="email"
          value={data.emailAddress}
          onChange={(e) => update('emailAddress', e.currentTarget.value)}
          required
          error={errors.emailAddress}
        />

        <Input
          label="Mobile telephone number"
          type="tel"
          value={data.mobile}
          onChange={(e) => update('mobile', e.currentTarget.value)}
          required
          error={errors.mobile}
        />

        <FileUpload
          label="National ID or passport"
          accept=".jpg,.jpeg,.png,.pdf"
          required
          hint="Please provide an image (JPG or PNG) or PDF file of the primary account representative's national ID or passport."
          files={data.nationalId ? [data.nationalId] : []}
          onChange={(files) => update('nationalId', files[0] || null)}
          error={errors.nationalId}
        />

        <FileUpload
          label="Proof of residence"
          accept=".pdf"
          required
          hint="Please provide a PDF file of the primary account representative's proof of residence (bank account statement or utility account no older than three months)."
          files={data.proofOfResidence ? [data.proofOfResidence] : []}
          onChange={(files) => update('proofOfResidence', files[0] || null)}
          error={errors.proofOfResidence}
        />

        <FileUpload
          label="Bank Confirmation Letter"
          accept=".pdf,.jpg,.jpeg,.png"
          hint="Please provide an account confirmation letter from your bank. This account must be held in the name of your organisation. This letter may be provided at a later time, but will be required before any withdrawals can be processed."
          files={data.bankConfirmationLetter ? [data.bankConfirmationLetter] : []}
          onChange={(files) => update('bankConfirmationLetter', files[0] || null)}
        />
      </div>
    </div>
  );
}
