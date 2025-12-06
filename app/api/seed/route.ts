import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Organization from '@/models/Organization'
import User from '@/models/User'
import Lead from '@/models/Lead'
import Customer from '@/models/Customer'
import Deal from '@/models/Deal'
import Task from '@/models/Task'
import bcrypt from 'bcryptjs'

async function seedDatabase() {
    try {
        console.log('🔌 Connecting to MongoDB...')
        await connectDB()
        console.log('✅ Connected to MongoDB')

        // Clear existing data
        console.log('🗑️  Clearing existing data...')
        await Promise.all([
            Organization.deleteMany({}),
            User.deleteMany({}),
            Lead.deleteMany({}),
            Customer.deleteMany({}),
            Deal.deleteMany({}),
            Task.deleteMany({}),
        ])
        console.log('✅ Cleared existing data')

        // Create demo organization with a fixed ID
        console.log('🏢 Creating demo organization...')
        const organization = await Organization.create({
            _id: '000000000000000000000001',
            name: 'Demo Company',
            email: 'admin@democompany.com',
            phone: '+1-555-0000',
            timezone: 'America/New_York',
            currency: 'USD',
            language: 'en',
        })
        console.log('✅ Created organization:', organization.name)

        // Create demo user
        console.log('👤 Creating demo user...')
        const hashedPassword = await bcrypt.hash('demo123', 10)
        const user = await User.create({
            organization_id: organization._id,
            first_name: 'Demo',
            last_name: 'User',
            email: 'demo@crm.com',
            password_hash: hashedPassword,
            phone: '+1-555-0100',
            role: 'admin',
            status: 'active',
        })
        console.log('✅ Created user:', user.email)

        // Create leads
        console.log('📋 Creating leads...')
        const leads = await Lead.insertMany([
            { organization_id: organization._id, first_name: 'Alice', last_name: 'Johnson', email: 'alice@techstartup.com', phone: '+1 555-0101', company_name: 'Tech Startup Inc', status: 'New', source: 'Website', created_at: new Date('2024-03-10') },
            { organization_id: organization._id, first_name: 'Bob', last_name: 'Smith', email: 'bob@globalcorp.com', phone: '+1 555-0102', company_name: 'Global Corp', status: 'Qualified', source: 'Referral', created_at: new Date('2024-03-09') },
            { organization_id: organization._id, first_name: 'Carol', last_name: 'White', email: 'carol@design.com', phone: '+1 555-0103', company_name: 'Design Studio', status: 'Contacted', source: 'LinkedIn', created_at: new Date('2024-03-08') },
            { organization_id: organization._id, first_name: 'David', last_name: 'Brown', email: 'david@law.com', phone: '+1 555-0104', company_name: 'Law Firm', status: 'Converted', source: 'Event', created_at: new Date('2024-03-07') },
            { organization_id: organization._id, first_name: 'Eva', last_name: 'Green', email: 'eva@consult.com', phone: '+1 555-0105', company_name: 'Consulting Group', status: 'Lost', source: 'Website', created_at: new Date('2024-03-06') },
            { organization_id: organization._id, first_name: 'Frank', last_name: 'Miller', email: 'frank@retail.com', phone: '+1 555-0106', company_name: 'Retail Chain', status: 'New', source: 'Ads', created_at: new Date('2024-03-05') },
            { organization_id: organization._id, first_name: 'Grace', last_name: 'Lee', email: 'grace@soft.com', phone: '+1 555-0107', company_name: 'Software House', status: 'Qualified', source: 'Referral', created_at: new Date('2024-03-04') },
            { organization_id: organization._id, first_name: 'Henry', last_name: 'Wilson', email: 'henry@manufacture.com', phone: '+1 555-0108', company_name: 'Manufacture Co', status: 'Contacted', source: 'Cold Call', created_at: new Date('2024-03-03') },
            { organization_id: organization._id, first_name: 'Isabel', last_name: 'Taylor', email: 'isabel@market.com', phone: '+1 555-0109', company_name: 'Marketing Agency', status: 'New', source: 'Website', created_at: new Date('2024-03-02') },
            { organization_id: organization._id, first_name: 'Jack', last_name: 'Anderson', email: 'jack@logistics.com', phone: '+1 555-0110', company_name: 'Logistics Co', status: 'Qualified', source: 'LinkedIn', created_at: new Date('2024-03-01') },
        ])
        console.log(`✅ Created ${leads.length} leads`)

        // Create customers
        console.log('👥 Creating customers...')
        const customers = await Customer.insertMany([
            { organization_id: organization._id, first_name: 'Alice', last_name: 'Johnson', company_name: 'Tech Startup Inc', email: 'alice@techstartup.com', phone: '+1 555-0101', health_score: 95, lifetime_value: 12500, tags: ['Enterprise', 'High Value'] },
            { organization_id: organization._id, first_name: 'Bob', last_name: 'Smith', company_name: 'Global Corp', email: 'bob@globalcorp.com', phone: '+1 555-0102', health_score: 88, lifetime_value: 50000, tags: ['VIP', 'Reference'] },
            { organization_id: organization._id, first_name: 'Carol', last_name: 'White', company_name: 'Design Studio', email: 'carol@design.com', phone: '+1 555-0103', health_score: 75, lifetime_value: 8000, tags: ['Creative', 'SMB'] },
            { organization_id: organization._id, first_name: 'David', last_name: 'Brown', company_name: 'Law Firm', email: 'david@law.com', phone: '+1 555-0104', health_score: 60, lifetime_value: 15000, tags: ['Professional'] },
            { organization_id: organization._id, first_name: 'Eva', last_name: 'Green', company_name: 'Consulting Group', email: 'eva@consult.com', phone: '+1 555-0105', health_score: 92, lifetime_value: 25000, tags: ['High Value'] },
            { organization_id: organization._id, first_name: 'Frank', last_name: 'Miller', company_name: 'Retail Chain', email: 'frank@retail.com', phone: '+1 555-0106', health_score: 55, lifetime_value: 100000, tags: ['Enterprise', 'Risk'] },
            { organization_id: organization._id, first_name: 'Grace', last_name: 'Lee', company_name: 'Software House', email: 'grace@soft.com', phone: '+1 555-0107', health_score: 85, lifetime_value: 30000, tags: ['Tech'] },
            { organization_id: organization._id, first_name: 'Henry', last_name: 'Wilson', company_name: 'Manufacture Co', email: 'henry@manufacture.com', phone: '+1 555-0108', health_score: 70, lifetime_value: 45000, tags: ['Industrial'] },
            { organization_id: organization._id, first_name: 'Isabel', last_name: 'Taylor', company_name: 'Marketing Agency', email: 'isabel@market.com', phone: '+1 555-0109', health_score: 80, lifetime_value: 18000, tags: ['Service'] },
            { organization_id: organization._id, first_name: 'Jack', last_name: 'Anderson', company_name: 'Logistics Co', email: 'jack@logistics.com', phone: '+1 555-0110', health_score: 90, lifetime_value: 60000, tags: ['Transport'] },
        ])
        console.log(`✅ Created ${customers.length} customers`)

        // Create deals
        console.log('💼 Creating deals...')
        const deals = await Deal.insertMany([
            { organization_id: organization._id, name: 'Enterprise License', value: 50000, stage: 'negotiation', probability: 75, expected_close_date: new Date('2024-04-15'), customer_name: 'Tech Startup Inc', customer_id: customers[0]._id },
            { organization_id: organization._id, name: 'Startup Package', value: 5000, stage: 'won', probability: 100, expected_close_date: new Date('2024-03-01'), customer_name: 'Global Corp', customer_id: customers[1]._id },
            { organization_id: organization._id, name: 'Consulting Project', value: 15000, stage: 'qualified', probability: 50, expected_close_date: new Date('2024-05-10'), customer_name: 'Design Studio', customer_id: customers[2]._id },
            { organization_id: organization._id, name: 'Maintenance Contract', value: 8000, stage: 'closing', probability: 90, expected_close_date: new Date('2024-03-20'), customer_name: 'Law Firm', customer_id: customers[3]._id },
            { organization_id: organization._id, name: 'Training Session', value: 2000, stage: 'new', probability: 20, expected_close_date: new Date('2024-06-01'), customer_name: 'Consulting Group', customer_id: customers[4]._id },
            { organization_id: organization._id, name: 'Custom Development', value: 25000, stage: 'contacted', probability: 40, expected_close_date: new Date('2024-04-30'), customer_name: 'Retail Chain', customer_id: customers[5]._id },
            { organization_id: organization._id, name: 'Cloud Migration', value: 12000, stage: 'new', probability: 25, expected_close_date: new Date('2024-05-20'), customer_name: 'Software House', customer_id: customers[6]._id },
            { organization_id: organization._id, name: 'Security Audit', value: 9000, stage: 'negotiation', probability: 70, expected_close_date: new Date('2024-04-05'), customer_name: 'Marketing Agency', customer_id: customers[7]._id },
            { organization_id: organization._id, name: 'API Integration', value: 6000, stage: 'qualified', probability: 55, expected_close_date: new Date('2024-05-01'), customer_name: 'Logistics Co', customer_id: customers[9]._id },
            { organization_id: organization._id, name: 'Mobile App V2', value: 40000, stage: 'lost', probability: 0, expected_close_date: new Date('2024-02-15'), customer_name: 'Real Estate' },
        ])
        console.log(`✅ Created ${deals.length} deals`)

        // Create tasks
        console.log('✅ Creating tasks...')
        const today = new Date()
        const tasks = await Task.insertMany([
            { organization_id: organization._id, title: 'Follow up with Alice', status: 'open', priority: 'high', category: 'call', due_date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), description: 'Discuss contract details', related_to_type: 'lead' },
            { organization_id: organization._id, title: 'Prepare proposal for Global Corp', status: 'completed', priority: 'medium', category: 'email', due_date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), description: 'Send initial draft', related_to_type: 'customer', completed_at: new Date() },
            { organization_id: organization._id, title: 'Schedule demo', status: 'open', priority: 'medium', category: 'meeting', due_date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), description: 'Product demonstration', related_to_type: 'lead' },
            { organization_id: organization._id, title: 'Email marketing campaign', status: 'open', priority: 'low', category: 'email', due_date: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000), description: 'Q2 Newsletter', related_to_type: 'general' },
            { organization_id: organization._id, title: 'Review quarterly report', status: 'cancelled', priority: 'high', category: 'other', due_date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), description: 'Internal review', related_to_type: 'general' },
            { organization_id: organization._id, title: 'Client lunch', status: 'open', priority: 'medium', category: 'meeting', due_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), description: 'Discuss expansion', related_to_type: 'customer' },
        ])
        console.log(`✅ Created ${tasks.length} tasks`)

        return {
            success: true,
            message: 'Database seeded successfully!',
            data: {
                organizations: 1,
                users: 1,
                leads: leads.length,
                customers: customers.length,
                deals: deals.length,
                tasks: tasks.length,
            },
        }
    } catch (error: any) {
        console.error('❌ Error seeding database:', error)
        return {
            success: false,
            message: error.message || 'Internal server error',
            error: true,
        }
    }
}

// Both GET and POST work for browser compatibility
export async function GET() {
    const result = await seedDatabase()
    return NextResponse.json(result, { status: result.error ? 500 : 200 })
}

export async function POST() {
    const result = await seedDatabase()
    return NextResponse.json(result, { status: result.error ? 500 : 200 })
}
