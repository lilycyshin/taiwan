/* Browser API keys must be restricted to this site's HTTP referrers. */
window.TripPlaces = (() => {
  // Public browser key supplied for this app; restrict HTTP referrers in Google Cloud.
  const defaultKey = 'AIzaSyBOIUjH7M7axzisWoePAXckQ1EMwdEj27E';
  const getKey = () => localStorage.getItem('trip-google-maps-key') || defaultKey;
  const redact = value => String(value || '').replace(/AIza[A-Za-z0-9_-]+/g, '[API KEY]');
  function searchError(error) {
    const code = redact(error?.code);
    const message = redact(error?.message || error);
    const detail = [code, message].filter(Boolean).filter((v, i, all) => all.indexOf(v) === i).join(' · ');
    let hint = 'Google 장소 검색에 실패했어요.';
    if (/referer|referrer|API_KEY_HTTP_REFERRER_BLOCKED/i.test(detail)) {
      hint = '현재 앱 주소가 API 키의 허용 웹사이트에 포함되어 있지 않아요.';
    } else if (/SERVICE_DISABLED|ApiNotActivated|has not been used|not.*enabled/i.test(detail)) {
      hint = '이 키의 Google Cloud 프로젝트에서 Places API (New)를 활성화해주세요.';
    } else if (/API_KEY_SERVICE_BLOCKED|ApiTargetBlocked/i.test(detail)) {
      hint = '이 API 키의 API 제한사항에 Places API (New)를 추가해주세요.';
    } else if (/OVER_QUERY_LIMIT|RESOURCE_EXHAUSTED|Billing|quota|billing/i.test(detail)) {
      hint = 'Google Cloud 결제 연결 또는 검색 할당량을 확인해주세요.';
    } else if (/REQUEST_DENIED|PERMISSION_DENIED|not.*authorized/i.test(detail)) {
      hint = 'Google이 장소 검색 권한을 거부했어요. 아래 오류 상세를 확인해주세요.';
    }
    const result = new Error(hint);
    result.diagnostic = `${detail}\n앱 주소: ${location.origin}${location.pathname}\n사용 중인 키 끝자리: …${getKey().slice(-6)}`;
    return result;
  }
  let loading = null;
  async function library() {
    if (loading) return loading;
    let key = getKey();
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
    getKey,
    async search(text, day) {
      let Place;
      try { ({ Place } = await library()); }
      catch (error) { throw searchError(error); }
      const center = day === '2026-10-10' ? { lat: 22.997, lng: 120.212 }
        : day === '2026-10-09' ? { lat: 22.35, lng: 120.38 }
        : { lat: 22.63, lng: 120.30 };
      let response;
      try { response = await Place.searchByText({
        textQuery: text,
        fields: ['id', 'displayName', 'formattedAddress', 'location', 'googleMapsURI', 'attributions'],
        language: 'ko', region: 'TW',
        locationBias: { center, radius: 30000 },
        maxResultCount: 5
      }); } catch (error) {
        throw searchError(error);
      }
      return response.places || [];
    },
    resetKey() {
      localStorage.removeItem('trip-google-maps-key');
      location.reload();
    }
  };
})();
