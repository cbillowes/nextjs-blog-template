import { BiError, BiInfoCircle } from 'react-icons/bi';
import { CiWarning } from 'react-icons/ci';

export function Alert({ type, message }: { type: string; message: string }) {
  let bgColor = '';
  let textColor = '';
  let badge = <></>;

  switch (type) {
    case 'info':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      badge = <BiInfoCircle className="inline mr-2" />;
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      badge = <CiWarning className="inline mr-2" />;
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      badge = <BiError className="inline mr-2" />;
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  return (
    <div className={`flex items-center p-4 rounded-md ${bgColor} ${textColor} my-4`}>
      {badge}
      {message}
    </div>
  );
}
