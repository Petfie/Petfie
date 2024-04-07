
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
    <div className="border-2 rounded mb-6">
      <div className="progress_cont grid grid-cols-3 px-8 py-3 text-xs bg-white">
        {stepList.map((step, index) => (
          <div
            className="flex flex-col items-center gap-2 truncate"
            key={index}
          >
            {/* isStepCompleted 가 -1 인 경우 */}
            {isStepCompleted(index, currentStep) === -1 && (
              <div className="w-4 h-4 rounded-full flex justify-center items-center bg-orange-600">
                <CheckIcon color="white" />
              </div>
            )}
            {/* isStepCompleted 가 0 인 경우 */}
            {isStepCompleted(index, currentStep) === 0 && (
              <div className="w-4 h-4 rounded-full bg-orange-600">
              </div>
            )}
            {/* isStepCompleted 가 1 인 경우 */}
            {isStepCompleted(index, currentStep) === 1 && (
              <div className="w-4 h-4 rounded-full bg-gray-300">
              </div>
            )}
            <span
              className={
                currentStep < index ? "text-gray-300" : "text-orange-600"
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
