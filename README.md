<<<<<<< HEAD
# AI Powered Security Logger
=======
# LOGS ANALYZER
>>>>>>> 18a9f4fc8a08739db898d75cd27ca196d5d33b75

> AI-powered log analysis and threat detection system

## 🚀 Overview

AI Powered Security Logger is a sophisticated React-based application designed for intelligent log analysis and cybersecurity threat detection. Built with modern web technologies, it provides a comprehensive dashboard for monitoring, analyzing, and responding to security incidents.

## ✨ Features

- **Dashboard** - Real-time monitoring and analytics overview
- **Threat Analysis** - AI-powered threat detection and analysis
- **Incident Response** - Streamlined incident management workflow
- **Reports** - Comprehensive reporting and data visualization
- **Settings** - Customizable configuration options
- **Authentication** - Secure user authentication with Clerk
- **Responsive Design** - Mobile-friendly interface with shadcn/ui components

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Authentication**: Clerk
- **Icons**: Lucide React
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form
- **Animation**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TRIDYY/alert-tamer-ai.git
   cd alert-tamer-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer)
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── main.tsx           # Application entry point
```

## 🔧 Configuration

The application uses Vite for building and development. Configuration can be found in:

- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**TRIDYY**
- GitHub: [@TRIDYY](https://github.com/TRIDYY)

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication by [Clerk](https://clerk.com/)
- Icons by [Lucide](https://lucide.dev/)
