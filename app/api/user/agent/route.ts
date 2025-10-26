import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface AgentRequest {
    walletAddress: string;
    prompt: string
}

export async function POST(request: NextRequest) {
    try {
        const body: AgentRequest = await request.json();
        const { walletAddress, prompt } = body;

        // 1. Get user from database
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('wallet_address', walletAddress)
            .single();

        if (userError || !user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // 2. Get user personality from user object (assumed personality is a string field)
        const personality = user.personality;

        if (!personality) {
            return NextResponse.json(
                { error: 'User personality not found' },
                { status: 400 }
            );
        }

        // 3. Generate agent using ASI endpoint and user's personality
        const agentPrompt = `
Create an autonomous agent for a user with the following personality profile:
${personality}

Respond with a JSON object describing the agent, including:
- name: string
- persona: string (short description)
- greeting: string (opening line for conversations)
- strengths: string[] (agent's helpful qualities)
- quirks: string[] (funny or unique features)
`;

        const res = await fetch(`${process.env.NEXT_PUBLIC_ASI_ENDPOINT}/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.ASI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: process.env.NEXT_PUBLIC_ASI_AGENTIC_MODEL || "asi1-agentic",
                messages: [{ role: "system", content: agentPrompt }, { role: "user", content: prompt }],
                response_format: { type: "json_object" }
            })
        });

        if (!res.ok) {
            throw new Error(`Failed to generate agent: ${res.statusText}`);
        }

        const aiResponse = await res.json();
        const agentConfig = JSON.parse(aiResponse.choices[0].message.content);

        return NextResponse.json({
            success: true,
            agent: agentConfig,
            message: 'Agent generated successfully based on user personality'
        });
    } catch (error) {
        console.error('Agent generation error:', error);
        return NextResponse.json(
            { error: 'Internal server error during agent generation' },
            { status: 500 }
        );
    }
}
