<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { fechaDateToString } from "../../../../helpers/utils";

import VaTimelineItem from "../../../../components/va-timeline-item.vue";

const registros = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL+'log/get_all');
        registros.value = response.data;
        registros.value.sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime())
      } catch (error) {
        console.error(error);
      }
    });
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">Historial de Eventos</h1>
    </VaCardTitle>
    <VaCardContent>
      <table class="mt-4">
        <tbody>
          
          <va-timeline-item v-for="registro in registros" :key="registro.id" :date="fechaDateToString(new Date(registro.date_time), '-')">
            {{ registro.evento }}
          </va-timeline-item>
          
        </tbody>
      </table>
    </VaCardContent>
  </VaCard>
</template>
