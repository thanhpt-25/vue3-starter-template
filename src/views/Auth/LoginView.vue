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
    <div class="alert alert-info">
      Username: john@mail.com<br />
      Password: changeme
    </div>
    <h2>Login</h2>
    <Form @submit="onSubmit" v-slot="{ errors, isSubmitting }">
      <div class="form-group">
        <label>Username</label>
        <Field
          name="username"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.username }"
        />
        <div class="invalid-feedback">{{ errors.username }}</div>
      </div>
      <div class="form-group">
        <label>Password</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
        />
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Login
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
    </Form>
  </div>
</template>

<style scoped></style>
