import { Info } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function EducationalSection() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-8">
      <Separator className="mb-12" />
      
      <Card className="p-8 bg-card border-2">
        <div className="flex items-start gap-4 mb-6">
          <Info size={32} weight="fill" className="text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Why This Matters
            </h3>
            <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">
              The Importance of Media Literacy
            </p>
          </div>
        </div>
        
        <div className="space-y-4 text-foreground leading-relaxed">
          <p>
            As artificial intelligence becomes increasingly sophisticated, the ability to distinguish 
            between AI-generated and authentic images is becoming a critical skill. Synthetic media 
            can be used to spread misinformation, manipulate public opinion, and create convincing 
            deepfakes that blur the line between reality and fabrication.
          </p>
          
          <p>
            <strong className="text-primary">Media literacy in the AI age</strong> requires us to 
            develop a more critical eye when consuming visual content online. While AI-generated 
            images can serve legitimate creative and practical purposes, they can also be weaponized 
            to deceive. Understanding the telltale signs of synthetic media helps protect against 
            manipulation and ensures we're making informed decisions based on authentic information.
          </p>
          
          <p>
            Common indicators of AI-generated images include unusual textures, inconsistent lighting, 
            anatomical irregularities (especially in hands and faces), nonsensical text or symbols, 
            impossible reflections, and backgrounds that lack logical coherence. However, as AI technology 
            advances, these markers become increasingly subtle, making critical evaluation skills more 
            important than ever.
          </p>
          
          <p className="text-accent font-semibold">
            By practicing detection and staying informed about AI capabilities, we can better navigate 
            our digital landscape and maintain trust in the visual information we encounter daily.
          </p>
        </div>
      </Card>
    </div>
  )
}
