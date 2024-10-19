// Função auxiliar para converter strings para ArrayBuffer
function stringToArrayBuffer(str: string): ArrayBuffer {
  const encoder = new TextEncoder()
  return encoder.encode(str).buffer
}

// Função auxiliar para converter ArrayBuffer para string
function arrayBufferToString(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder()
  return decoder.decode(buffer)
}

// Função auxiliar para gerar um IV aleatório
function generateRandomIV(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16)) // Gera um IV de 16 bytes
}

const algorithm = 'AES-CBC'
const keySize = 256 // Tamanho da chave em bits

// Gera a chave a partir da VITE_SECRET_KEY
async function deriveKey(secret: string): Promise<CryptoKey> {
  const keyBuffer = stringToArrayBuffer(secret)
  return await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: algorithm, length: keySize },
    false,
    ['encrypt', 'decrypt']
  )
}

export async function encrypt(text: string): Promise<string> {
  console.log(import.meta.env.VITE_SECRET_KEY, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAQUI')
  const key = await deriveKey(import.meta.env.VITE_SECRET_KEY)

  if (!key) {
    throw new Error('Key generation failed.')
  }

  const iv = generateRandomIV()

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: algorithm,
      iv: iv
    },
    key,
    stringToArrayBuffer(text)
  )

  const encryptedArray = new Uint8Array(encryptedBuffer)
  // Retorna o IV em hexadecimal seguido do texto criptografado em hexadecimal
  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  const encryptedHex = Array.from(encryptedArray)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  return `${ivHex}:${encryptedHex}`
}

export async function decrypt(text: string): Promise<string> {
  const [ivText, encryptedText] = text.split(':')

  // Verifica se ivText e encryptedText estão definidos e têm o formato correto
  if (!ivText || !encryptedText) {
    throw new Error('Invalid input for decryption.')
  }

  const iv = new Uint8Array(ivText.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [])
  const key = await deriveKey(import.meta.env.VITE_SECRET_KEY)

  const encryptedArray = new Uint8Array(
    encryptedText.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  )

  // Verifica se a descriptografia foi bem-sucedida
  try {
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: algorithm,
        iv: iv
      },
      key,
      encryptedArray
    )

    return arrayBufferToString(decryptedBuffer)
  } catch (e) {
    throw new Error('Decryption failed: ' + e)
  }
}
