# AI Virtual Try-On Web Application

A modern Next.js application that enables users to upload photos of models and clothing items, then uses AI to generate enhanced product photos and virtual try-on images.



## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # Backend API routes
│   │   └── process/              # AI processing endpoint
│   │       └── route.ts
│   ├── upload/                   # Upload page
│   │   └── page.tsx
│   ├── results/                  # Results display page
│   │   └── page.tsx
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── ui/                       # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── upload/                   # Upload-related components
│   │   ├── UploadForm.tsx        # Main upload form
│   │   ├── FileUpload.tsx        # File upload component
│   │   └── ImagePreview.tsx      # Image preview component
│   └── results/                  # Results display components
│       ├── ResultGrid.tsx        # Grid layout for results
│       ├── ResultCard.tsx        # Individual result card
│       └── LoadingSpinner.tsx    # Loading state component
├── lib/                          # Utility libraries
│   ├── ai/                       # AI service integrations
│   │   ├── replicate.ts          # Replicate API client
│   │   ├── openai.ts             # OpenAI API client
│   │   └── huggingface.ts        # Hugging Face API client
│   ├── storage/                  # File storage utilities
│   │   ├── cloudinary.ts         # Cloudinary integration
│   │   └── local.ts              # Local file handling
│   └── utils.ts                  # General utilities
├── types/                        # TypeScript type definitions
│   ├── upload.ts                 # Upload-related types
│   ├── ai.ts                     # AI service types
│   └── api.ts                    # API response types
├── hooks/                        # Custom React hooks
│   ├── useFileUpload.ts          # File upload logic
│   └── useAIProcessing.ts        # AI processing logic
└── utils/                        # Utility functions
    ├── validation.ts             # Input validation
    └── image.ts                  # Image processing utilities
```

## 🔧 Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

##

##Testing

- Unit tests for utility functions
- Integration tests for API routes
- E2E tests for user workflows
- Component testing with React Testing Library
