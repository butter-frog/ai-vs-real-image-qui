import { motion } from 'framer-motion'
import { Trophy, ArrowClockwise } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ResultsScreenProps {
  score: number
  total: number
  onRestart: () => void
}

export function ResultsScreen({ score, total, onRestart }: ResultsScreenProps) {
  const percentage = Math.round((score / total) * 100)
  
  const getMessage = () => {
    if (percentage === 100) return "Perfect! You're an AI detection expert!"
    if (percentage >= 80) return "Excellent! You have a sharp eye for detail."
    if (percentage >= 60) return "Good job! You're learning the patterns."
    if (percentage >= 40) return "Not bad! Keep practicing your detection skills."
    return "Keep trying! AI detection takes practice."
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-12 text-center space-y-8 shadow-2xl">
        <Trophy size={80} weight="fill" className="mx-auto text-accent" />
        
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-foreground">Quiz Complete!</h2>
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
            className="text-7xl font-bold text-primary animate-count-up"
          >
            {score}/{total}
          </motion.div>
          
          <p className="text-3xl font-semibold text-accent">
            {percentage}% Correct
          </p>
          
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            {getMessage()}
          </p>
        </div>

        <Button
          onClick={onRestart}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6"
        >
          <ArrowClockwise size={24} className="mr-2" />
          Try Again
        </Button>
      </Card>
    </motion.div>
  )
}
