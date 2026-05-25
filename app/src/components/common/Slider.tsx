import React from 'react';
import clsx from 'clsx';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
  showValue?: boolean;
  disabled?: boolean;
}

/**
 * Slider Component
 * Escala 1-5 visualizada como círculos, típicamente para evaluaciones
 * 
 * @example
 * <Slider 
 *   value={3} 
 *   onChange={setValue}
 *   labels={['Totalmente desacuerdo', '...', 'Totalmente de acuerdo']}
 * />
 */
export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 1,
  max = 5,
  step = 1,
  labels = [],
  showValue = true,
  disabled = false,
}) => {
  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i * step);

  return (
    <div className="space-y-4">
      {/* Value Display */}
      {showValue && (
        <div className="text-center">
          <span className="text-2xl font-bold text-primary-600">{value}</span>
          <span className="text-gray-500"> / {max}</span>
        </div>
      )}

      {/* Slider Buttons */}
      <div className="flex justify-center gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => !disabled && onChange(option)}
            disabled={disabled}
            className={clsx(
              'w-12 h-12 rounded-full font-semibold transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
              value === option
                ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg scale-110'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            aria-label={`Opción ${option}`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Labels */}
      {labels.length > 0 && (
        <div className="flex justify-between text-xs text-gray-600 px-2">
          {labels.map((label, idx) => (
            <div key={idx} className="text-center">
              {label}
            </div>
          ))}
        </div>
      )}

      {/* Range Input for accessibility */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full sr-only"
        aria-label="Escala de evaluación"
      />
    </div>
  );
};

export default Slider;
