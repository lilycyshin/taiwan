/* Browser API keys must be restricted to this site's HTTP referrers. */
window.TripPlaces = (() => {
  let loading = null;
  async function library() {
    if (loading) return loading;
    let key = localStorage.getItem('trip-google-maps-key');
    if (!key) {
      key = prompt('Google 장소 검색 API 키\nMaps JavaScript API와 Places API (New)를 활성화한 브라우저용 키를 입력해주세요.');
      if (!key?.trim()) throw new Error('Google Maps API 키가 필요해요');
      key = key.trim();
      localStorage.setItem('trip-google-maps-key', key);
    }
    loading = new Promise((resolve, reject) => {
      let script;
      const fail = message => {
        clearTimeout(timer);
        script?.remove();
        reject(new Error(message));
      };
      const timer = setTimeout(() => fail('Google Maps 연결 시간이 초과됐어요'), 15000);
      window.__tripPlacesReady = async () => {
        clearTimeout(timer);
        try { resolve(await google.maps.importLibrary('places')); }
        catch (error) { reject(error); }
      };
      window.gm_authFailure = () => fail('API 키의 권한·도메인 제한·결제 설정을 확인해주세요');
      script = document.createElement('script');
      const url = new URL('https://maps.googleapis.com/maps/api/js');
      url.searchParams.set('key', key);
      url.searchParams.set('loading', 'async');
      url.searchParams.set('callback', '__tripPlacesReady');
      url.searchParams.set('v', 'weekly');
      url.searchParams.set('language', 'ko');
      url.searchParams.set('region', 'TW');
      script.src = url.toString();
      script.async = true;
      script.onerror = () => fail('Google Maps에 연결하지 못했어요');
      document.head.append(script);
    }).catch(error => { loading = null; throw error; });
    return loading;
  }
  return {
    async search(text, day) {
      const { Place } = await library();
      const center = day === '2026-10-10' ? { lat: 22.997, lng: 120.212 }
        : day === '2026-10-09' ? { lat: 22.35, lng: 120.38 }
        : { lat: 22.63, lng: 120.30 };
      const { places } = await Place.searchByText({
        textQuery: text,
        fields: ['id', 'displayName', 'formattedAddress', 'location', 'googleMapsURI', 'attributions'],
        language: 'ko', region: 'TW',
        locationBias: { center, radius: 30000 },
        maxResultCount: 5
      });
      return places || [];
    },
    resetKey() {
      localStorage.removeItem('trip-google-maps-key');
      location.reload();
    }
  };
})();
