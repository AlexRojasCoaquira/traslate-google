import { useReducer } from 'react';
import { type State, type Action } from '../types';
import { type Language, type FromLanguage } from '../types';
import { AUTO_LANGUAGE } from '../constants';

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

function reducer(state: State, action: Action) {
  const { type } = action;
  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      result: state.fromText,
      fromText: state.result,
    };
  }
  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state;

    const loading = state.fromText !== '';
    return {
      ...state,
      toLanguage: action.payload,
      loading,
      result: '',
    };
  }
  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state;

    const loading = state.fromText !== '';
    console.log('loading', loading);
    return {
      ...state,
      loading,
      fromLanguage: action.payload,
      result: '',
    };
  }
  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
    };
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }
  return state;
}

export function useTranslateStore() {
  // buena practica el nombre de la funcion es el nombre del hook
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' });
  };
  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload });
  };
  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload });
  };
  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload });
  };
  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    dispatch,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setResult,
    setFromText,
  };
}
