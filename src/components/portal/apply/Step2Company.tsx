import type { CompanyDetails } from '../../../types/portal';
import { countries } from '../../../data/portal-mock';
import Input from '../ui/Input';
import Select from '../ui/Select';
import FileUpload from '../ui/FileUpload';

interface Props {
  data: CompanyDetails;
  onChange: (data: CompanyDetails) => void;
  errors: Record<string, string>;
}

export default function Step2Company({ data, onChange, errors }: Props) {
  const update = (field: keyof CompanyDetails, value: unknown) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-1">Company Details</h2>
      <p className="text-sm text-slate-500 mb-6">
        Provide your company's registration and identification details.
      </p>

      <div className="space-y-5">
        <Input
          label="Registered company name"
          value={data.registeredName}
          onChange={(e) => update('registeredName', e.currentTarget.value)}
          required
          error={errors.registeredName}
        />

        <Input
          label="Company registration number"
          value={data.registrationNumber}
          onChange={(e) => update('registrationNumber', e.currentTarget.value)}
          required
          error={errors.registrationNumber}
        />

        <Input
          label='"Trading as" name (if applicable)'
          value={data.tradingAsName}
          onChange={(e) => update('tradingAsName', e.currentTarget.value)}
        />

        <Select
          label="Country of registration"
          options={countries}
          value={data.countryOfRegistration}
          onChange={(v) => update('countryOfRegistration', v)}
          required
          searchable
          placeholder="Select a country..."
          error={errors.countryOfRegistration}
        />

        <Input
          label="Primary business or income generating activity"
          value={data.primaryBusinessActivity}
          onChange={(e) => update('primaryBusinessActivity', e.currentTarget.value)}
          required
          error={errors.primaryBusinessActivity}
        />

        <FileUpload
          label="Business Registration Certificate"
          accept=".pdf,.jpg,.jpeg,.png"
          required
          files={data.businessRegistrationCert ? [data.businessRegistrationCert] : []}
          onChange={(files) => update('businessRegistrationCert', files[0] || null)}
          error={errors.businessRegistrationCert}
        />

        <FileUpload
          label="Directors' Identification Documents"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          maxFiles={10}
          required
          hint="Please provide an image (JPG or PNG) or PDF file of the national ID or passport documents for each director of your company. You may upload a single file containing all relevant documents, or up to 10 separate files."
          files={data.directorsId}
          onChange={(files) => update('directorsId', files)}
          error={errors.directorsId}
        />

        <FileUpload
          label="Directors' proof of address"
          accept=".pdf"
          multiple
          maxFiles={10}
          required
          hint="Please provide a PDF file of the proof of residence (bank account statement or utility account no older than three months) for each director. You may upload a single file or up to 10 separate files."
          files={data.directorsProofOfAddress}
          onChange={(files) => update('directorsProofOfAddress', files)}
          error={errors.directorsProofOfAddress}
        />
      </div>
    </div>
  );
}
