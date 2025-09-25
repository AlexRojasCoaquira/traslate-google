import { type FC } from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { type Language, type FromLanguage } from '../types';
import { SectionType } from '../types.d';
import { AUTO_LANGUAGE } from '../constants';

type Props =
  | { type: SectionType.From; value: FromLanguage; onChange: (payload: Language) => void }
  | { type: SectionType.To; value: Language; onChange: (payload: Language) => void };

export const SelectorLanguage: FC<Props> = ({ onChange, value, type }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };
  return (
    <select
      className="w-full text-black bg-gray-200 rounded-sm h-10"
      name=""
      id=""
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  );
};
