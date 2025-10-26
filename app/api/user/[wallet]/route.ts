import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'



interface RequestParams {
    wallet: string
}

export async function GET(request: NextRequest, { params }: { params: RequestParams }) {
    const { wallet } = params

    if (!wallet) {
        return NextResponse.json({ error: 'Missing wallet parameter' }, { status: 400 })
    }

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', wallet.toLowerCase())
        .maybeSingle()


    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user: data })
}
