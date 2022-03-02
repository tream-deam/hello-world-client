// return array of objects where each object is a supported source language
// (hardcoded languages for now since no API with BCP-47 languages + codes found)

export default function getSourceLanguages() {
  // in the future, the langs array will be populated with result of an API call
  // that fetches all BCP-47 languages + language codes
  const langs = [
    { 
      'language-code': 'ar-SA',
      'language': 'Arabic',
      'region': 'Saudi Arabia'
    },
    {
      'language-code': 'en-CA',
      'language': 'English',
      'region': 'Canada'
    },
    {
      'language-code': 'es-CO',
      'language': 'Spanish',
      'region': 'Colombia'
    },
    {
      'language-code': 'es-MX',
      'language': 'Spanish',
      'region': 'Mexico'
    },
    {
      'language-code': 'fr-CA',
      'language': 'French',
      'region': 'Canada'
    },
    {
      'language-code': 'fr-FR',
      'language': 'French',
      'region': 'France'
    },
    {
      'language-code': 'he-IL',
      'language': 'Hebrew',
      'region': 'Israel'
    },
    {
      'language-code': 'it-IT',
      'language': 'Italian',
      'region': 'Italy'
    },
    {
      'language-code': 'pt-BR',
      'language': 'Portuguese',
      'region': 'Brazil'
    },
    {
      'language-code': 'sw-KE',
      'language': 'Swahili',
      'region': 'Kenya'
    },
    {
      'language-code': 'sw-TZ',
      'language': 'Swahili',
      'region': 'Tanzania'
    },
    {
      'language-code': 'vi-VN',
      'language': 'Vietnamese',
      'region': 'Vietnam'
    },
  ]

  return langs;
};