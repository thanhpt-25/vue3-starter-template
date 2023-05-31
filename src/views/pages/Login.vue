<script setup lang="ts">
import {useAuthStore} from '@/stores/auth.store'
import {Field, Form, ErrorMessage} from "vee-validate";

let validated: boolean = false

async function onSubmit(values, {setErrors}) {
  console.log(values)
  const authStore = useAuthStore()
  try {
    return await authStore.login(values)
  } catch (error) {
    /*
     * Usually errors is set by VeeValeedate but
     * here we used Joi that is why we manually add Joi's returned exception to VeeValidate Error
     * using ...error.details,
     */
    setErrors({
      ...error.details,
      apiError: error.message
    })
    /**
     * Re-throw error for handler to catch and handle
     */
    throw error
  } finally {
    validated = true
  }
}
</script>

<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <div class="alert alert-info">
        Username: john@mail.com<br/>
        Password: changeme
      </div>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <Form as="div" v-slot="{ errors, isSubmitting }" @submit="onSubmit">
                  <CForm novalidate class="needs-validation" :validated="validated">
                    <h1>Login</h1>
                    <p class="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup class="mb-3 has-validation">
                      <CInputGroupText>
                        <CIcon icon="cil-user"/>
                      </CInputGroupText>
                      <Field name="username" v-slot="{ field }" rules="required|email">
                        <CFormInput
                            v-bind="field"
                            placeholder="Username"
                            autocomplete="username"
                            id="username"
                            name="username"
                            type="text"
                            :invalid="errors.username!=null"
                            :feedback-invalid="errors.username"
                        />
                      </Field>
                    </CInputGroup>
                    <CInputGroup class="mb-4 has-validation">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked"/>
                      </CInputGroupText>
                      <Field name="password" v-slot="{ field }" rules="required|min:8">
                        <CFormInput
                            v-bind="field"
                            type="password"
                            placeholder="Password"
                            autocomplete="current-password"
                            name="password"
                            id="password"
                            :invalid="errors.password!=null"
                            :feedback-invalid="errors.password"
                        />
                      </Field>
                    </CInputGroup>
                    <CRow>
                      <CCol :xs="6">
                        <CButton color="primary" class="px-4" type="submit" :disabled="isSubmitting"> Login</CButton>
                      </CCol>
                      <CCol :xs="6" class="text-right">
                        <CButton color="link" class="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </Form>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

