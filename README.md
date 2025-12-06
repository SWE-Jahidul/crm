# Sales CRM - Enterprise Customer Relationship Management

A comprehensive, full-stack CRM application built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

### Core Modules
- **Authentication**: JWT-based login with role-based access control
- **Lead Management**: Create, score, qualify, and track sales leads
- **Customer Management**: Manage customer profiles and relationships
- **Sales Pipeline**: Kanban board for visualizing deals by stage
- **Tasks & Calendar**: Organize follow-ups and activities
- **Dashboard**: Real-time KPIs, charts, and analytics
- **Settings**: Organization and user configuration

### Key Capabilities
- Real-time dashboard with pipeline analytics
- Lead scoring and qualification workflow
- Customer health score tracking
- Sales pipeline forecasting
- Task management with due dates and reminders
- Activity timeline for all interactions
- Responsive design (mobile, tablet, desktop)
- Dark mode support

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Authentication**: JWT with bcrypt
- **Data**: Mock in-memory database (ready for MongoDB integration)

## Getting Started

### Demo Credentials
- **Email**: `demo@crm.com`
- **Password**: `demo123`

### Installation

\`\`\`bash
# Clone the repository
git clone <repo-url>
cd crm-app

# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000
\`\`\`

## Project Structure

\`\`\`
app/
├── api/                    # API routes
│   ├── auth/              # Authentication endpoints
│   ├── leads/             # Lead management API
│   ├── customers/         # Customer management API
│   ├── deals/             # Sales pipeline API
│   └── tasks/             # Task management API
├── dashboard/             # Main dashboard
├── leads/                 # Lead management pages
├── customers/             # Customer management pages
├── pipeline/              # Sales pipeline Kanban board
├── tasks/                 # Task management pages
├── settings/              # Settings and configuration
├── login/                 # Login page
└── layout.tsx             # Root layout with auth

components/
├── auth-provider.tsx      # Authentication context
├── ui/                    # shadcn/ui components

lib/
├── types.ts              # TypeScript type definitions
├── hooks.ts              # Custom React hooks
├── auth-client.ts        # Client-side auth utilities
└── utils.ts              # Utility functions
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Leads
- `GET /api/leads` - List leads with pagination
- `POST /api/leads` - Create new lead
- `GET /api/leads/:id` - Get lead details

### Customers
- `GET /api/customers` - List customers
- `POST /api/customers` - Create new customer
- `GET /api/customers/:id` - Get customer details

### Deals
- `GET /api/deals` - List deals
- `POST /api/deals` - Create new deal
- `PATCH /api/deals/:id/stage` - Update deal stage

### Tasks
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id/complete` - Complete task

## Future Enhancements

### Phase 2
- Email integration (Gmail, Outlook)
- SMS and call logging with Twilio
- Advanced reporting and custom dashboards
- Email templates and automation
- Activity timeline improvements

### Phase 3
- AI-powered lead scoring
- Predictive analytics
- Workflow automation
- Multi-tenant SaaS architecture
- Mobile app (React Native)

## Database Integration

Currently uses mock in-memory data. To integrate with MongoDB:

1. Install MongoDB client:
\`\`\`bash
npm install mongoose
\`\`\`

2. Update API routes in `app/api/` to use database operations

3. Create database connection module in `lib/db.ts`

4. Define Mongoose schemas in `lib/models/`

## Deployment

### Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Docker

\`\`\`bash
# Build image
docker build -t crm-app .

# Run container
docker run -p 3000:3000 crm-app
\`\`\`

## Configuration

Environment variables (create `.env.local`):

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3000
JWT_SECRET=your-secret-key
\`\`\`

## Security Considerations

- Implement proper database validation
- Add rate limiting to API routes
- Use HTTPS in production
- Implement CSRF protection
- Add input sanitization
- Enable CORS properly
- Use secure HTTP-only cookies for tokens

## Support & Contribution

For issues, features, or contributions, please open an issue or pull request.

## License

MIT License - See LICENSE file for details

---

Built with ❤️ for enterprise sales teams
