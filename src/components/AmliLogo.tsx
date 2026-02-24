import amliIcon from '../assets/AMLI-Icon.png';

interface AmliLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon-only' | 'text-only';
  className?: string;
}

export function AmliLogo({ size = 'md', variant = 'full', className = '' }: AmliLogoProps) {
  const sizes = {
    sm: { icon: 'h-6', text: 'text-lg', subtitle: 'text-xs' },
    md: { icon: 'h-10', text: 'text-2xl', subtitle: 'text-sm' },
    lg: { icon: 'h-16', text: 'text-4xl', subtitle: 'text-base' },
  };

  if (variant === 'icon-only') {
    return (
      <img 
        src={amliIcon} 
        alt="AMLI" 
        style={{ mixBlendMode: 'multiply' }}
        className={`${sizes[size].icon} ${className}`}
      />
    );
  }

  if (variant === 'text-only') {
    return (
      <div className={`flex flex-col ${className}`}>
        <span className={`${sizes[size].text} tracking-tight leading-none`}>
          AMLI
        </span>
        <span className={`${sizes[size].subtitle} leading-none mt-0.5`}>
          (amlitelimab)
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={amliIcon} 
        alt="AMLI Icon" 
        className={`${sizes[size].icon} mix-blend-multiply`}
      />
      <div className="flex flex-col">
        <span className={`${sizes[size].text} tracking-tight text-[#030213] leading-none`}>
          AMLI
        </span>
        <span className={`${sizes[size].subtitle} text-gray-500 leading-none mt-0.5`}>
          (amlitelimab)
        </span>
      </div>
    </div>
  );
}
