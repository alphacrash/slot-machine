export interface NumberCardProps {
  digit: number | null;
  isSpinning: boolean;
}

export interface SpinButtonProps {
  onSpin: () => void;
  disabled: boolean;
}

export interface CompletedNumber {
  number: number;
  needsReview: boolean;
}