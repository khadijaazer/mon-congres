import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fghioidgtuxtauhkgiqa.supabase.co'
const supabaseKey = 'sb_publishable_75nCc8xeCmGEswNp7fcLrQ_xbdF3tCV'

export const supabase = createClient(supabaseUrl, supabaseKey)
