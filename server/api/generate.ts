import { z } from 'zod'

export default eventHandler(async (event) => {

  const { prompt, steps } = await readValidatedBody(event, z.object({
    prompt: z.string(),
    steps: z.number().min(4).max(8).default(4)
  }).parse)

  const { image } = await hubAI().run('@cf/black-forest-labs/flux-1-schnell', {
    prompt,
    num_steps: steps
  })

  const blob = new Blob([Buffer.from(image, 'base64')], { type: 'image/png' })
  const pathname = `${Date.now()}.png`
  
  const blobObject = await hubBlob().put(pathname, blob, {
    customMetadata: {
      prompt,
      steps: String(steps)
    },
  })

  return blobObject
})
