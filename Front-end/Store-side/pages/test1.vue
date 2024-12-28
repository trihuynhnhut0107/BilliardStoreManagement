<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
    if (newQuestion.includes('?')) {
        loading.value = true
        answer.value = 'Thinking...'
        try {
            const { data, error } = await useFetch('https://yesno.wtf/api');
            alert(JSON.stringify(data.value));
            console.log((data.value));
            answer.value = data.value.answer
        } catch (error) {
            answer.value = 'Error! Could not reach the API. ' + error
        } finally {
            loading.value = false
        }
    }
})

</script>

<template>
    <p>
        Ask a yes/no question:
        <input v-model="question" :disabled="loading" />
    </p>
    <p>{{ answer }}</p>
</template>