import mongoose, { Schema, model, models } from 'mongoose'

const CustomerSchema = new Schema({
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
    company_name: {
        type: String,
        required: true,
    },
    industry: String,
    health_score: {
        type: Number,
        default: 80,
        min: 0,
        max: 100,
    },
    lifetime_value: {
        type: Number,
        default: 0,
    },
    account_owner: {
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
CustomerSchema.pre('save', async function () {
    this.updated_at = new Date()
})

CustomerSchema.index({ organization_id: 1, email: 1 })
CustomerSchema.index({ organization_id: 1, health_score: 1 })

export default models.Customer || model('Customer', CustomerSchema)
