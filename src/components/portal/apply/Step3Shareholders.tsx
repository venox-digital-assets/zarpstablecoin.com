import type { ShareholderDetails } from '../../../types/portal';
import FileUpload from '../ui/FileUpload';
import RadioGroup from '../ui/RadioGroup';
import Input from '../ui/Input';

interface Props {
  data: ShareholderDetails;
  onChange: (data: ShareholderDetails) => void;
  errors: Record<string, string>;
}

export default function Step3Shareholders({ data, onChange, errors }: Props) {
  const update = (field: keyof ShareholderDetails, value: unknown) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-1">Partner Ownership Details</h2>
      <p className="text-sm text-slate-500 mb-6">
        Provide shareholder documentation and politically exposed person (PEP) declarations.
      </p>

      <div className="space-y-5">
        <FileUpload
          label="Documentary evidence of shareholding"
          accept=".pdf,.jpg,.jpeg,.png"
          required
          hint="Please upload documentary evidence of shareholding in your company. This could be a share register, cap table or share certificate(s)."
          files={data.shareholdingEvidence ? [data.shareholdingEvidence] : []}
          onChange={(files) => update('shareholdingEvidence', files[0] || null)}
          error={errors.shareholdingEvidence}
        />

        <FileUpload
          label="Shareholders' Identification Documents"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          maxFiles={10}
          required
          hint="Please provide an image (JPG or PNG) or PDF file of the national ID or passport documents for each shareholder representing more than 5% of the equity. You may upload a single file or up to 10 separate files."
          files={data.shareholdersId}
          onChange={(files) => update('shareholdersId', files)}
          error={errors.shareholdersId}
        />

        <FileUpload
          label="Shareholders' proof of address"
          accept=".pdf"
          multiple
          maxFiles={10}
          required
          hint="Please provide a PDF file of the proof of residence (bank account statement or utility account no older than three months) for each shareholder representing more than 5% of the equity. You may upload a single file or up to 10 separate files."
          files={data.shareholdersProofOfAddress}
          onChange={(files) => update('shareholdersProofOfAddress', files)}
          error={errors.shareholdersProofOfAddress}
        />

        <RadioGroup
          label="Are you, directors, shareholders or any of your immediate family members employed by the government? This would include national or provincial department of government, local municipality, political party, trade union, or in a traditional leadership or governmental advisory position, or embassy?"
          options={[
            { label: 'No', value: 'no' },
            { label: 'Yes', value: 'yes' },
          ]}
          value={data.isPep === null ? '' : data.isPep ? 'yes' : 'no'}
          onChange={(v) => update('isPep', v === 'yes')}
          required
          error={errors.isPep}
        />

        {data.isPep && (
          <div className="ml-6 border-l-2 border-[#009A35] pl-4">
            <Input
              label="If the above answer is 'Yes' please specify details"
              hint="Such as the position held and if it is a family member their position held and their relationship to you."
              value={data.pepDetails}
              onChange={(e) => update('pepDetails', e.currentTarget.value)}
              required
              error={errors.pepDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
}
