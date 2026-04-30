import { Loader2 } from 'lucide-react';

/**
 * Shimmer gradient button with loading state
 */
export default function ShimmerButton({ loading, children, text, disabled, ...props }) {
  return (
    <button
      className={`
        shimmer-btn w-full py-3.5 px-6 rounded-xl text-white font-semibold
        text-sm tracking-wide flex items-center justify-center gap-2.5
        transition-all duration-200 hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
      `}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={17} className="animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        text || children
      )}
    </button>
  );
}
