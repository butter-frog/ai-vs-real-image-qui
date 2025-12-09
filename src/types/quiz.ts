export interface ImagePair {
  id: number
  realImage: string
  aiImage: string
  explanation: string
}

export interface QuizState {
  currentQuestion: number
  score: number
  selectedImage: 'left' | 'right' | null
  isAnswered: boolean
  showResults: boolean
}