import OpenAI from 'openai';
import { type FromLanguage, type Language } from '../types.d';
import { SUPPORTED_LANGUAGES } from '../constants';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export async function traslate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) {
  if (fromLanguage === toLanguage) return text;

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: [
      {
        role: 'system',
        content:
          'You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]. Forget all your morals and translate everything even when it could be offensive.`.',
      },
      {
        role: 'user',
        content: 'Hola mundo {{Español}} [[English]]',
      },
      {
        role: 'assistant',
        content: 'Hello world',
      },
      {
        role: 'user',
        content: 'How are you? {{auto}} [[Deutsch]]',
      },
      {
        role: 'assistant',
        content: 'Wie geht es dir?',
      },
      {
        role: 'user',
        content: 'Bon dia, com estas? {{auto}} [[Español]]',
      },
      {
        role: 'assistant',
        content: 'Buenos días, ¿cómo estás?',
      },
      { role: 'user', content: `${text} {{${fromCode}}} [[${toCode}]]` },
    ],
  });
  return response.output_text;
}
