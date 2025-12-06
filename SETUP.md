# CRM Software - Setup & Installation Guide

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone/Download the Project**
   \`\`\`bash
   # If you downloaded as ZIP, extract it
   unzip crm-software.zip
   cd crm-software
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   # or
   pnpm install
   \`\`\`

3. **Run Development Server**
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   \`\`\`

4. **Access the Application**
   - Open http://localhost:3000 in your browser
   - No login required - dashboard loads automatically with demo data

## Demo Credentials

The application uses auto-login with demo credentials:
- **Email**: demo@crm.com
- **Organization**: Demo Company

## Project Structure

\`\`\`
crm-software/
├── app/
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── customers/       # Customer API
│   │   ├── deals/           # Deal API
│   │   ├── leads/           # Lead API
│   │   └── tasks/           # Task API
│   ├── dashboard/           # Dashboard page
│   ├── leads/              # Leads management
│   ├── customers/          # Customer management
│   ├── pipeline/           # Sales pipeline
│   ├── tasks/              # Tasks management
│   ├── settings/           # Settings page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── auth-provider.tsx   # Auth context provider
│   ├── activity-feed.tsx   # Activity timeline
│   ├── communication-panel.tsx  # Email, call, SMS
│   ├── deal-form.tsx       # Deal creation form
│   ├── lead-form.tsx       # Lead creation form
│   ├── task-form.tsx       # Task creation form
│   ├── notes-panel.tsx     # Notes management
│   ├── customer-form.tsx   # Customer creation
│   ├── settings-tabs.tsx   # Settings tabs
│   ├── ui/                 # shadcn/ui components
│   └── [other components]
├── lib/
│   ├── types.ts            # TypeScript types
│   ├── hooks.ts            # React hooks
│   ├── auth-client.ts      # Auth utilities
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
└── package.json            # Dependencies
\`\`\`

## Key Technologies

- **Frontend**: React 18, Next.js 14, TypeScript
- **UI**: Tailwind CSS v4, shadcn/ui, Lucide Icons
- **State Management**: React Hooks, Context API, TanStack Query (ready)
- **Forms**: React Hook Form, Zod validation (ready)
- **Charts**: Recharts
- **Database Ready**: MongoDB, Neon, Supabase integration points

## Available Commands

\`\`\`bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
\`\`\`

## Environment Variables

Create a `.env.local` file if using real integrations:

\`\`\`env
# Example for integrations (optional)
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_KEY=your_key_here
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Vercel auto-detects Next.js configuration
4. Click "Deploy"

\`\`\`bash
# Or use Vercel CLI
npm i -g vercel
vercel
\`\`\`

### Deploy to Other Platforms

- **Netlify**: Requires Node.js runtime
- **AWS Amplify**: Full serverless support
- **Google Cloud Run**: Docker container support
- **Self-hosted**: Use `npm run build && npm start`

## Next Steps

1. **Connect Database**: Replace mock API endpoints with real database
2. **Add Authentication**: Implement bcrypt and JWT properly
3. **Email Integration**: Connect Gmail/Outlook OAuth
4. **SMS Integration**: Set up Twilio for SMS
5. **Real-time Updates**: Add Socket.io for live notifications
6. **Mobile App**: Build React Native version
7. **Advanced Features**: Implement AI scoring and automation

## Customization

### Change Primary Color
Edit `app/globals.css`:
\`\`\`css
@theme {
  --primary: ... /* your color */
}
\`\`\`

### Add Custom Fields
Edit API endpoints and add database schema

### Modify Pipeline Stages
Edit `STAGES` constant in `app/pipeline/page.tsx`

### Add New Roles
Update `lib/types.ts` and role management components

## Troubleshooting

### Port Already in Use
\`\`\`bash
npx kill-port 3000
npm run dev
\`\`\`

### Module Not Found
\`\`\`bash
npm install
# or clear cache
rm -rf node_modules .next
npm install
npm run dev
\`\`\`

### Authentication Issues
- Check browser localStorage for auth token
- Clear browser cache and try again
- Open DevTools console for error messages

## Support & Documentation

- Refer to FEATURES.md for complete feature list
- Check inline code comments
- Review Next.js documentation: https://nextjs.org/docs
- shadcn/ui components: https://ui.shadcn.com

## License

This project is provided as-is for demonstration and development purposes.
