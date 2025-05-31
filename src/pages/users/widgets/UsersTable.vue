<script setup>
import { defineVaDataTableColumns, useModal } from "vuestic-ui";
import UserAvatar from "./UserAvatar.vue";
import { ref } from "vue";
import { useVModel } from "@vueuse/core";

const columns = defineVaDataTableColumns([
  { label: " ", key: "actions" },
  { label: "Nombre Usuario", key: "username", sortable: true },
  { label: "Nombres", key: "name", sortable: true },
  { label: "Apellidos", key: "last_name", sortable: true },
  { label: "Fotoclub / Agrupación", key: "fotoclub_name", sortable: true },
  { label: "Rol", key: "rol_name", sortable: true },
  { label: "ID", key: "id", sortable: true },
]);

const props = defineProps(["users", "loading"])
const emit  = defineEmits(['editModal'])

const roleColors = {
  admin: "danger",
  user: "background-element",
  owner: "warning",
};

function edit( data ){
  emit('editModal', data) 
}

const { confirm } = useModal();
</script>

<template>
  <VaDataTable
    :columns="columns"
    :items="users"
    :loading="$props.loading"
  >

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="Edit user"
          @click="edit(rowData)"
        />
        <VaButton
          preset="primary"
          size="small"
          icon="mso-delete"
          color="danger"
          aria-label="Delete user"
          @click="en_desarrollo"
        />
      </div>
    </template>
  </VaDataTable>

  <div
    class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2"
  >
    
    <div v-if="totalPages > 1" class="flex">
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
