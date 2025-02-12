<script setup lang="ts">
/* eslint-disable import/first, import/no-duplicates */
import { ref, computed, provide, onMounted, useRoute, useRouter, useMeta as useHead, useContext } from '@nuxtjs/composition-api';
import { useI18n } from 'nuxt-i18n-composable';
import useDataStore from '~/stores/data';
import useGameInfo from '~/composables/useGameInfo';
import { buildEmptyFilters, buildFilterOptions, loadFiltersFromQuery, filterSheets } from '~/utils';
import type { Sheet } from '~/types';

const context = useContext();
const route = useRoute();
const router = useRouter();
const i18n = useI18n();
const { gameTitle } = useGameInfo();
const dataStore = useDataStore();
const data = computed(() => dataStore.currentData);

const filterMode = ref('filter');
const displayMode = ref('grid');

const filters = ref(buildEmptyFilters());
const filterOptions = computed(() => buildFilterOptions(data.value, i18n.t));

const filteredSheets = computed(
  () => filterSheets(data.value.sheets, filters.value),
);
const selectedSheets = ref<Sheet[]>([]);

const displayingSheets = computed(() => {
  if (filterMode.value === 'filter') return filteredSheets.value;
  if (filterMode.value === 'my-list') return selectedSheets.value;
  throw new Error('Invalid filter mode');
});

onMounted(() => {
  filters.value = loadFiltersFromQuery(route.value.query as Record<string, string>);
  router.replace({ query: {} }).catch((err) => {
    // Ignore the error regarding navigating to the page they are already on.
    if (err.name !== 'NavigationDuplicated') throw err;
  });
});

useHead(() => ({
  titleTemplate: '%s',
  title: `${gameTitle.value} | ${context.$config.siteTitle}`,
}));

provide('drawingPool', displayingSheets);
provide('selectedSheets', selectedSheets);

provide('filters', filters);
provide('filterOptions', filterOptions);

provide('displayMode', displayMode);
provide('filterMode', filterMode);
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'GameIndexPage',
  head: {},
});
</script>

<template>
  <v-container fluid class="pa-8">
    <DataInfoBar class="mb-6" />

    <SheetFilter class="px-3" />
    <ModeSelector class="px-3 py-3" />

    <SheetDrawerPanel />

    <FilterInfoBar
      :sheets="displayingSheets"
      class="my-5"
    />

    <!--
      The inner SheetDataGrid and SheetDataTable need to sync with each other.
      To ensure the SheetDataView always exists, we use v-show instead of v-if.
    -->
    <SheetDataView
      v-show="displayingSheets.length > 0"
      :sheets="displayingSheets"
      :display-mode="displayMode"
      class="mt-8"
    />
    <div
      v-if="displayingSheets.length === 0"
      class="text-center text--secondary py-8"
    >
      <span
        v-if="filterMode === 'filter'"
        v-text="$t('description.filterResultEmpty')"
      />
      <span
        v-if="filterMode === 'my-list'"
        v-text="$t('description.myListEmpty')"
      />
    </div>
  </v-container>
</template>
