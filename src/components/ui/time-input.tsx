
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  className,
  placeholder = "00:00"
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const formatTime = (input: string) => {
    // Remove tudo que não for número
    const numbers = input.replace(/\D/g, '');
    
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) {
      const hours = parseInt(numbers);
      if (hours > 23) return '23';
      return numbers;
    }
    
    const hours = numbers.slice(0, 2);
    const minutes = numbers.slice(2, 4);
    
    let formattedHours = parseInt(hours);
    let formattedMinutes = parseInt(minutes);
    
    if (formattedHours > 23) formattedHours = 23;
    if (formattedMinutes > 59) formattedMinutes = 59;
    
    const hoursStr = formattedHours.toString().padStart(2, '0');
    const minutesStr = formattedMinutes.toString().padStart(2, '0');
    
    return `${hoursStr}:${minutesStr}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Se o usuário está deletando, permite
    if (input.length < inputValue.length) {
      setInputValue(input);
      onChange(input);
      return;
    }
    
    const formatted = formatTime(input);
    setInputValue(formatted);
    onChange(formatted);
  };

  const handleBlur = () => {
    // Valida o formato final quando perde o foco
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (inputValue && !timeRegex.test(inputValue)) {
      // Se não está no formato correto, tenta corrigir
      const numbers = inputValue.replace(/\D/g, '');
      if (numbers.length >= 3) {
        const formatted = formatTime(numbers);
        setInputValue(formatted);
        onChange(formatted);
      } else {
        setInputValue('');
        onChange('');
      }
    }
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={cn("font-mono text-center", className)}
      maxLength={5}
    />
  );
};
