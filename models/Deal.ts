import mongoose, { Schema, model, models } from 'mongoose'

const DealSchema = new Schema({
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    customer_name: String,
    value: {
        type: Number,
        required: true,
        default: 0,
    },
    stage: {
        type: String,
        enum: ['new', 'contacted', 'qualified', 'negotiation', 'closing', 'won', 'lost'],
        default: 'new',
    },
    probability: {
        type: Number,
        default: 25,
        min: 0,
        max: 100,
    },
    expected_close_date: {
        type: Date,
        required: true,
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    owner_name: String,
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
DealSchema.pre('save', async function () {
    this.updated_at = new Date()
})

DealSchema.index({ organization_id: 1, stage: 1 })
DealSchema.index({ organization_id: 1, expected_close_date: 1 })

export default models.Deal || model('Deal', DealSchema)
