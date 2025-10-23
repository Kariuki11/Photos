'use client'

import { motion, easeOut, Variants } from 'framer-motion'
import { ResultCard } from './ResultCard'
import { Download } from 'lucide-react'

interface ResultGridProps {
  images: {
    enhanced_product: string
    model_front: string
    product_back: string
    model_back: string
  }
}

const imageLabels = {
  enhanced_product: 'Enhanced Product',
  model_front: 'Model Wearing (Front)',
  product_back: 'Product Back View',
  model_back: 'Model Wearing (Back View)',
}

export function ResultGrid({ images }: ResultGridProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut, // ✅ imported easing function
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
    >
      {Object.entries(images).map(([key, url], index) => (
        <motion.div key={key} variants={itemVariants}>
          <ResultCard
            imageUrl={url}
            label={imageLabels[key as keyof typeof imageLabels]}
            index={index}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}














































// 'use client'

// import { motion } from 'framer-motion'
// import { ResultCard } from './ResultCard'
// import { Download } from 'lucide-react'

// interface ResultGridProps {
//   images: {
//     enhanced_product: string
//     model_front: string
//     product_back: string
//     model_back: string
//   }
// }

// const imageLabels = {
//   enhanced_product: 'Enhanced Product',
//   model_front: 'Model Wearing (Front)',
//   product_back: 'Product Back View',
//   model_back: 'Model Wearing (Back View)'
// }

// export function ResultGrid({ images }: ResultGridProps) {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         // ease: 'EaseOut',
//         ease: 'easeOut'

//       },
//     },
//   }

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
//     >
//       {Object.entries(images).map(([key, url], index) => (
//         <motion.div key={key} variants={itemVariants}>
//           <ResultCard
//             imageUrl={url}
//             label={imageLabels[key as keyof typeof imageLabels]}
//             index={index}
//           />
//         </motion.div>
//       ))}
//     </motion.div>
//   )
// }
