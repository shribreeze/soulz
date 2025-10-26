// import { NextRequest, NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabase';

// interface WorldIdVerificationRequest {
//     walletAddress: string;
// }

// export async function POST(request: NextRequest) {
//     try {
//         const body: WorldIdVerificationRequest = await request.json();

//         const { walletAddress } = body;


//         // Check if user exists in database
//         const { data: user, error: userError } = await supabase
//             .from('users')
//             .select('*')
//             .eq('wallet_address', walletAddress)
//             .single();

//         if (userError || !user) {
//             return NextResponse.json(
//                 { error: 'User not found' },
//                 { status: 404 }
//             );
//         }

//         // If user is already verified, return success
//         if (user.verified) {
//             return NextResponse.json({
//                 success: true,
//                 message: 'User already verified',
//                 verified: true
//             });
//         }

//         // Use ASI One API to verify World ID
//         const verificationPrompt = `Please verify this World ID proof for user with wallet address ${walletAddress}. 
//     World ID Proof: ${worldIdProof || 'No proof provided'}
//     Additional verification data: ${JSON.stringify(verificationData || {})}
    
//     Respond with a JSON object containing:
//     - verified: boolean (true if verification is successful)
//     - confidence: number (0-1, confidence level of verification)
//     - reason: string (explanation of verification result)`;

//         const res = await fetch("https://api.asi1.ai/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${process.env.ASI_ONE_API_KEY}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 model: "asi1-mini",
//                 messages: [{ role: "user", content: verificationPrompt }],
//                 response_format: { type: "json_object" }
//             })
//         });

//         if (!res.ok) {
//             throw new Error(`ASI API request failed: ${res.status}`);
//         }

//         const aiResponse = await res.json();
//         const verificationResult = JSON.parse(aiResponse.choices[0].message.content);

//         // Update user verification status in database
//         if (verificationResult.verified && verificationResult.confidence > 0.7) {
//             const { error: updateError } = await supabase
//                 .from('users')
//                 .update({ verified: true })
//                 .eq('wallet_address', walletAddress);

//             if (updateError) {
//                 console.error('Database update error:', updateError);
//                 return NextResponse.json(
//                     { error: 'Failed to update verification status' },
//                     { status: 500 }
//                 );
//             }

//             return NextResponse.json({
//                 success: true,
//                 verified: true,
//                 confidence: verificationResult.confidence,
//                 message: 'World ID verification successful'
//             });
//         } else {
//             return NextResponse.json({
//                 success: false,
//                 verified: false,
//                 confidence: verificationResult.confidence,
//                 reason: verificationResult.reason,
//                 message: 'World ID verification failed'
//             });
//         }

//     } catch (error) {
//         console.error('World ID verification error:', error);
//         return NextResponse.json(
//             { error: 'Internal server error during verification' },
//             { status: 500 }
//         );
//     }
// }