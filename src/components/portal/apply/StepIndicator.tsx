interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <li key={step} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium shrink-0 transition-colors ${
                    isCompleted
                      ? 'bg-[#009A35] text-white'
                      : isCurrent
                        ? 'bg-[#009A35] text-white ring-4 ring-green-100'
                        : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className={`text-sm font-medium hidden sm:block ${isCurrent ? 'text-slate-900' : 'text-slate-500'}`}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 ${isCompleted ? 'bg-[#009A35]' : 'bg-slate-200'}`} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
