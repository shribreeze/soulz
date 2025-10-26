# World ID Verification API Usage

## Endpoint
`POST /api/verify-world-id`

## Request Body
```json
{
  "walletAddress": "0x1234567890abcdef...",
  "worldIdProof": "optional-world-id-proof-string",
  "verificationData": {
    "additionalData": "any additional verification data"
  }
}
```

## Response Examples

### Successful Verification
```json
{
  "success": true,
  "verified": true,
  "confidence": 0.95,
  "message": "World ID verification successful"
}
```

### Failed Verification
```json
{
  "success": false,
  "verified": false,
  "confidence": 0.3,
  "reason": "Insufficient proof data provided",
  "message": "World ID verification failed"
}
```

### User Already Verified
```json
{
  "success": true,
  "message": "User already verified",
  "verified": true
}
```

## Usage Example
```javascript
const response = await fetch('/api/verify-world-id', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    walletAddress: '0x1234567890abcdef...',
    worldIdProof: 'your-world-id-proof-here',
    verificationData: {
      timestamp: Date.now(),
      source: 'world-id-app'
    }
  })
});

const result = await response.json();
console.log(result);
```

## Environment Variables Required
- `ASI_ONE_API_KEY`: Your ASI One API key
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase anon key
