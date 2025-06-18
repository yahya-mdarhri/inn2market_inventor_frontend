
import { FlipWords } from './flip-words';

export function FlipWordsDemo() {
  const words = ["invent", "collaborate","innovate", "create", "Build"];

  return (
    <div className="h-auto flex justify-center items-center px-4">
      <div className="text-7xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        <FlipWords words={words} /> with Inn2market
        <span className="text-neutral-900 dark:text-neutral-100">.</span>
      </div>
    </div>
  );
}
