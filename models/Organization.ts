import mongoose, { Schema, model, models } from 'mongoose'

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: String,
    timezone: {
        type: String,
        default: 'America/New_York',
    },
    currency: {
        type: String,
        default: 'USD',
    },
    language: {
        type: String,
        default: 'en',
    },
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
OrganizationSchema.pre('save', async function () {
    this.updated_at = new Date()
})

export default models.Organization || model('Organization', OrganizationSchema)
