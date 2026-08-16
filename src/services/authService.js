import { supabase } from './supabaseClient'

function mapProfile(row) {
  if (!row) return null
  return {
    id: row.id,
    businessName: row.business_name,
    businessType: row.business_type,
    businessAddress: row.business_address,
    businessPhone: row.business_phone,
    businessEmail: row.business_email,
    administratorName: row.administrator_name,
    role: row.role
  }
}

export async function signup(values) {
  const { data, error } = await supabase.auth.signUp({
    email: values.businessEmail,
    password: values.password,
    options: {
      data: {
        business_name: values.businessName,
        business_type: values.businessType,
        business_address: values.businessAddress,
        business_phone: values.businessPhone,
        administrator_name: values.administratorName
      }
    }
  })
  if (error) throw new Error(error.message)

  // If email confirmations are re-enabled later, there's no session yet here.
  if (!data.session) return null
  return getCurrentUser()
}

export async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return getCurrentUser()
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const { data, error } = await supabase
    .from('business_profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  if (error) return null
  return mapProfile(data)
}

export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession()
  return Boolean(session)
}

export async function updateBusinessProfile(updates) {
  const fieldMap = {
    businessName: 'business_name',
    businessType: 'business_type',
    businessAddress: 'business_address',
    businessPhone: 'business_phone',
    administratorName: 'administrator_name'
  }
  const payload = {}
  for (const [key, value] of Object.entries(updates)) {
    if (fieldMap[key]) payload[fieldMap[key]] = value
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated.')

  const { data, error } = await supabase
    .from('business_profiles')
    .update(payload)
    .eq('id', user.id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return mapProfile(data)
}

export async function requestPasswordReset(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })
  if (error) throw new Error(error.message)
  return { requested: true }
}