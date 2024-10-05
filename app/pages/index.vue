<script setup>
const prompt = ref('')
const steps = ref(4)
const src = ref('')
const loading = ref(false)
async function generateImage() {
  if (loading.value || !prompt.value) return
  loading.value = true
  const { pathname } = await $fetch('/api/generate', {
    method: 'POST',
    body: {
      prompt: prompt.value,
      steps: steps.value,
    },
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
      <UTextarea
        v-model="prompt"
        placeholder="Enter a prompt"
        class="w-full mb-4"
        autoresize
      />
      <UFormGroup :label="`Number of steps (${steps})`" class="mb-4">
        <URange
          v-model="steps"
          :min="4"
          :max="8"
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
