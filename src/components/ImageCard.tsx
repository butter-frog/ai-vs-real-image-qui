import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ImageCardProps {
  src: string
  alt: string
  isSelected: boolean
  isRevealed: boolean
  isCorrect?: boolean
  onClick: () => void
  disabled: boolean
  position: 'left' | 'right'
}

export function ImageCard({
  src,
  alt,
  isSelected,
  isRevealed,
  isCorrect,
  onClick,
  disabled,
  position
}: ImageCardProps) {
  const getBorderColor = () => {
    if (isRevealed && isCorrect !== undefined) {
      return isCorrect ? 'border-success' : 'border-destructive'
    }
    if (isSelected) {
      return 'border-accent'
    }
    return 'border-border'
  }

  return (
    <motion.div
      className={cn(
        'relative cursor-pointer rounded-lg border-4 overflow-hidden transition-all duration-300',
        getBorderColor(),
        !disabled && !isRevealed && 'hover:border-accent/50 hover:shadow-xl hover:scale-[1.02]',
        disabled && 'cursor-not-allowed opacity-75',
        isRevealed && !isCorrect && 'animate-shake'
      )}
      onClick={disabled ? undefined : onClick}
      whileTap={!disabled && !isRevealed ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: position === 'left' ? 0 : 0.1 }}
    >
      <div className="aspect-square w-full bg-muted flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af"%3EImage %23' + position + '%3C/text%3E%3C/svg%3E'
          }}
        />
      </div>
      {isSelected && !isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-accent/10 pointer-events-none"
        />
      )}
      {isRevealed && isCorrect !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            'absolute top-4 right-4 rounded-full p-3 font-bold text-white',
            isCorrect ? 'bg-success' : 'bg-destructive'
          )}
        >
          {isCorrect ? '✓' : '✗'}
        </motion.div>
      )}
    </motion.div>
  )
}
