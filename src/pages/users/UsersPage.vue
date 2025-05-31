<script setup>
import { ref, onMounted } from "vue";
import UsersTable from "./widgets/UsersTable.vue";
import EditUserForm from "./widgets/EditUserForm.vue";
import { useModal, useToast } from "vuestic-ui";
import axios from 'axios';

import { get_dictionary_from_array } from "../../helpers/utils";

const doShowEditUserModal = ref(false);
const userToEdit = ref(null);

function showEditUserModal(user) {
  console.log("user", user);
  userToEdit.value = user;
  doShowEditUserModal.value = true;
};

function showAddUserModal() {
  userToEdit.value = null;
  doShowEditUserModal.value = true;
}

const users = ref([]);

onMounted(async () => {
  let response = await axios.get(import.meta.env.VITE_API_URL+'users/get_all')
  if (response){
    let aux = []
    let diccio_profile  = get_dictionary_from_array(response.data.profile, 'id', 'object')
    let fotoclub_diccio = get_dictionary_from_array(response.data.fotoclub, 'id', 'object')
    let diccio_roles = get_dictionary_from_array(response.data.role, 'id', 'object')
    for (let i=0; i<response.data.items.length; i++){
      const USER     = response.data.items[i]
      const PROFILE  = diccio_profile[ USER.profile_id ]
      const FOTOCLUB = fotoclub_diccio[ PROFILE.fotoclub_id ]
      const ROL      = diccio_roles[ USER.role_id ]
      let item = {
        ...USER,
        ...PROFILE,
        fotoclub_name: FOTOCLUB?.name,
        rol_name: diccio_roles[USER.role_id]?.type
      }
      aux.push(item)
    }
    
    users.value = aux
  }
})

</script>

<template>
  <h1 class="page-title">Usuarios</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">

          <VaInput  placeholder="Buscar">
            <template #prependInner>
              <VaIcon name="search" color="secondary" size="small" />
            </template>
          </VaInput>
        </div>
        <!--<VaButton @click="showAddUserModal">+ Agregar</VaButton>-->

      </div>

      <UsersTable
        :users="users"
        :loading="isLoading"
        @editModal="showEditUserModal"
      />
    </VaCardContent>
  </VaCard>

  <VaModal
    v-slot="{ cancel, ok }"
    v-model="doShowEditUserModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
    :before-cancel="beforeEditFormModalClose"
  >
    <h1 class="va-h5">{{ userToEdit ? "Editar Usuario - " + userToEdit.name + " " + userToEdit.last_name : "Nuevo Usuario" }}</h1>
    <EditUserForm
      ref="editFormRef"
      :user="userToEdit"
      @close="cancel"
      @save="
        (user) => {
          onUserSaved(user);
          ok();
        }
      "
    />
  </VaModal>
</template>
