<script setup>
import { computed, ref, watch } from "vue";
import { useForm } from "vuestic-ui";
import UserAvatar from "./UserAvatar.vue";
import { validators } from "../../../services/utils";

const props = defineProps(["user"]);

const defaultNewUser = {
  avatar: "",
  name: "", last_name: "",
  role: "3",
  username: "",
  email: "",
  active: true,
}

const newUser = ref({ ...defaultNewUser });
const avatar = ref();

const makeAvatarBlobUrl = (avatar) => {
  return URL.createObjectURL(avatar);
}

watch(avatar, (newAvatar) => {
  newUser.value.avatar = newAvatar ? makeAvatarBlobUrl(newAvatar) : "";
})

const form = useForm("add-user-form");
const emit = defineEmits(["close", "save"]);

function onSave(){
  if (form.validate()) {
    emit("save", newUser.value);
  }
}

const roleSelectOptions = [
  { text: "Administrador", value: "1" },
  { text: "Delegado", value: "2" },
  { text: "Concursante", value: "3" },
  { text: "Juez", value: "4" }
]
</script>

<template>
  <VaForm
    v-slot="{ isValid }"
    ref="add-user-form"
    class="flex-col justify-start items-start gap-4 inline-flex w-full"
  >
    <VaFileUpload
      v-model="avatar"
      type="single"
      hide-file-list
      class="self-stretch justify-start items-center gap-4 inline-flex"
    >
      <UserAvatar :user="newUser" size="large" />
      <VaButton preset="primary" size="small">Elegir Imagen</VaButton>
      <VaButton
        v-if="avatar"
        preset="primary"
        color="danger"
        size="small"
        icon="delete"
        class="z-10"
        @click.stop="avatar = undefined"
      />
    </VaFileUpload>
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newUser.username"
          label="Nombre de usuario"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="fullName"
        />
        <VaInput
          v-model="newUser.email"
          label="Email"
          class="w-full sm:w-1/2"
          :rules="[validators.required, validators.email]"
          name="email"
        />
        
      </div>
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newUser.name"
          label="Nombre"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="name"
        />
        <VaInput
          v-model="newUser.last_name"
          label="Apellido"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="last_name"
        />
      </div>

      <div class="flex gap-4 w-full">
        <div class="w-1/2">
          <VaSelect
            v-model="newUser.role"
            label="Role"
            class="w-full"
            :options="roleSelectOptions"
            :rules="[validators.required]"
            name="role"
            value-by="value"
          />
        </div>

        <div class="flex items-center w-1/2 mt-4">
          <VaCheckbox
            v-model="newUser.active"
            label="Active"
            class="w-full"
            name="active"
          />
        </div>
      </div>

      <VaTextarea
        v-model="newUser.notes"
        label="Notes"
        class="w-full"
        name="notes"
      />
      <div
        class="flex gap-2 flex-col-reverse items-stretch justify-end w-full sm:flex-row sm:items-center"
      >
        <VaButton preset="secondary" color="secondary" @click="$emit('close')"
          >Cancelar</VaButton
        >
        <VaButton :disabled="!isValid" @click="onSave">Guardar</VaButton>
      </div>
    </div>
  </VaForm>
</template>
