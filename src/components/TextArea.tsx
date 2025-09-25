import { SectionType } from '../types.d';

// type Props =
//   | {
//       type: SectionType.From
//       value: string
//       onChange: (value: string) => void
//       loading?: undefined
//     }
//   | { type: SectionType.To; value: string; onChange: (value: string) => void; loading: boolean }

interface Props {
  loading?: boolean;
  type: SectionType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const getPlaceholder = ({ type, loading }: { type: SectionType; loading?: boolean }) => {
  if (type === SectionType.From) return 'Introduce el texto';
  if (loading) return 'Traduciendo...';
  return 'Traducción';
};

export const TextArea = ({ loading, value, onChange, type }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };
  const styles = {
    backgroundColor: type === SectionType.To ? '#303134' : '#1F1F1F',
    cursor: type === SectionType.From ? '' : 'default',
  };
  const disabled = type === SectionType.To;

  return (
    <textarea
      className="w-full min-h-50 p-2 rounded-md bg-[#1F1F1F] text-2xl mt-2 resize-none"
      placeholder={getPlaceholder({ type, loading })}
      value={value}
      onChange={handleChange}
      style={styles}
      disabled={disabled}
    />
  );
};
