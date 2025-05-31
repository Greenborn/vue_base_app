<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Ingresar</h1>
    <p class="text-base mb-4 leading-5">
      ¿No tienes una cuenta?
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary"
        >Registrate</RouterLink
      >
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required]"
      class="mb-4"
      label="Usuario"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Contraseña"
        @clickAppendInner.stop="
          isPasswordVisible.value = !isPasswordVisible.value
        "
      >
        <template #appendInner>
          <VaIcon
            :name="
              isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'
            "
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div
      class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between"
    >
      <VaCheckbox
        v-model="formData.keepLoggedIn"
        class="mb-2 sm:mb-0"
        label="Mantener sesión abierta"
      />
      <RouterLink
        :to="{ name: 'recover-password' }"
        class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary"
      >
        Recordar Contraseña
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> Iniciar Sesión</VaButton>
    </div>
  </VaForm>
</template>

<script setup>

import axios from 'axios';

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm, useToast } from "vuestic-ui";
import { validators } from "../../services/utils";

const { validate } = useForm("form");
const { push } = useRouter();
const { init } = useToast();

const formData = ref({
  email: "",
  password: "",
  keepLoggedIn: false,
});

const submit = () => {
  if (validate()) {
    axios.post(import.meta.env.VITE_API_URL+'auth/login', {
      // datos de login
      username: formData.value.email,
      password: formData.value.password
    }, {
    withCredentials: true
  })
    .then((response) => {
      if (response.data.r === true) {
        localStorage.setItem('token', response.data.t);
        init({ message: "Sesión iniciada", color: "success" });
        push({ name: "dashboard" });
      } else {
        init({ message: "Error de login", color: "error" });
      }
    })
    .catch((error) => {
      init({ message: "Error de login", color: "error" });
    });
  }
};
</script>
