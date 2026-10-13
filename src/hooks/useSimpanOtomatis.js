import { useCallback } from 'react';
/** MOCKUP: antrean, timer, flush dan seluruh autosave dinonaktifkan secara struktural. */
export default function useSimpanOtomatis() {
  const noop = useCallback(() => {}, []);
  const neverSend = useCallback(async () => {}, []);
  return {
    status: 'bersih', galat: '', jadwalkan: noop, paksa: neverSend,
    tetapkanAcuan: noop, adaTertunda: () => false, tandaiTertunda: noop
  };
}
