interface ReservationProgressProps {
  currentStep: 1 | 2 | 3;
  labels?: [string, string, string];
}

function ReservationProgress({
  currentStep,
  labels = ["Datos", "Text", "Text"],
}: ReservationProgressProps) {
  return (
    <div className="flex items-center">
      {labels.map((label, index) => {
        const step = (index + 1) as 1 | 2 | 3;
        const completed = step < currentStep;
        const active = step === currentStep;

        return (
          <div key={`reservation-step-${step}`} className="flex items-center">
            {index > 0 && (
              <div
                className={`mt-[-20px] h-[2px] w-[120px] ${
                  completed ? "bg-[#111]" : "bg-[#aaa]"
                }`}
              />
            )}
            <div className="flex w-[120px] flex-col items-center">
              <div
                className={`grid h-7 w-7 place-items-center rounded-full text-sm font-bold ${
                  active
                    ? "bg-[#111] text-white"
                    : completed
                      ? "bg-[#9b9b9b] text-white"
                      : "bg-[#d1d1d1] text-[#777]"
                }`}
              >
                {completed ? "✓" : step}
              </div>
              <span
                className={`mt-2 text-[12px] font-semibold ${
                  active ? "text-[#111]" : "text-[#777]"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReservationProgress;
