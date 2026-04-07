"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  words: string[];
  className?: string;
};

const TYPING_SPEED = 85;
const DELETING_SPEED = 45;
const WORD_PAUSE = 1100;

export function TypingRoles({ words, className }: Props) {
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const safeWords = words.length > 0 ? words : [""];
  const currentWord = safeWords[wordIndex % safeWords.length];
  const visibleWord = useMemo(
    () => currentWord.slice(0, visibleLength),
    [currentWord, visibleLength]
  );

  useEffect(() => {
    setWordIndex(0);
    setVisibleLength(0);
    setIsDeleting(false);
  }, [words]);

  useEffect(() => {
    let timeout = 0;

    if (!isDeleting) {
      if (visibleLength < currentWord.length) {
        timeout = window.setTimeout(() => {
          setVisibleLength((prev) => prev + 1);
        }, TYPING_SPEED);
      } else {
        timeout = window.setTimeout(() => {
          setIsDeleting(true);
        }, WORD_PAUSE);
      }
    } else if (visibleLength > 0) {
      timeout = window.setTimeout(() => {
        setVisibleLength((prev) => prev - 1);
      }, DELETING_SPEED);
    } else {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % safeWords.length);
    }

    return () => window.clearTimeout(timeout);
  }, [currentWord, visibleLength, isDeleting, safeWords.length]);

  return (
    <span className={className}>
      {visibleWord}
      <span className="ml-1 inline-block animate-pulse text-blue-400">|</span>
    </span>
  );
}
