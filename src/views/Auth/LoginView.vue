<script setup lang="ts">
import { Form, Field } from 'vee-validate'

import { useAuthStore } from '@/stores/auth.store'

function onSubmit(values, { setErrors }) {
  const authStore = useAuthStore()
  const { username, password } = values

  return authStore.login(username, password).catch((error) => setErrors({ apiError: error }))
}
</script>

<template>
  <div>
    <h2>Login</h2>
    <div class="alert alert-info">
      Username: john@mail.com<br />
      Password: changeme
    </div>
      <div class="w-full max-w-xs">
        <Form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit="onSubmit" v-slot="{ errors, isSubmitting }">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <Field class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" :class="{ 'is-invalid': errors.username }"/>
            <div class="invalid-feedback">{{ errors.username }}</div>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <Field name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" :class="{ 'is-invalid': errors.password }"/>
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" :disabled="isSubmitting">
              <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
              Sign In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
          <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
        </Form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
  </div>
</template>

<style scoped></style>
