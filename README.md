# AI Virtual Try-On Web Application

A modern Next.js application that enables users to upload photos of models and clothing items, then uses AI to generate enhanced product photos and virtual try-on images.

## 🚀 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

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

## 🎯 Core Features

### Frontend
- **Upload Interface**: Drag-and-drop file uploads for model and clothing photos
- **Image Preview**: Real-time preview of uploaded images
- **Loading States**: Smooth loading indicators during AI processing
- **Results Display**: Grid layout showing 4 AI-generated images
- **Responsive Design**: Mobile-first responsive layout

### Backend
- **API Routes**: Next.js API routes for handling uploads and AI processing
- **File Validation**: Image format and size validation
- **AI Integration**: Support for multiple AI services (Replicate, OpenAI, Hugging Face)
- **Error Handling**: Comprehensive error handling and user feedback

## 🔧 Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file with:
   ```env
   REPLICATE_API_TOKEN=your_replicate_token
   OPENAI_API_KEY=your_openai_key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 🎨 AI-Generated Outputs

The application generates four types of images:

1. **Enhanced Product Photo**: Clean background, no wrinkles
2. **Model Wearing Front**: Model wearing the clothing item (front view)
3. **Product Back View**: Back view of the clothing item
4. **Model Wearing Back**: Model wearing the clothing item (back view)

## 🚀 Deployment

The application is designed to be deployed on Vercel with the following considerations:

- Frontend and API routes deploy together
- Environment variables configured in Vercel dashboard
- AI service APIs handle the heavy processing
- Static assets served via CDN

## 📝 Development Notes

- Uses Next.js App Router for modern routing
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn/ui for consistent UI components
- Framer Motion for smooth animations
- Comprehensive error handling and loading states

## 🔐 Security

- Input validation for file types and sizes
- API tokens stored in environment variables
- HTTPS enforced in production
- File size limits (max 10MB per image)
- Secure file upload handling

## 🧪 Testing

- Unit tests for utility functions
- Integration tests for API routes
- E2E tests for user workflows
- Component testing with React Testing Library