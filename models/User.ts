import mongoose, { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
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
        unique: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    phone: String,
    role: {
        type: String,
        enum: ['admin', 'manager', 'sales_executive', 'sales_exec', 'support'],
        default: 'sales_executive',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
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
UserSchema.pre('save', async function () {
    this.updated_at = new Date()
})

export default models.User || model('User', UserSchema)
