<script setup>
const toast = useToast()
const prompt = ref('')
const steps = ref(4)
const src = ref('')
const loading = ref(false)
const style = ref('none')
async function generateImage() {
  if (loading.value || !prompt.value) return
  loading.value = true
  const { pathname } = await $fetch('/api/generate', {
    method: 'POST',
    body: {
      prompt: prompt.value,
      style: style.value,
      steps: steps.value,
    },
  }).catch((error) => {
    toast.add({
      title: 'Error',
      description: error.message,
      color: 'red',
    })
  })
  src.value = `/images/${pathname}`
  loading.value = false
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-4 text-center w-full max-w-[420px] mx-auto p-4 lg:p-0">
    <h1 class="text-3xl font-bold">
      Flux-1 Schell Image Generator
    </h1>
    <form class="w-full" @submit.prevent="generateImage()">
      <UFormGroup label="Image prompt" class="mb-4">
        <UTextarea
          v-model="prompt"
          placeholder="A beautiful landscape with a river and mountains"
          class="w-full mb-4"
          autoresize
        />
      </UFormGroup>
      <UFormGroup label="Image style" class="mb-4">
        <USelect
          v-model="style"
          :options="['none', 'photorealistic', 'comic-book', 'neon-punk', 'isometric', 'line-art', 'pixel-art', '3d-model']"
          icon="i-heroicons-paint-brush"
          block
        />
      </UFormGroup>
      <UFormGroup :label="`Number of steps (${steps})`" class="mb-4">
        <URange
          v-model="steps"
          :min="4"
          :max="8"
          size="sm"
        />
      </UFormGroup>
      <UButton
        type="submit"
        color="black"
        block
        :loading="loading"
        :disabled="!prompt"
      >
        Generate
      </UButton>
    </form>
    <img v-if="src" :src="src" class="w-full max-w-[420px]">
  </div>
</template>
