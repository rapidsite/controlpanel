import ApiService from './ApiService'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://havlxegijmnxtdwjvxdv.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhdmx4ZWdpam1ueHRkd2p2eGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwODU3NzUsImV4cCI6MTk5ODY2MTc3NX0.YWbnSVFmSt9KSnGRxYommvTb2JZWat0hR3HvXzU-oLc')

export async function apiSignIn(data) {
    
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    const { error } = await supabase.auth.signOut()
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}

