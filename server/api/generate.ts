import { z } from 'zod'

const IMAGE_STYLES = ['none', 'photorealistic', 'comic-book', 'neon-punk', 'isometric', 'line-art', 'pixel-art', '3d-model'] as const

const StyleToPromptMap = {
  none: '',
  photorealistic: ', photorealistic, highly detailed, 8k, sharp focus, perfect lighting, high quality, professional',
  'comic-book': 'comic book, bold outlines, flat colors, action lines',
  'neon-punk': ', cyberpunk, neon lights, high contrast, futuristic',
  isometric: 'isometric projection, 3D geometric style',
  'line-art': 'line art, black and white, clean lines, minimalist',
  'pixel-art': 'pixel art, pixel illustration, pixel drawing, pixel graphic novel, pixel superhero',
  '3d-model': '3d model, realistic textures, studio lighting',
}

export default eventHandler(async (event) => {
  const { prompt, steps, style } = await readValidatedBody(event, z.object({
    prompt: z.string(),
    steps: z.number().min(4).max(8).default(4),
    style: z.enum(IMAGE_STYLES).default('none')
  }).parse)

  const { image } = await hubAI().run('@cf/black-forest-labs/flux-1-schnell', {
    prompt: `${prompt}, ${StyleToPromptMap[style]}`,
    num_steps: steps
  })

  const blob = new Blob([Buffer.from(image, 'base64')], { type: 'image/png' })
  const pathname = `${Date.now()}.png`
  
  const blobObject = await hubBlob().put(pathname, blob, {
    customMetadata: {
      prompt,
      style,
      steps: String(steps)
    },
  })

  return blobObject
})
