# Planning Guide

An interactive educational quiz that teaches users to distinguish between AI-generated and real images, helping them develop critical media literacy skills in the age of synthetic media.

**Experience Qualities**: 
1. **Educational** - Users should feel they're learning valuable skills with each attempt, gaining insight into the subtle differences between real and AI-generated content.
2. **Engaging** - The quiz format creates a game-like experience that keeps users motivated to complete all challenges and improve their detection abilities.
3. **Revealing** - Each answer should provide an "aha moment" where users understand what they missed or correctly identified, building pattern recognition skills.

**Complexity Level**: Light Application (multiple features with basic state)
This is a multi-step quiz with state management for progress tracking, score calculation, and sequential image presentation, but doesn't require complex routing or advanced data operations.

## Essential Features

### Image Pair Quiz Challenge
- **Functionality**: Display two images side-by-side, one real and one AI-generated, prompting user to identify the AI image
- **Purpose**: Core learning mechanism that tests and builds the user's ability to detect synthetic media
- **Trigger**: Automatically starts when user loads the page or clicks to begin the quiz
- **Progression**: User views image pair → User selects which image they believe is AI-generated → Click submit/confirm → System reveals correct answer with explanation → User clicks next → Process repeats for remaining pairs
- **Success criteria**: User can select an image, receive immediate feedback, see explanatory text, and progress through all pairs sequentially

### Answer Feedback System
- **Functionality**: Show whether the user's choice was correct or incorrect, highlight the AI image, and display detailed explanation
- **Purpose**: Provides learning opportunity by explaining what visual cues differentiate real from AI-generated
- **Trigger**: User submits their selection for the current image pair
- **Progression**: User submits answer → System displays correct/incorrect indicator → Highlights AI-generated image → Shows explanation text → Enables next button
- **Success criteria**: Clear visual distinction between correct/incorrect states, explanation is readable and informative

### Progress Tracking
- **Functionality**: Track which question user is on and their running score throughout the quiz
- **Purpose**: Helps users understand how far they've progressed and motivates completion
- **Trigger**: Updates automatically after each answer submission
- **Progression**: User answers question → Score increments if correct → Question counter advances → Progress bar/indicator updates
- **Success criteria**: Visible progress indicator showing current question number and total, accurate score tracking

### Final Score Summary
- **Functionality**: Display total score, percentage correct, and performance feedback when quiz completes
- **Purpose**: Provides sense of achievement and motivation to retry/improve
- **Trigger**: User completes the final image pair
- **Progression**: User answers last question → System calculates final score → Displays results screen with score, percentage, and encouraging message → Option to restart quiz
- **Success criteria**: Clear presentation of score, percentage calculation, ability to restart quiz

### Educational Context Section
- **Functionality**: Static informational section explaining why AI detection matters
- **Purpose**: Provides broader context about media literacy and the importance of critical evaluation
- **Trigger**: Always visible at bottom of page
- **Progression**: User scrolls to bottom → Reads educational content about AI-generated media impact
- **Success criteria**: Content is well-written, accessible, and emphasizes real-world importance

## Edge Case Handling

- **No images loaded**: Display message prompting user to add images to the application
- **Incomplete image pairs**: Gracefully handle odd numbers of images by excluding the last unpaired image
- **Mid-quiz refresh**: Store progress in KV store so users can resume where they left off
- **Rapid clicking**: Disable selection/submit buttons after submission until feedback is shown
- **Mobile small screens**: Stack images vertically instead of horizontally for better viewing

## Design Direction

The design should evoke feelings of curiosity, focus, and clarity - like a sophisticated digital learning tool. It should feel modern and trustworthy, with visual design that emphasizes the analytical nature of comparing images. The interface should guide users' attention effectively between comparison, selection, and learning moments.

## Color Selection

A sophisticated, modern palette that feels educational and tech-forward, with strong contrast to maintain focus on the images.

