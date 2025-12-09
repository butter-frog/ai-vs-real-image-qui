import { useState, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ImageCard } from '@/components/ImageCard'
import { ResultsScreen } from '@/components/ResultsScreen'
import { EducationalSection } from '@/components/EducationalSection'
import { imagePairs } from '@/data/imagePairs'
import { QuizState } from '@/types/quiz'

const initialState: QuizState = {
  currentQuestion: 0,
  score: 0,
  selectedImage: null,
  isAnswered: false,
  showResults: false
}

function App() {
  const [quizState, setQuizState] = useKV<QuizState>('quiz-state', initialState)

  const state = quizState ?? initialState
  const currentPair = imagePairs[state.currentQuestion]
  
  const { leftImage, rightImage, aiPosition } = useMemo(() => {
    if (!currentPair) return { leftImage: '', rightImage: '', aiPosition: 'left' as const }
    
    const isAiOnLeft = Math.random() > 0.5
    return {
      leftImage: isAiOnLeft ? currentPair.aiImage : currentPair.realImage,
      rightImage: isAiOnLeft ? currentPair.realImage : currentPair.aiImage,
      aiPosition: isAiOnLeft ? 'left' as const : 'right' as const
    }
  }, [currentPair?.id])

  const handleImageSelect = (position: 'left' | 'right') => {
    if (state.isAnswered) return
    setQuizState((current) => {
      const curr = current ?? initialState
      return { ...curr, selectedImage: position }
    })
  }

  const handleSubmit = () => {
    if (!state.selectedImage) return
    
    const isCorrect = state.selectedImage === aiPosition
    setQuizState((current) => {
      const curr = current ?? initialState
      return {
        ...curr,
        isAnswered: true,
        score: isCorrect ? curr.score + 1 : curr.score
      }
    })
  }

  const handleNext = () => {
    if (state.currentQuestion >= imagePairs.length - 1) {
      setQuizState((current) => {
        const curr = current ?? initialState
        return {
          ...curr,
          showResults: true
        }
      })
    } else {
      setQuizState((current) => {
        const curr = current ?? initialState
        return {
          ...curr,
          currentQuestion: curr.currentQuestion + 1,
          selectedImage: null,
          isAnswered: false
        }
      })
    }
  }

  const handleRestart = () => {
    setQuizState(initialState)
  }

  const progress = ((state.currentQuestion + 1) / imagePairs.length) * 100

  if (state.showResults) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto">
          <ResultsScreen
            score={state.score}
            total={imagePairs.length}
            onRestart={handleRestart}
          />
          <EducationalSection />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-primary mb-4 tracking-tight">
            Real or AI?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Test your ability to detect AI-generated images. Select the image you think was created by AI.
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-sm font-medium px-4 py-2">
              Question {state.currentQuestion + 1} of {imagePairs.length}
            </Badge>
            <Badge variant="outline" className="text-sm font-medium px-4 py-2">
              Score: {state.score}/{state.currentQuestion + (state.isAnswered ? 1 : 0)}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 mb-8 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ImageCard
              src={leftImage}
              alt="Image option 1"
              isSelected={state.selectedImage === 'left'}
              isRevealed={state.isAnswered}
              isCorrect={state.isAnswered ? aiPosition === 'left' : undefined}
              onClick={() => handleImageSelect('left')}
              disabled={state.isAnswered}
              position="left"
            />
            <ImageCard
              src={rightImage}
              alt="Image option 2"
              isSelected={state.selectedImage === 'right'}
              isRevealed={state.isAnswered}
              isCorrect={state.isAnswered ? aiPosition === 'right' : undefined}
              onClick={() => handleImageSelect('right')}
              disabled={state.isAnswered}
              position="right"
            />
          </div>

          {!state.isAnswered ? (
            <div className="text-center">
              <Button
                onClick={handleSubmit}
                disabled={!state.selectedImage}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-12 py-6"
              >
                Submit Answer
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 animate-fade-in-up"
            >
              <div className={`p-6 rounded-lg border-2 ${
                state.selectedImage === aiPosition 
                  ? 'bg-success/10 border-success' 
                  : 'bg-destructive/10 border-destructive'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  {state.selectedImage === aiPosition ? (
                    <>
                      <Check size={32} weight="bold" className="text-success" />
                      <h3 className="text-2xl font-bold text-success">Correct!</h3>
                    </>
                  ) : (
                    <>
                      <X size={32} weight="bold" className="text-destructive" />
                      <h3 className="text-2xl font-bold text-destructive">Not quite!</h3>
                    </>
                  )}
                </div>
                <p className="text-foreground leading-relaxed">
                  {currentPair.explanation}
                </p>
              </div>

              <div className="text-center">
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-12 py-6"
                >
                  {state.currentQuestion >= imagePairs.length - 1 ? 'See Results' : 'Next Question'}
                  <ArrowRight size={24} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </Card>

        <EducationalSection />
      </div>
    </div>
  )
}

export default App