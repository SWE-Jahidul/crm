import mongoose, { Schema, model, models } from 'mongoose'

const LeadSchema = new Schema({
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: String,
    company_name: String,
    position: String,
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
        default: 'New',
    },
    source: {
        type: String,
        default: 'Website',
    },
    lead_score: {
        type: Number,
        default: 50,
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    tags: [String],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
})

// Fixed: use async without callback
LeadSchema.pre('save', async function () {
    this.updated_at = new Date()
})

LeadSchema.index({ organization_id: 1, email: 1 })
LeadSchema.index({ organization_id: 1, status: 1 })

export default models.Lead || model('Lead', LeadSchema)
