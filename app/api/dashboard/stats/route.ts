import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Lead from '@/models/Lead'
import Customer from '@/models/Customer'
import Deal from '@/models/Deal'
import Task from '@/models/Task'

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const orgId = '000000000000000000000001'

        // Fetch all stats in parallel
        const [
            totalLeads,
            totalCustomers,
            totalDeals,
            pipelineValue,
            wonDeals,
            openTasks,
            overdueTasks,
        ] = await Promise.all([
            Lead.countDocuments({ organization_id: orgId }),
            Customer.countDocuments({ organization_id: orgId }),
            Deal.countDocuments({ organization_id: orgId }),
            Deal.aggregate([
                { $match: { organization_id: orgId, stage: { $nin: ['won', 'lost'] } } },
                { $group: { _id: null, total: { $sum: '$value' } } },
            ]),
            Deal.countDocuments({ organization_id: orgId, stage: 'won' }),
            Task.countDocuments({ organization_id: orgId, status: 'open' }),
            Task.countDocuments({
                organization_id: orgId,
                status: 'open',
                due_date: { $lt: new Date() },
            }),
        ])

        // Get recent leads
        const recentLeads = await Lead.find({ organization_id: orgId })
            .sort({ created_at: -1 })
            .limit(5)
            .select('first_name last_name company_name status created_at')
            .lean()

        // Get recent tasks
        const recentTasks = await Task.find({ organization_id: orgId })
            .sort({ due_date: 1 })
            .limit(5)
            .select('title priority due_date status')
            .lean()

        return NextResponse.json({
            stats: {
                totalLeads,
                totalCustomers,
                totalDeals,
                pipelineValue: pipelineValue[0]?.total || 0,
                wonDeals,
                openTasks,
                overdueTasks,
            },
            recentLeads,
            recentTasks,
        })
    } catch (error: any) {
        console.error('Error fetching dashboard stats:', error)
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
