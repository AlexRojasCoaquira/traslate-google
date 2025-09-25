import './App.css';
import { useEffect } from 'react';
import { AUTO_LANGUAGE } from './constants';
import { useTranslateStore } from './hooks/useTraslatorStore';
import { ArrowIcon, ClipboardIcon } from './components/icons/arrowIcons';
import { SelectorLanguage } from './components/SelectorLanguage';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { traslate } from './services/transalate';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const {
    fromLanguage,
    toLanguage,
    setFromLanguage,
    setToLanguage,
    interchangeLanguages,
    fromText,
    result,
    setFromText,
    setResult,
    loading,
  } = useTranslateStore();

  const debouncedFromText = useDebounce(fromText, 500);
  const handleClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  useEffect(() => {
    if (debouncedFromText === '') return;

    traslate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result == null) return;
        setResult(result);
      })
      .catch(() => setResult('Error'));
  }, [debouncedFromText, fromLanguage, toLanguage]);

  return (
    <div className="max-w-3xl w-full flex flex-col justify-center items-center mx-auto p-3">
      <h1 className="text-2xl font-bold text-center">Google Traslate</h1>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 mt-4 justify-center items-center place-items-center">
        <div className="w-full">
          <SelectorLanguage
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          <TextArea
            loading={loading}
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
          />
        </div>
        <button
          className="size-7 cursor-pointer fill-white
          disabled:opacity-50"
          disabled={fromLanguage === AUTO_LANGUAGE}
          onClick={() => interchangeLanguages()}
        >
          <ArrowIcon />
        </button>
        <div className="w-full ">
          <SelectorLanguage type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
          <div className="relative">
            <TextArea loading={loading} type={SectionType.To} value={result} onChange={setResult} />
            <button
              className="absolute left-2 bottom-4 size-7 cursor-pointer fill-white
              disabled:opacity-50"
              onClick={handleClipboard}
            >
              <ClipboardIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