- **Primary Color**: Deep indigo `oklch(0.35 0.15 275)` - Communicates intelligence, trust, and digital sophistication
- **Secondary Colors**: Cool slate backgrounds `oklch(0.96 0.01 260)` for cards and `oklch(0.25 0.01 260)` for dark accents
- **Accent Color**: Vibrant cyan `oklch(0.70 0.15 200)` - Draws attention to interactive elements and correct answers, feels modern and digital
- **Foreground/Background Pairings**: 
  - Primary (Deep Indigo): White text `oklch(0.99 0 0)` - Ratio 9.2:1 ✓
  - Accent (Vibrant Cyan): Dark slate text `oklch(0.25 0.01 260)` - Ratio 5.1:1 ✓
  - Background (Pale Slate): Dark text `oklch(0.25 0.01 260)` - Ratio 12.8:1 ✓
  - Success green `oklch(0.65 0.18 150)` for correct answers
  - Error red `oklch(0.60 0.22 25)` for incorrect answers

## Font Selection

Typography should feel modern, technical, and highly readable - conveying precision and clarity appropriate for an analytical task.

- **Primary Font**: Space Grotesk - A geometric sans-serif with technical character that feels contemporary without being sterile
- **Typographic Hierarchy**: 
  - H1 (Page Title): Space Grotesk Bold/36px/tight letter-spacing
  - H2 (Section Headers): Space Grotesk SemiBold/24px/normal spacing
  - H3 (Question Number): Space Grotesk Medium/18px/wide letter-spacing
  - Body (Instructions & Explanations): Space Grotesk Regular/16px/relaxed line-height (1.6)
  - Small (Progress Text): Space Grotesk Medium/14px/normal spacing

## Animations

Animations should emphasize the reveal moment when answers are shown and guide users smoothly through the quiz progression.

- **Image Selection**: Subtle scale transform (1.0 → 1.02) and border color change on hover, with soft shadow enhancement to indicate interactivity
- **Answer Reveal**: Smooth color transition on image borders (green for correct, red for incorrect), with a gentle shake animation for wrong answers
- **Progress Transitions**: Fade out current question and fade in next question with slight vertical slide (20px) for smooth progression
- **Score Counter**: Number counting animation when final score is displayed
- **Button States**: Micro-interactions on hover/press with color transitions and subtle scale changes

## Component Selection

- **Components**: 
  - `Card` for image containers and result display - add stronger shadows and border styles
  - `Button` for selection confirmation and navigation - customize with vibrant colors and clear hover states
  - `Progress` bar for quiz advancement visualization
  - `Badge` for displaying current question number and score
  - `Separator` to divide quiz area from educational content
  - `Alert` or custom component for answer feedback with icons
  
- **Customizations**: 
  - Custom image comparison component with clickable/selectable image cards
  - Custom result card with score visualization
  - Custom explanation panel that appears after answer submission
  
- **States**: 
  - Images: Default (neutral border) → Hover (highlighted border, lifted shadow) → Selected (accented border) → Revealed (green/red border based on correctness)
  - Submit Button: Disabled (grayed) when no selection → Enabled (vibrant accent) when image selected → Loading state during transition
  - Next Button: Hidden until answer revealed → Fade in with accent color
  
- **Icon Selection**: 
  - `Check` (checkmark) for correct answers
  - `X` (x mark) for incorrect answers
  - `ArrowRight` for next question navigation
  - `Trophy` for final score display
  - `Repeat` for restart quiz option
  - `Info` for educational context section
  
- **Spacing**: 
  - Card padding: `p-6` for image containers
  - Gap between images: `gap-6` for side-by-side layout
  - Section spacing: `space-y-8` for vertical stacking
  - Container max-width: `max-w-6xl` centered
  
- **Mobile**: 
  - Images stack vertically on screens <768px
  - Larger touch targets (min 48px height) for all interactive elements
  - Full-width buttons on mobile for easier interaction
  - Reduced padding on cards to maximize image viewing space
  - Progressive disclosure: Show one image at a time on very small screens (<640px) with swipe or tab navigation
