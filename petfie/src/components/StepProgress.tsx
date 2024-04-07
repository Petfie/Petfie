import { CheckIcon } from "@radix-ui/react-icons";

interface Props {
  currentStep: number;
  stepList: string[];
}
export default function StepProgress({ currentStep, stepList }: Props) {
  // index 가 currentStep 보다 작으면 -1 를 반환,
  // index 랑 currentSTep 이 같으면 0 을 반환,
  // index 가 currentStep 보다 크면 1 을 반환
  type IsStepCompleted = (index: number, currentStep: number) => -1 | 0 | 1;
  const isStepCompleted: IsStepCompleted = (index, currentStep) => {
    if (index < currentStep) {
      return -1;
    } else if (index === currentStep) {
      return 0;
    } else {
      return 1;
    }
  };

  return (
    <div className="border-2 rounded">
      <div className="flex flex-row justify-between px-8 py-4">
        {stepList.map((step, index) => (
          <div className="flex flex-col items-center gap-1" key={index}>
            {/* isStepCompleted 가 -1 인 경우 */}
            {isStepCompleted(index, currentStep) === -1 && (
              <div className="w-4 h-4 rounded-full bg-blue-500">
                <CheckIcon />
              </div>
            )}
            {/* isStepCompleted 가 0 인 경우 */}
            {isStepCompleted(index, currentStep) === 0 && (
              <div className="w-4 h-4 rounded-full bg-blue-500" />
            )}
            {/* isStepCompleted 가 1 인 경우 */}
            {isStepCompleted(index, currentStep) === 1 && (
              <div className="w-4 h-4 rounded-full bg-gray-300" />
            )}
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
