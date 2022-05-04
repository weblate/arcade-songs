import { computed, useRoute } from '@nuxtjs/composition-api';
import sites from '~/assets/sites';

export default function useGameCode() {
  const route = useRoute();

  const siteInfo = computed(
    () => sites.find((site) => site.gameCode === route.value.params.gameCode),
  );
  const isAtRoot = computed(() => route.value.params.gameCode === undefined);

  const gameCode = computed(() => siteInfo.value?.gameCode ?? undefined);
  const gameTitle = computed(() => siteInfo.value?.gameTitle ?? '');
  const siteTitle = computed(() => siteInfo.value?.title ?? 'arcade-songs');
  const siteColor = computed(() => siteInfo.value?.color ?? '#424242');
  const dataSourceUrl = computed(() => siteInfo.value?.dataSourceUrl ?? undefined);
  const accessCounterUrl = computed(() => siteInfo.value?.accessCounterUrl ?? undefined);

  return {
    isAtRoot,
    gameCode,
    gameTitle,
    siteTitle,
    siteColor,
    dataSourceUrl,
    accessCounterUrl,
  };
}
